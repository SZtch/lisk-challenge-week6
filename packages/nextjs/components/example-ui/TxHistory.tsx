"use client";

import { useEffect, useState } from "react";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { useTxHistory } from "~~/services/store/txHistory";
import { getBlockExplorerTxLink } from "~~/utils/scaffold-eth";

export const TxHistory = () => {
  const [mounted, setMounted] = useState(false);
  const { targetNetwork } = useTargetNetwork();
  const { items = [], clear } = useTxHistory(); // ✅ kasih default []

  useEffect(() => setMounted(true), []);
  if (!mounted) return null; // pastikan localStorage sudah ready

  if (!items || items.length === 0) {
    return (
      <div className="card bg-base-200 border border-base-300">
        <div className="card-body">
          <h3 className="card-title">Transaction History</h3>
          <p className="opacity-70">No transactions yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-base-200 border border-base-300">
      <div className="card-body">
        <div className="flex items-center justify-between">
          <h3 className="card-title">Transaction History</h3>
          <button className="btn btn-ghost btn-xs" onClick={clear}>
            Clear
          </button>
        </div>
        <ul className="divide-y divide-base-300 mt-2">
          {items.map(item => (
            <li key={item.hash} className="py-3 flex items-center justify-between">
              <div className="flex-1">
                <div className="font-medium">{item.label}</div>
                <div className="text-xs opacity-70">{new Date(item.timestamp).toLocaleString()}</div>
                <div className="text-xs truncate opacity-70">{item.hash}</div>
              </div>
              <a
                href={item.explorerUrl ?? getBlockExplorerTxLink(targetNetwork, item.hash)}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline btn-xs ml-3"
              >
                Explorer
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
