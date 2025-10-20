// packages/nextjs/scaffold.config.ts
import { liskSepolia } from "./chains";
import type { Chain } from "viem";

export type ScaffoldConfig = {
  targetNetworks: readonly Chain[];
  pollingInterval: number;
  alchemyApiKey: string;
  walletConnectProjectId: string;
  onlyLocalBurnerWallet: boolean;
  walletAutoConnect: boolean;
};

/**
 * Konfigurasi utama untuk scaffold-eth Next.js app
 * Pastikan semua ENV variable sudah diisi di .env.local / Vercel
 */
const scaffoldConfig = {
  // Target chain utama (bisa tambah chain lain jika perlu)
  targetNetworks: [liskSepolia],

  // Interval polling untuk wagmi (ms)
  pollingInterval: 30_000,

  // Alchemy key (opsional untuk RPC fallback)
  alchemyApiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || "",

  // WalletConnect Project ID (WAJIB diisi untuk koneksi wallet)
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "cef802b864a9649470f357a984356f1a",

  // Kalau true → hanya aktif burner wallet di local hardhat
  onlyLocalBurnerWallet: false,

  // Auto connect wallet ketika user reload
  walletAutoConnect: true,
} as const satisfies ScaffoldConfig;

export default scaffoldConfig;
