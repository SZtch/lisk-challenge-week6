// packages/nextjs/chains.ts
// ===== wagmi / viem chain =====
// ===== thirdweb chain =====
import { defineChain as defineChainThirdweb } from "thirdweb";
import type { Chain } from "viem";

export const liskSepolia: Chain = {
  id: 4202,
  name: "Lisk Sepolia",
  network: "lisk-sepolia", // ✅ wajib untuk viem v2
  nativeCurrency: {
    name: "Sepolia Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ["https://rpc.sepolia-api.lisk.com"] },
    public: { http: ["https://rpc.sepolia-api.lisk.com"] },
  },
  blockExplorers: {
    default: {
      name: "Lisk Sepolia Explorer",
      url: "https://sepolia-blockscout.lisk.com",
    },
  },
  testnet: true,
};

export const liskSepoliaThirdweb = defineChainThirdweb({
  id: 4202,
  name: "Lisk Sepolia",
  nativeCurrency: {
    name: "Sepolia Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpc: "https://rpc.sepolia-api.lisk.com",
  blockExplorers: [
    {
      name: "Lisk Sepolia Explorer",
      url: "https://sepolia-blockscout.lisk.com",
    },
  ],
  testnet: true,
});
