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

const scaffoldConfig = {
  targetNetworks: [liskSepolia], // <- PENTING: pakai dari ./chains
  pollingInterval: 30000,
  alchemyApiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || "",
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "",
  onlyLocalBurnerWallet: false, // disarankan false untuk produksi
  walletAutoConnect: true,
} as const satisfies ScaffoldConfig;

export default scaffoldConfig;
