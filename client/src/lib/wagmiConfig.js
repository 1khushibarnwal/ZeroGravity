import { defineChain } from "viem";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

// VeilSwap's CommitRegistry is deployed to a custom/dev chain, so the chain
// itself is defined from env vars rather than pulled from wagmi/chains.
// Fill these in client/.env — see client/.env.example.
const chainId = Number(import.meta.env.VITE_CHAIN_ID || 31337);
const rpcUrl = import.meta.env.VITE_RPC_URL || "http://127.0.0.1:8545";
const explorerUrl = import.meta.env.VITE_EXPLORER_URL;
const nativeSymbol = import.meta.env.VITE_NATIVE_SYMBOL || "ETH";

export const veilChain = defineChain({
  id: chainId,
  name: import.meta.env.VITE_CHAIN_NAME || "VeilSwap Chain",
  nativeCurrency: {
    name: nativeSymbol,
    symbol: nativeSymbol,
    decimals: 18,
  },
  rpcUrls: {
    default: { http: [rpcUrl] },
  },
  blockExplorers: explorerUrl
    ? { default: { name: "Explorer", url: explorerUrl } }
    : undefined,
  testnet: true,
});

export const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

export const wagmiConfig = getDefaultConfig({
  appName: "VeilSwap",
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || "MISSING_PROJECT_ID",
  chains: [veilChain],
  ssr: false,
});
