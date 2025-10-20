// packages/nextjs/services/web3/wagmiConnectors.ts
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  braveWallet,
  coinbaseWallet,
  ledgerWallet,
  metaMaskWallet,
  rainbowWallet,
  safeWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import type { Chain } from "viem";
import * as chains from "viem/chains";
import { configureChains } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import scaffoldConfig from "~~/scaffold.config";
import { burnerWalletConfig } from "~~/services/web3/wagmi-burner/burnerWalletConfig";
import { getTargetNetworks } from "~~/utils/scaffold-eth";

const targetNetworks = getTargetNetworks();
const { onlyLocalBurnerWallet } = scaffoldConfig;

// Selalu include mainnet sekali (untuk ENS/price), kalau belum ada
const enabledChains: Chain[] = (targetNetworks.find(n => n.id === 1)
  ? targetNetworks
  : [...targetNetworks, chains.mainnet]) as unknown as Chain[];

export const appChains = configureChains(
  enabledChains,
  [alchemyProvider({ apiKey: scaffoldConfig.alchemyApiKey }), publicProvider()],
  {
    stallTimeout: 3_000,
    ...(targetNetworks.find(n => n.id !== chains.hardhat.id)
      ? { pollingInterval: scaffoldConfig.pollingInterval }
      : {}),
  },
);

// === Perbaikan utama: hanya hidupkan WalletConnect kalau projectId ada ===
const wcProjectId = (scaffoldConfig.walletConnectProjectId || "").trim();
const hasWC = wcProjectId.length > 0;

const walletsOptions = { chains: appChains.chains, projectId: wcProjectId };

const baseWallets = [
  metaMaskWallet({ ...walletsOptions, shimDisconnect: true }),
  ledgerWallet(walletsOptions),
  braveWallet(walletsOptions),
  coinbaseWallet({ ...walletsOptions, appName: "scaffold-eth-2" }),
  rainbowWallet(walletsOptions),
  ...(!targetNetworks.some(n => n.id !== chains.hardhat.id) || !onlyLocalBurnerWallet
    ? [
        burnerWalletConfig({
          chains: appChains.chains.filter(chain => targetNetworks.map(({ id }) => id).includes(chain.id)),
        }),
      ]
    : []),
  safeWallet({ ...walletsOptions }),
];

// sisipkan walletConnectWallet hanya jika hasWC = true
const wallets = hasWC ? [baseWallets[0], walletConnectWallet(walletsOptions), ...baseWallets.slice(1)] : baseWallets;

export const wagmiConnectors = connectorsForWallets([
  {
    groupName: "Supported Wallets",
    wallets,
  },
]);
