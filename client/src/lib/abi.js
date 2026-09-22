// Mirrors server/config/abi.json — CommitRegistry contract.
export const COMMIT_REGISTRY_ABI = [
  {
    type: "function",
    name: "MIN_DELAY",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "commit",
    inputs: [{ name: "commitHash", type: "bytes32", internalType: "bytes32" }],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "commitments",
    inputs: [{ name: "commitHash", type: "bytes32", internalType: "bytes32" }],
    outputs: [
      { name: "user", type: "address", internalType: "address" },
      { name: "commitHash", type: "bytes32", internalType: "bytes32" },
      { name: "timestamp", type: "uint256", internalType: "uint256" },
      { name: "revealed", type: "bool", internalType: "bool" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "reveal",
    inputs: [
      { name: "to", type: "address", internalType: "address" },
      { name: "amount", type: "uint256", internalType: "uint256" },
      { name: "nonce", type: "uint256", internalType: "uint256" },
      { name: "salt", type: "bytes32", internalType: "bytes32" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "Committed",
    inputs: [
      { name: "commitHash", type: "bytes32", indexed: true, internalType: "bytes32" },
      { name: "user", type: "address", indexed: true, internalType: "address" },
      { name: "timestamp", type: "uint256", indexed: false, internalType: "uint256" },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Revealed",
    inputs: [
      { name: "commitHash", type: "bytes32", indexed: true, internalType: "bytes32" },
      { name: "user", type: "address", indexed: true, internalType: "address" },
    ],
    anonymous: false,
  },
  { type: "error", name: "CommitRegistry__AlreadyCommitted", inputs: [] },
  { type: "error", name: "CommitRegistry__AlreadyRevealed", inputs: [] },
  { type: "error", name: "CommitRegistry__InvalidReveal", inputs: [] },
  { type: "error", name: "CommitRegistry__NotOwner", inputs: [] },
  { type: "error", name: "CommitRegistry__RevealTooEarly", inputs: [] },
  { type: "error", name: "CommitRegistry__UnknownCommit", inputs: [] },
  { type: "error", name: "CommitRegistry__SendEth", inputs: [] },
  { type: "error", name: "CommitRegistry__TransferFailed", inputs: [] },
];
