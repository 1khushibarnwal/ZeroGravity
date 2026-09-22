import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { isAddress } from "viem";
import { getPoolStatus, submitManagedCommit } from "../lib/api";
import HashBadge from "./HashBadge";
import StatusPill from "./StatusPill";

const POLL_MS = 4000;

export default function ManagedPanel() {
  const { address, isConnected } = useAccount();

  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [lastResult, setLastResult] = useState(null);

  const [pool, setPool] = useState([]);
  const [poolError, setPoolError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function poll() {
      try {
        const data = await getPoolStatus();
        if (!cancelled) {
          setPool(Array.isArray(data) ? data : data.pool || []);
          setPoolError("");
        }
      } catch (err) {
        if (!cancelled) setPoolError(err.message);
      }
    }

    poll();
    const id = setInterval(poll, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  const canSubmit =
    isConnected && isAddress(to || "") && Number(amount) > 0 && !submitting;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const result = await submitManagedCommit({
        to,
        amount,
        userAddress: address,
      });
      setLastResult(result);
      setTo("");
      setAmount("");
    } catch (err) {
      setError(err.message || "Submit failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-10">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="label" htmlFor="managed-to">
            Recipient address
          </label>
          <input
            id="managed-to"
            className="field"
            placeholder="0x…"
            value={to}
            onChange={(e) => setTo(e.target.value.trim())}
          />
        </div>
        <div>
          <label className="label" htmlFor="managed-amount">
            Amount
          </label>
          <input
            id="managed-amount"
            className="field"
            placeholder="0.00"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        {error && <p className="text-sm text-signal-bad">{error}</p>}

        <button type="submit" className="btn-primary" disabled={!canSubmit}>
          {submitting ? "Sending to relayer…" : "Hand off to relayer"}
        </button>
        {!isConnected && (
          <p className="text-sm text-parchment-faint">
            Connect a wallet — your address is attached to the request as the
            beneficiary of record; the relayer wallet pays gas and executes.
          </p>
        )}
      </form>

      {lastResult && (
        <div className="space-y-2 border-l-2 border-brass pl-4">
          <p className="text-sm text-parchment-dim">Submitted to the pool.</p>
          <HashBadge value={lastResult.commitHash} label="commit hash" />
        </div>
      )}

      <div className="space-y-4">
        <h3 className="font-display text-lg text-parchment">Relayer pool</h3>
        {poolError && <p className="text-sm text-signal-bad">{poolError}</p>}
        {pool.length === 0 ? (
          <p className="text-sm text-parchment-faint">
            Nothing in the pool right now.
          </p>
        ) : (
          <ul className="divide-y divide-ink-line">
            {pool.map((tx) => (
              <li
                key={tx.hash || tx.commitHash}
                className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="space-y-1">
                  <div className="text-sm text-parchment">
                    {tx.to ? `→ ${tx.to.slice(0, 6)}…${tx.to.slice(-4)}` : "—"}
                  </div>
                  <HashBadge value={tx.hash || tx.commitHash} />
                </div>
                <StatusPill status={tx.status}>{tx.status}</StatusPill>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
