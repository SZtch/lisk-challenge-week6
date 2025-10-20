"use client";

import { create } from "zustand";
import scaffoldConfig from "~~/scaffold.config";
import type { ChainWithAttributes } from "~~/utils/scaffold-eth";

/**
 * Global app state (Zustand)
 */

type GlobalState = {
  nativeCurrencyPrice: number;
  setNativeCurrencyPrice: (price: number) => void;

  targetNetwork: ChainWithAttributes;
  setTargetNetwork: (chain: ChainWithAttributes) => void;
};

// fallback aman kalau array kosong (hindari undefined)
const FALLBACK_CHAIN = (scaffoldConfig.targetNetworks &&
  scaffoldConfig.targetNetworks[0]) as unknown as ChainWithAttributes;

export const useGlobalState = create<GlobalState>(set => ({
  nativeCurrencyPrice: 0,
  setNativeCurrencyPrice: (price: number) => set({ nativeCurrencyPrice: price }),

  targetNetwork: FALLBACK_CHAIN,
  setTargetNetwork: (chain: ChainWithAttributes) => set({ targetNetwork: chain }),
}));

export type { GlobalState };
