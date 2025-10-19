"use client";

import { useMemo } from "react";
import { useTheme } from "next-themes";
import { useNetwork, useSwitchNetwork } from "wagmi";
import { ArrowsRightLeftIcon } from "@heroicons/react/24/solid";
import { getNetworkColor } from "~~/hooks/scaffold-eth";
import { getTargetNetworks } from "~~/utils/scaffold-eth";

type NetworkOptionsProps = {
  hidden?: boolean;
};

export const NetworkOptions = ({ hidden = false }: NetworkOptionsProps) => {
  const { switchNetwork, isLoading: isSwitching } = useSwitchNetwork();
  const { chain } = useNetwork();
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";

  // Ambil sekali dan filter yang berbeda dari chain aktif
  const allowedNetworks = useMemo(() => {
    const nets = getTargetNetworks();
    return chain ? nets.filter(n => n.id !== chain.id) : nets;
  }, [chain]);

  // Kalau tidak ada network alternatif, jangan render apa-apa
  if (!allowedNetworks.length) return null;

  return (
    <>
      {allowedNetworks.map(net => {
        const color = getNetworkColor(net, isDarkMode);
        const disabled = !switchNetwork || isSwitching;

        return (
          <li key={`switch-${net.id}`} className={hidden ? "hidden" : ""}>
            <button
              type="button"
              aria-label={`Switch to ${net.name ?? "target network"}`}
              className="menu-item btn-sm !rounded-xl flex gap-3 py-3 whitespace-nowrap disabled:opacity-60"
              onClick={() => switchNetwork?.(net.id)}
              disabled={disabled}
            >
              <ArrowsRightLeftIcon className="h-6 w-4 ml-2 sm:ml-0" />
              <span>
                Switch to{" "}
                <span style={{ color }}>{net.name ?? `Chain ${net.id}`}</span>
              </span>
            </button>
          </li>
        );
      })}
    </>
  );
};
