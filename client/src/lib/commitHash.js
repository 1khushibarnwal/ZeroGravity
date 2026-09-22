import { encodeAbiParameters, keccak256, toHex } from "viem";

// The contract computes: keccak256(abi.encode(to, amount, nonce, salt))
// See contracts/src/CommitRegistry.sol -> reveal(). Self-custody commits
// must reproduce this exactly, client-side, since the user's own wallet
// (not the relayer) submits the commit.

export function generateSalt() {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return toHex(bytes);
}

export function generateNonce() {
  // uint256 nonce — a random 32-bit value is plenty of entropy paired with the salt
  const bytes = crypto.getRandomValues(new Uint32Array(1));
  return BigInt(bytes[0]);
}

export function computeCommitHash({ to, amount, nonce, salt }) {
  return keccak256(
    encodeAbiParameters(
      [
        { type: "address" },
        { type: "uint256" },
        { type: "uint256" },
        { type: "bytes32" },
      ],
      [to, amount, nonce, salt],
    ),
  );
}
