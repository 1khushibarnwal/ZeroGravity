import { useEffect, useMemo, useState } from "react";
import {
  useAccount,
  usePublicClient,
  useReadContract,
  useWriteContract,
} from "wagmi";
import { formatEther, isAddress, parseEther } from "viem";
import { COMMIT_REGISTRY_ABI } from "../lib/abi";
import { CONTRACT_ADDRESS } from "../lib/wagmiConfig";
import { computeCommitHash, generateNonce, generateSalt } from "../lib/commitHash";
import { loadSelfCommits, saveSelfCommit, updateSelfCommit } from "../lib/storage";
import { notifySelfCommit } from "../lib/api";
import { useCountdown } from "../hooks/useCountdown";
import HashBadge from "./HashBadge";
import StatusPill from "./StatusPill";

export default function SelfCustodyPanel() {
  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();

  const { data: minDelaySeconds } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: COMMIT_REGISTRY_ABI,
    functionName: "MIN_DELAY",
  });

  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [commits, setCommits] = useState([]);

  useEffect(() => {
    setCommits(loadSelfCommits());
  }, []);

  const canSubmit =
    isConnected && isAddress(to || "") && Number(amount) > 0 && !submitting;

  async function handleCommit(e) {
    e.preventDefault();
    setError("");

    if (!CONTRACT_ADDRESS) {
      setError("VITE_CONTRACT_ADDRESS is not set — see client/.env.example.");
      return;
    }

    setSubmitting(true);
    try {
      const amountWei = parseEther(amount);
      const nonce = generateNonce();
      const salt = generateSalt();
      const hash = computeCommitHash({ to, amount: amountWei, nonce, salt });

      const txHash = await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: COMMIT_REGISTRY_ABI,
        functionName: "commit",
        args: [hash],
      });

      await publicClient.waitForTransactionReceipt({ hash: txHash });

      // Read the on-chain timestamp back so the reveal countdown matches
      // the contract's own clock, not the browser's.
      const onChain = await publicClient.readContract({
        address: CONTRACT_ADDRESS,
        abi: COMMIT_REGISTRY_ABI,
        functionName: "commitments",
        args: [hash],
      });
      const committedAt = Number(onChain[2]) * 1000;

      const entry = {
        hash,
        to,
        amount: amountWei.toString(),
        nonce: nonce.toString(),
        salt,
        user: address,
        commitTxHash: txHash,
        committedAt,
        revealed: false,
      };

      setCommits(saveSelfCommit(entry));
      setTo("");
      setAmount("");

      notifySelfCommit(hash).catch(() => {});
    } catch (err) {
      setError(err.shortMessage || err.message || "Commit failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-10">
      <form onSubmit={handleCommit} className="space-y-5">
        <div>
          <label className="label" htmlFor="self-to">
            Recipient address
          </label>
          <input
            id="self-to"
            className="field"
            placeholder="0x…"
            value={to}
            onChange={(e) => setTo(e.target.value.trim())}
          />
        </div>
        <div>
          <label className="label" htmlFor="self-amount">
            Amount
          </label>
          <input
            id="self-amount"
            className="field"
            placeholder="0.00"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        {error && <p className="text-sm text-signal-bad">{error}</p>}

        <button type="submit" className="btn-primary" disabled={!canSubmit}>
          {submitting ? "Sealing commitment…" : "Seal commitment"}
        </button>
        {!isConnected && (
          <p className="text-sm text-parchment-faint">
            Connect a wallet to commit directly on-chain.
          </p>
        )}
      </form>

      <div className="space-y-4">
        <h3 className="font-display text-lg text-parchment">
          Your sealed commitments
        </h3>
        {commits.length === 0 ? (
          <p className="text-sm text-parchment-faint">
            Nothing sealed yet. Commitments you make here are stored only in
            this browser — that's what makes them self-custodial.
          </p>
        ) : (
          <ul className="divide-y divide-ink-line">
            {commits.map((c) => (
              <CommitRow
                key={c.hash}
                entry={c}
                minDelaySeconds={minDelaySeconds}
                writeContractAsync={writeContractAsync}
                publicClient={publicClient}
                onUpdate={(hash, patch) =>
                  setCommits(updateSelfCommit(hash, patch))
                }
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function CommitRow({ entry, minDelaySeconds, writeContractAsync, publicClient, onUpdate }) {
  const [revealing, setRevealing] = useState(false);
  const [rowError, setRowError] = useState("");

  const targetMs = useMemo(() => {
    if (!entry.committedAt || minDelaySeconds === undefined) return null;
    return entry.committedAt + Number(minDelaySeconds) * 1000;
  }, [entry.committedAt, minDelaySeconds]);

  const { remaining, ready } = useCountdown(entry.revealed ? null : targetMs);

  async function handleReveal() {
    setRowError("");
    setRevealing(true);
    try {
      const txHash = await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: COMMIT_REGISTRY_ABI,
        functionName: "reveal",
        args: [entry.to, BigInt(entry.amount), BigInt(entry.nonce), entry.salt],
      });
      await publicClient.waitForTransactionReceipt({ hash: txHash });
      onUpdate(entry.hash, { revealed: true, revealTxHash: txHash });
    } catch (err) {
      setRowError(err.shortMessage || err.message || "Reveal failed.");
    } finally {
      setRevealing(false);
    }
  }

  let status = "waiting";
  if (entry.revealed) status = "revealed";
  else if (ready) status = "ready";

  return (
    <li className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1">
        <div className="text-sm text-parchment">
          {formatEther(BigInt(entry.amount))} → {entry.to.slice(0, 6)}…
          {entry.to.slice(-4)}
        </div>
        <HashBadge value={entry.hash} />
        {rowError && <p className="text-sm text-signal-bad">{rowError}</p>}
      </div>
      <div className="flex items-center gap-4">
        <StatusPill status={status}>
          {entry.revealed
            ? "Revealed"
            : ready
              ? "Ready to reveal"
              : `Unlocks in ${remaining}s`}
        </StatusPill>
        {!entry.revealed && (
          <button
            type="button"
            className="btn-secondary"
            disabled={!ready || revealing}
            onClick={handleReveal}
          >
            {revealing ? "Revealing…" : "Reveal"}
          </button>
        )}
      </div>
    </li>
  );
}
