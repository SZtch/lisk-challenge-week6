// packages/nextjs/utils/scaffold-eth/getBlockExplorerTxLinks.ts
import type { ChainWithAttributes } from "./networks";

// ← PENTING: ambil dari networks, bukan dari ./types

export const getBlockExplorerTxLink = (chain: ChainWithAttributes, txHash: `0x${string}`): string | undefined => {
  const base =
    chain.blockExplorers?.default?.url ??
    // fallback lama (kalau kamu set sendiri di extra data)
    // @ts-expect-error: optional legacy field
    chain.blockExplorerUrl ??
    "";

  if (!base) return undefined;
  return `${base.replace(/\/+$/, "")}/tx/${txHash}`;
};
