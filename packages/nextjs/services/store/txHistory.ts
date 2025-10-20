"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type TxItem = {
  hash: `0x${string}`;
  label: string; // e.g. "Transfer" / "Mint"
  timestamp: number; // Date.now()
  explorerUrl?: string; // optional: langsung simpan url explorer
};

type TxHistoryState = {
  items: TxItem[];
  add: (tx: TxItem) => void;
  remove: (hash: `0x${string}`) => void;
  clear: () => void;
};

export const useTxHistory = create<TxHistoryState>()(
  persist(
    (set, get) => ({
      items: [],
      add: tx => {
        // hindari duplikat & batasi 50 entri terbaru
        const exists = get().items.some(i => i.hash === tx.hash);
        if (exists) return;
        set({ items: [tx, ...get().items].slice(0, 50) });
      },
      remove: hash => set({ items: get().items.filter(i => i.hash !== hash) }),
      clear: () => set({ items: [] }),
    }),
    {
      name: "tx-history", // kunci localStorage
      storage: createJSONStorage(() => localStorage),
      version: 1,
      partialize: s => ({ items: s.items }), // hanya persist data, bukan fungsi
    },
  ),
);
