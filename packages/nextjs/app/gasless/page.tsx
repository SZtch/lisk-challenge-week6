"use client";

import type { NextPage } from "next";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { liskSepoliaThirdweb } from "~~/chains";
import { SmartWalletDemo } from "~~/components/example-ui/SmartWalletDemo";
import { thirdwebClient } from "~~/services/web3/thirdwebConfig";

const Gasless: NextPage = () => {
  const account = useActiveAccount();
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-4">⛽ Gasless Transactions</h1>
      <p className="text-center opacity-70 mb-8">ERC-4337 Smart Wallets with sponsored gas</p>
      <div className="flex justify-center mb-8">
        <ConnectButton
          client={thirdwebClient}
          chain={liskSepoliaThirdweb}
          accountAbstraction={{ chain: liskSepoliaThirdweb, sponsorGas: true }}
        />
      </div>
      {account ? (
        <SmartWalletDemo />
      ) : (
        <div className="text-center opacity-70">Connect to create your Smart Wallet</div>
      )}
    </div>
  );
};

export default Gasless;
