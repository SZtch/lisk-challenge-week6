"use client";

import { useMemo, useState } from "react";
import type { NextPage } from "next";
import { formatEther } from "viem";
import { useAccount, useBlockNumber, useChainId } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";

const LISK_SEPOLIA_CHAIN_ID = 4202;

const Events: NextPage = () => {
  // Wallet & network
  const { isConnected } = useAccount();
  const chainId = useChainId();

  // Tab: token / nft
  const [eventType, setEventType] = useState<"token" | "nft">("token");

  // Latest block (reactive)
  const { data: latestBlock } = useBlockNumber({ watch: true });

  // Safe window (hindari limit RPC getLogs)
  const WINDOW_BACK = 100_000n; // turunkan jika RPC masih protes
  const fromBlock = useMemo(() => {
    if (!latestBlock) return undefined as bigint | undefined;
    return latestBlock > WINDOW_BACK ? latestBlock - WINDOW_BACK : 0n;
  }, [latestBlock]);

  // always bigint untuk type-safety
  const safeFromBlock = fromBlock ?? 0n;

  // enable fetch kalau chain benar & fromBlock sudah ada
  const enabled = chainId === LISK_SEPOLIA_CHAIN_ID && fromBlock !== undefined;

  // Events: ERC20 Transfer
  const {
    data: tokenEvents = [],
    isLoading: tokenLoading,
    error: tokenError,
  } = useScaffoldEventHistory({
    contractName: "MyToken",
    eventName: "Transfer",
    fromBlock: safeFromBlock,
    watch: true,
    enabled,
  });

  // Events: ERC721 Transfer
  const {
    data: nftEvents = [],
    isLoading: nftLoading,
    error: nftError,
  } = useScaffoldEventHistory({
    contractName: "MyNFT",
    eventName: "Transfer",
    fromBlock: safeFromBlock,
    watch: true,
    enabled,
  });

  const currentEvents = eventType === "token" ? tokenEvents : nftEvents;
  const isLoading = eventType === "token" ? tokenLoading : nftLoading;
  const error = eventType === "token" ? tokenError : nftError;

  // Guards
  if (!isConnected) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body text-center">
            <h2 className="card-title justify-center">Contract Events</h2>
            <p>Please connect your wallet to view events</p>
          </div>
        </div>
      </div>
    );
  }

  if (chainId !== LISK_SEPOLIA_CHAIN_ID) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body text-center">
            <h2 className="card-title justify-center">Wrong network</h2>
            <p>
              Switch your wallet to <b>Lisk Sepolia (4202)</b>.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // UI
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center mb-4">📜 Contract Events</h1>
        <p className="text-center text-gray-600">View transaction history for your contracts</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-6">
        <div className="tabs tabs-boxed">
          <button className={`tab ${eventType === "token" ? "tab-active" : ""}`} onClick={() => setEventType("token")}>
            Token Transfers ({tokenEvents.length})
          </button>
          <button className={`tab ${eventType === "nft" ? "tab-active" : ""}`} onClick={() => setEventType("nft")}>
            NFT Activity ({nftEvents.length})
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{eventType === "token" ? "🪙 Token Events" : "🎨 NFT Events"}</h2>

          {error ? (
            <div className="alert alert-error mt-4">
              <span>Failed to load events: {String((error as any)?.message || error)}</span>
            </div>
          ) : isLoading || fromBlock === undefined ? (
            <div className="flex justify-center py-8">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : currentEvents.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No events found</p>
              <p className="text-sm">
                {eventType === "token"
                  ? "Transfer some tokens to see events here"
                  : "Mint some NFTs to see events here"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>From</th>
                    <th>To</th>
                    <th>{eventType === "token" ? "Amount" : "Token ID"}</th>
                    <th>Block</th>
                    <th>Transaction</th>
                  </tr>
                </thead>
                <tbody>
                  {currentEvents
                    .slice()
                    .reverse()
                    .slice(0, 50)
                    .map((event, idx) => (
                      <tr key={`${event.log.transactionHash}-${idx}`}>
                        <td>
                          <Address address={event.args.from as `0x${string}`} />
                        </td>
                        <td>
                          <Address address={event.args.to as `0x${string}`} />
                        </td>
                        <td>
                          {eventType === "token" ? (
                            <span className="font-mono">
                              {Number(formatEther((event.args as any)[2] ?? 0n)).toFixed(4)} LSEA
                            </span>
                          ) : (
                            <span className="badge badge-primary">#{(event.args as any)[2]?.toString()}</span>
                          )}
                        </td>
                        <td>
                          <span className="text-sm">{event.log.blockNumber.toString()}</span>
                        </td>
                        <td>
                          <a
                            href={`https://sepolia-blockscout.lisk.com/tx/${event.log.transactionHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-xs btn-outline"
                          >
                            View →
                          </a>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
