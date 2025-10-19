"use client";

import { Address as AddressType } from "viem";
import { useEnsName } from "wagmi";

type AddressProps = {
  address: AddressType;
  format?: "short" | "long";
  disableAddressLink?: boolean;
};

/**
 * Simple reusable Address component
 * - Menampilkan alamat wallet (bisa ENS)
 * - format short: 0x1234...abcd
 * - format long: alamat lengkap
 */
export const Address = ({ address, format = "short", disableAddressLink }: AddressProps) => {
  const { data: ensName } = useEnsName({ address });

  const formatted = ensName ? ensName : format === "short" ? `${address.slice(0, 6)}...${address.slice(-4)}` : address;

  return disableAddressLink ? (
    <span className="font-mono text-sm">{formatted}</span>
  ) : (
    <a
      href={`https://etherscan.io/address/${address}`}
      target="_blank"
      rel="noopener noreferrer"
      className="font-mono text-sm text-blue-400 hover:underline"
    >
      {formatted}
    </a>
  );
};
