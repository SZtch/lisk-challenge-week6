import type { Address } from "viem";

/** Minimal ChainWithAttributes shape used by these helpers */
type ChainWithAttributes = {
  blockExplorers?: { default?: { url?: string } };
  rpcUrls?: { default?: { http?: string[] } };
};

/** Link ke halaman alamat pada block explorer jaringan target */
export function getBlockExplorerAddressLink(targetNetwork: ChainWithAttributes, address: Address): string {
  const base =
    targetNetwork.blockExplorers?.default?.url ??
    (targetNetwork.rpcUrls?.default?.http?.[0] ? targetNetwork.rpcUrls.default.http[0].replace(/\/v\d+.*$/, "") : "");

  // Contoh Blockscout: https://sepolia-blockscout.lisk.com/address/0xabc...
  return `${base.replace(/\/$/, "")}/address/${address}`;
}

/** Link ke halaman transaksi pada block explorer jaringan target */
export function getBlockExplorerTxLink(targetNetwork: ChainWithAttributes, txHash: string): string {
  const base =
    targetNetwork.blockExplorers?.default?.url ??
    (targetNetwork.rpcUrls?.default?.http?.[0] ? targetNetwork.rpcUrls.default.http[0].replace(/\/v\d+.*$/, "") : "");

  // Contoh Blockscout: https://sepolia-blockscout.lisk.com/tx/0xhash
  return `${base.replace(/\/$/, "")}/tx/${txHash}`;
}
export * from "./getBlockExplorerLinks";
