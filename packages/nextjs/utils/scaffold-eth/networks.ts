import scaffoldConfig from "~~/scaffold.config";

export type ChainWithAttributes = {
  id: number;
  name: string;
  nativeCurrency: { name: string; symbol: string; decimals: number };
  rpcUrls: { default: { http: string[] } };
  blockExplorers?: { default: { name: string; url: string } };
};

// Tambahan info per chain yang Anda pakai
export const NETWORKS_EXTRA_DATA: Record<
  number,
  { blockExplorer?: string }
> = {
  // Lisk Sepolia = 4202
  4202: {
    blockExplorer: "https://sepolia-blockscout.lisk.com",
  },
};

// Mengembalikan daftar network target dari scaffold.config
export function getTargetNetworks(): ChainWithAttributes[] {
  return scaffoldConfig.targetNetworks.map(n => ({
    id: n.id,
    name: (n as any).name ?? "Unknown",
    nativeCurrency: (n as any).nativeCurrency ?? {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: (n as any).rpcUrls ?? { default: { http: [] } },
    blockExplorers: (n as any).blockExplorers,
  }));
}
