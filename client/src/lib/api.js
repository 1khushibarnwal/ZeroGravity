const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }

  return data;
}

// Managed mode — relayer commits and later reveals on the user's behalf.
export const submitManagedCommit = ({ to, amount, userAddress }) =>
  request("/api/tx/commit", {
    method: "POST",
    body: JSON.stringify({ to, amount, userAddress }),
  });

export const getPoolStatus = () => request("/api/tx/status");

export const getTxByHash = (hash) => request(`/api/tx/${hash}`);

// Agent mode — natural-language prompt parsed by the server's LLM.
export const sendAgentPrompt = (prompt) =>
  request("/api/agent/chat", {
    method: "POST",
    body: JSON.stringify({ prompt }),
  });

export const getAgentReveal = (hash) => request(`/api/agent/reveal/${hash}`);

// Self-custody mode — the wallet submits directly on-chain; this just logs
// the commitment with the server for record-keeping (best-effort).
export const notifySelfCommit = (commitHash) =>
  request("/self/commit", {
    method: "POST",
    body: JSON.stringify({ commitHash }),
  });
