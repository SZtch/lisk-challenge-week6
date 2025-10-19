"use client";

import Link from "next/link";
import { DebugContracts } from "./_components/DebugContracts";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { getBlockExplorerAddressLink } from "~~/utils/scaffold-eth";

const Debug: NextPage = () => {
  const { address } = useAccount();
  const { targetNetwork } = useTargetNetwork();
  const explorerLink = address ? getBlockExplorerAddressLink(targetNetwork, address) : undefined;

  return (
    <main className="container mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <section className="mb-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="badge badge-success">Live</span>
              <span className="badge">{targetNetwork?.name ?? "Network"}</span>
              {targetNetwork?.id && <span className="badge badge-ghost">Chain ID: {targetNetwork.id}</span>}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mt-3">Debug Contracts</h1>
            <p className="opacity-70 mt-1">
              Read / write ke kontrak yang sudah kamu deploy & verifikasi di Lisk Sepolia.
            </p>
          </div>

          <div className="rounded-2xl bg-base-200/60 backdrop-blur border border-base-300 p-4 md:min-w-[360px]">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <BugAntIcon className="w-5 h-5 opacity-70" />
                <span className="text-sm opacity-70">Connected</span>
              </div>
            </div>
            <div className="mt-2">
              {address ? (
                <div className="flex items-center justify-between gap-3">
                  <Address address={address} format="long" />
                  {explorerLink && (
                    <Link
                      href={explorerLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-xs btn-outline"
                    >
                      Explorer
                    </Link>
                  )}
                </div>
              ) : (
                <span className="text-sm opacity-70">Please connect your wallet</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content Card */}
      <section className="rounded-2xl border border-base-300 bg-base-200/50 backdrop-blur p-4 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-base-300">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Contract Console</span>
            <span className="badge badge-ghost">auto-ABI</span>
            <span className="badge badge-ghost">deployments discovery</span>
          </div>
          <Link href="/" className="btn btn-sm btn-outline">
            ← Back to Home
          </Link>
        </div>

        <div className="mt-6">
          <DebugContracts />
        </div>

        <div className="mt-8 collapse collapse-arrow bg-base-100 border border-base-300 rounded-xl">
          <input type="checkbox" />
          <div className="collapse-title text-base font-medium">Tips</div>
          <div className="collapse-content leading-relaxed text-sm opacity-80">
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Kontrak diambil dari folder <code>packages/hardhat/deployments/&lt;network&gt;/</code>.
              </li>
              <li>
                Pastikan nama kontrak di JSON sama dengan di Solidity (mis. <code>contract MyToken</code>).
              </li>
              <li>
                <code>scaffold.config.ts</code> harus menargetkan <b>Lisk Sepolia</b>.
              </li>
              <li>Setiap transaksi akan muncul di wallet kamu untuk dikonfirmasi.</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Debug;
