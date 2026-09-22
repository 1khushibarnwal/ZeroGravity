import { useState } from "react";
import { getAgentReveal, sendAgentPrompt } from "../lib/api";
import HashBadge from "./HashBadge";

const EXAMPLES = [
  "Send 0.25 ETH to 0x1234...abcd, keep it private until I reveal it",
  "Commit a transfer of 1.5 ETH to 0xabcd...9876",
];

export default function AgentPanel() {
  const [prompt, setPrompt] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const [revealLoading, setRevealLoading] = useState(false);
  const [revealData, setRevealData] = useState(null);
  const [revealError, setRevealError] = useState("");

  async function handleSend(e) {
    e.preventDefault();
    if (!prompt.trim()) return;
    setError("");
    setResult(null);
    setRevealData(null);
    setSending(true);
    try {
      const data = await sendAgentPrompt(prompt.trim());
      setResult(data);
    } catch (err) {
      setError(err.message || "The agent couldn't process that.");
    } finally {
      setSending(false);
    }
  }

  async function handleLookupReveal() {
    const hash = result?.commitHash;
    if (!hash) return;
    setRevealError("");
    setRevealLoading(true);
    try {
      const data = await getAgentReveal(hash);
      setRevealData(data);
    } catch (err) {
      setRevealError(err.message || "No reveal data found for that hash.");
    } finally {
      setRevealLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSend} className="space-y-3">
        <label className="label" htmlFor="agent-prompt">
          Describe the transfer
        </label>
        <textarea
          id="agent-prompt"
          className="field min-h-24 resize-y"
          placeholder={EXAMPLES[0]}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <div className="flex flex-wrap gap-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => setPrompt(ex)}
              className="text-xs text-parchment-faint hover:text-veil-bright transition-colors"
            >
              {ex}
            </button>
          ))}
        </div>

        {error && <p className="text-sm text-signal-bad">{error}</p>}

        <button type="submit" className="btn-primary" disabled={sending}>
          {sending ? "Interpreting…" : "Send to agent"}
        </button>
      </form>

      {result && (
        <div className="space-y-4 border-l-2 border-veil pl-4">
          <div>
            <p className="label">Parsed intent</p>
            <pre className="hash whitespace-pre-wrap text-veil-bright">
              {JSON.stringify(result.aiParsed ?? result, null, 2)}
            </pre>
          </div>
          {result.commitHash && (
            <HashBadge value={result.commitHash} label="commit hash" />
          )}
          {result.transaction?.hash && (
            <HashBadge value={result.transaction.hash} label="on-chain tx" />
          )}

          <div className="space-y-2">
            <button
              type="button"
              className="btn-secondary"
              onClick={handleLookupReveal}
              disabled={!result.commitHash || revealLoading}
            >
              {revealLoading ? "Looking up…" : "Look up reveal data"}
            </button>
            {revealError && (
              <p className="text-sm text-signal-bad">{revealError}</p>
            )}
            {revealData && (
              <pre className="hash whitespace-pre-wrap text-veil-bright">
                {JSON.stringify(revealData, null, 2)}
              </pre>
            )}
            <p className="text-sm text-parchment-faint">
              Agent commits are submitted by the relayer wallet, so only the
              relayer can call reveal on-chain for them — this box is for
              visibility, not a self-reveal action.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
