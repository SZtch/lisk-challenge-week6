"use client";

import { Balance } from "../Balance";
import { AddressInfoDropdown } from "./AddressInfoDropdown";
import { AddressQRCodeModal } from "./AddressQRCodeModal";
import { WrongNetworkDropdown } from "./WrongNetworkDropdown";

import { useConnectModal } from "@rainbow-me/rainbowkit";
import { Address as ViemAddress } from "viem";
import { useAccount, useNetwork } from "wagmi";

import { useAutoConnect, useNetworkColor } from "~~/hooks/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { getBlockExplorerAddressLink } from "~~/utils/scaffold-eth";

export const RainbowKitCustomConnectButton = () => {
  useAutoConnect();

  const { openConnectModal } = useConnectModal();
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();

  const networkColor = useNetworkColor();
  const { targetNetwork } = useTargetNetwork();

  const blockExplorerAddressLink = address
    ? getBlockExplorerAddressLink(targetNetwork, address as ViemAddress)
    : undefined;

  // Belum connect → tombol connect
  if (!isConnected || !address || !chain) {
    return (
      <button
        className="btn btn-secondary btn-sm"
        type="button"
        onClick={() => openConnectModal?.()}
      >
        Connect Wallet
      </button>
    );
  }

  // Salah network → dropdown switch network
  if (chain.unsupported || chain.id !== targetNetwork.id) {
    return <WrongNetworkDropdown />;
  }

  // Connected & network benar
  return (
    <>
      <div className="flex flex-col items-center mr-1">
        <Balance address={address as ViemAddress} className="min-h-0 h-auto" />
        <span className="text-xs" style={{ color: networkColor }}>
          {chain.name}
        </span>
      </div>

      <AddressInfoDropdown
        address={address as ViemAddress}
        displayName={address}
        blockExplorerAddressLink={blockExplorerAddressLink}
      />

      {/* QR modal (id unik) */}
      <AddressQRCodeModal address={address as ViemAddress} modalId="qrcode-modal" />
    </>
  );
};
