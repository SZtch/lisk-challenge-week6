"use client";

import { Address as AddressType } from "viem";
import { useEnsName } from "wagmi";

type AddressProps = {
  address?: AddressType; // bikin optional biar ga crash
  format?: "short" | "long";
  disableAddressLink?: boolean;
  explorerBaseUrl?: string; // opsional
};

/**
 * Simple reusable Address component
 * - Menampilkan alamat wallet (bisa ENS)
 * - format short: 0x1234...abcd
 * - format long: alamat lengkap
 */
export const Address = ({
  address,
  format = "short",
  disableAddressLink,
  explorerBaseUrl = "https://etherscan.io",
}: AddressProps) => {
  // kalau address belum ada, jangan panggil ENS
  const { data: ensName } = useEnsName(address ? { address } : { address: undefined });

  const formatted =
    ensName ??
    (address
      ? format === "short"
        ? `${address.slice(0, 6)}...${address.slice(-4)}`
        : address
      : "—");

  if (!address || disableAddressLink) {
    return <span className="font-mono text-sm">{formatted}</span>;
  }

  return (
    <a
      href={`${explorerBaseUrl}/address/${address}`}
      target="_blank"
      rel="noopener noreferrer"
      className="font-mono text-sm text-blue-400 hover:underline"
    >
      {formatted}
    </a>
  );
};
