import { randomBytes } from "crypto";
import { ethers } from "ethers";

export function createCommit(txData) {
  const salt = ethers.hexlify(randomBytes(32));

  const hash = ethers.keccak256(
    ethers.toUtf8Bytes(JSON.stringify(txData) + salt),
  );

  return { hash, salt };
}
