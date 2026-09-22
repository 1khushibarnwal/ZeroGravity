# VeilSwap client

React + Vite frontend for VeilSwap, using RainbowKit/wagmi for wallet
connection and viem for on-chain calls against `CommitRegistry`.

## Setup

```bash
cd client
npm install
cp .env.example .env   # then fill in the values below
npm run dev
```

Required `.env` values:

- `VITE_CONTRACT_ADDRESS` — the deployed `CommitRegistry` address.
- `VITE_CHAIN_ID` / `VITE_RPC_URL` — the chain the contract lives on (see
  `contracts/cache/.../run-latest.json` from your Foundry deploy, or
  whatever `RPC_URL` your `server/.env` / `contracts/.env` already point at).
- `VITE_WALLETCONNECT_PROJECT_ID` — free from https://cloud.reown.com,
  required by RainbowKit even for injected-wallet-only usage.
- `VITE_API_BASE_URL` — where `server/` is running (defaults to
  `http://localhost:5000`).

Start `server/` alongside this (`npm start` in `server/`, per its own
`.env`) — the managed and agent modes call it directly.

## The three modes

**Self-custody** — the connected wallet calls `commit()` and, after
`MIN_DELAY`, `reveal()` directly. The preimage (`to`, `amount`, `nonce`,
`salt`) is generated and kept in `localStorage` only; the server is
notified via `POST /self/commit` for logging but never sees the
preimage. This is the only mode where reveal actually works end-to-end
from the UI, because the committer (`msg.sender`) is the user's own
wallet.

**Managed** — you submit `{to, amount}`, the relayer wallet commits and
is supposed to auto-reveal on a timer (`server/services/pool.service.js`).
The panel polls `GET /api/tx/status` to show pool state.

**Agent** — a free-text prompt goes to `POST /api/agent/chat`, which an
LLM parses into a transfer, and the relayer submits the commit. The
panel exposes `GET /api/agent/reveal/:hash` so you can inspect the
stored preimage.

## Two backend issues worth knowing about

These aren't frontend bugs — flagging them because they affect what you
should expect to see when testing:

1. **`server/services/ai.service.js`'s system prompt** tells the LLM to
   return `{action, commitHash}`, but `agent.controller.js` reads
   `parsed.to` / `parsed.amount` off the result to build the commit.
   Update the prompt to extract `to` and `amount` (and whatever else
   `buildManagedCommit` needs) or the agent flow will consistently fail
   to parse.
2. **Agent-mode commits currently have no reveal path.** Only
   `pool.service.js`'s interval (used by the `/api/tx` managed flow)
   auto-reveals; agent commits are written to `revealStore` but never
   pushed into that pool, and since the relayer — not the caller — is
   `msg.sender` on-chain, the end user's wallet can't reveal it either.
   The "Look up reveal data" button in the Agent panel is read-only for
   this reason.
