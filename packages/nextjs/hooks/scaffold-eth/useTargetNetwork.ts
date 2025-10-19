"use client";

import { useEffect } from "react";
import { useNetwork } from "wagmi";
import type { ChainWithAttributes } from "~~/utils/scaffold-eth";
import { useGlobalState } from "~~/services/store/store";

export function useTargetNetwork(): { targetNetwork: ChainWithAttributes } {
  const { chain } = useNetwork();

  // ambil dari Zustand sebagai HOOK (function)
  const targetNetwork = useGlobalState((s) => s.targetNetwork);
  const setTargetNetwork = useGlobalState((s) => s.setTargetNetwork);

  useEffect(() => {
    if (chain && chain.id !== targetNetwork.id) {
      // biarkan tombol switch-network kamu yang handle real switching;
      // ini hanya menyamakan state agar UI konsisten
      setTargetNetwork({
        ...(targetNetwork as ChainWithAttributes),
        id: chain.id as number,
        name: chain.name || targetNetwork.name,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain?.id]);

  return { targetNetwork };
}
