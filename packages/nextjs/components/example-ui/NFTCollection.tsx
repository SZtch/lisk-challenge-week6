"use client";

import { useState } from "react";
import { isAddress } from "viem";
import { useAccount, usePublicClient } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { useTxHistory } from "~~/services/store/txHistory";
import { notification } from "~~/utils/scaffold-eth";

type HexAddress = `0x${string}`;

export const NFTCollection = () => {
  const { address: connectedAddress } = useAccount();
  const publicClient = usePublicClient();
  const addTx = useTxHistory(s => s.add);

  const [mintToAddress, setMintToAddress] = useState("");

  const { data: nftName } = useScaffoldContractRead({ contractName: "MyNFT", functionName: "name" });
  const { data: nftSymbol } = useScaffoldContractRead({ contractName: "MyNFT", functionName: "symbol" });
  const { data: totalSupply } = useScaffoldContractRead({ contractName: "MyNFT", functionName: "totalSupply" });

  // ✅ fix tipe argumen: cast ke `0x${string}` | undefined
  const { data: userBalance } = useScaffoldContractRead({
    contractName: "MyNFT",
    functionName: "balanceOf",
    args: [connectedAddress as HexAddress | undefined],
  });

  const { writeAsync: writeMyNFTAsync } = useScaffoldContractWrite({
    contractName: "MyNFT",
    functionName: "mint",
    // argumen akan diisi saat dipanggil; definisi awal boleh kosong
    args: [undefined] as const,
  });

  const handleMint = async () => {
    const self = connectedAddress as HexAddress | undefined;
    let target: HexAddress | undefined;

    // kalau input diisi, validasi dulu
    const input = mintToAddress.trim();
    if (input) {
      if (!isAddress(input)) {
        notification.error("Invalid address format");
        return;
      }
      target = input as HexAddress;
    } else {
      // fallback ke wallet sendiri
      target = self;
    }

    if (!target) {
      notification.error("Please connect wallet or specify address");
      return;
    }

    try {
      const tx: any = await writeMyNFTAsync({ args: [target] });
      const hash = (typeof tx === "string" ? tx : tx?.hash) as `0x${string}` | undefined;

      if (hash) {
        await publicClient?.waitForTransactionReceipt({ hash });
        addTx({ hash, label: "Mint", timestamp: Date.now() });
      }

      notification.success("NFT minted successfully!");
      setMintToAddress("");
    } catch (error) {
      console.error("Mint failed:", error);
      notification.error("Minting failed. Please try again.");
    }
  };

  if (!connectedAddress) {
    return (
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">NFT Collection</h2>
          <p>Please connect your wallet to view and mint NFTs</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          {nftName} ({nftSymbol})
        </h2>

        <div className="stats">
          <div className="stat">
            <div className="stat-title">Total Minted</div>
            <div className="stat-value text-secondary">{totalSupply?.toString() || "0"}</div>
          </div>
          <div className="stat">
            <div className="stat-title">You Own</div>
            <div className="stat-value text-accent">{userBalance?.toString() || "0"}</div>
          </div>
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Mint to address (leave empty for yourself)</span>
          </label>
          <input
            type="text"
            placeholder="0x... or leave empty"
            className="input input-bordered w-full max-w-xs"
            value={mintToAddress}
            onChange={e => setMintToAddress(e.target.value)}
          />
        </div>

        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={handleMint}>
            Mint NFT
          </button>
        </div>

        <div className="text-sm text-gray-600">
          <Address address={connectedAddress} />
        </div>
      </div>
    </div>
  );
};
