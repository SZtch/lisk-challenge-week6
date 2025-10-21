"use client";

import { useState } from "react";
import { getContract, prepareContractCall, sendTransaction } from "thirdweb";
import { useActiveAccount } from "thirdweb/react";
import { liskSepoliaThirdweb } from "~~/chains";
import deployedContracts from "~~/contracts/deployedContracts";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { thirdwebClient } from "~~/services/web3/thirdwebConfig";
import { notification } from "~~/utils/scaffold-eth";

export const SmartWalletDemo = () => {
  const [mintToAddress, setMintToAddress] = useState("");
  const [isLoadingNFT, setIsLoadingNFT] = useState(false);
  const account = useActiveAccount();

  const nftAddress = deployedContracts?.[4202]?.MyNFT?.address as `0x${string}` | undefined;

  const { data: totalSupply, refetch: refetchSupply } = useScaffoldContractRead({
    contractName: "MyNFT",
    functionName: "totalSupply",
  });

  const { data: userNFTBalance, refetch: refetchBalance } = useScaffoldContractRead({
    contractName: "MyNFT",
    functionName: "balanceOf",
    args: [account?.address as `0x${string}`],
  });

  const handleGaslessMint = async () => {
    const targetAddress = (mintToAddress || account?.address) as `0x${string}` | undefined;
    if (!targetAddress || !account || !nftAddress) {
      notification.error("Please connect wallet");
      return;
    }

    setIsLoadingNFT(true);
    try {
      const nftContract = getContract({ client: thirdwebClient, chain: liskSepoliaThirdweb, address: nftAddress });

      const transaction = prepareContractCall({
        contract: nftContract,
        method: "function mint(address to)",
        params: [targetAddress],
      });

      const { transactionHash } = await sendTransaction({ transaction, account });
      notification.success(`Minted! https://sepolia-blockscout.lisk.com/tx/${transactionHash}`);

      setMintToAddress("");
      setTimeout(() => {
        refetchSupply();
        refetchBalance();
      }, 2000);
    } catch (e: any) {
      notification.error(e?.message || "Mint failed");
    } finally {
      setIsLoadingNFT(false);
    }
  };

  return (
    <div className="flex justify-center gap-6">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">🎨 Mint NFT (Gasless)</h2>

          <div className="stats stats-vertical shadow mb-4">
            <div className="stat">
              <div className="stat-title">Total Minted</div>
              <div className="stat-value">{totalSupply?.toString() || "0"}</div>
            </div>
            <div className="stat">
              <div className="stat-title">You Own</div>
              <div className="stat-value">{userNFTBalance?.toString() || "0"}</div>
            </div>
          </div>

          <input
            type="text"
            placeholder="Mint to (optional)"
            className="input input-bordered w-full"
            value={mintToAddress}
            onChange={e => setMintToAddress(e.target.value)}
          />
          <button className="btn btn-primary mt-3" onClick={handleGaslessMint} disabled={isLoadingNFT}>
            {isLoadingNFT ? "Minting..." : "Mint NFT (Gas Free!)"}
          </button>
        </div>
      </div>
    </div>
  );
};
