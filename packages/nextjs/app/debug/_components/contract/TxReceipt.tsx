"use client";

import { useMemo, useState } from "react";
import type { TransactionReceipt } from "viem";
import {
  ArrowTopRightOnSquareIcon,
  CheckCircleIcon,
  ClipboardDocumentIcon,
  ClockIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { getBlockExplorerTxLink } from "~~/utils/scaffold-eth/getBlockExplorerTxLinks";

export type TxReceiptProps = {
  /** Jika tersedia, kita ambil hash & status dari receipt ini */
  txResult?: TransactionReceipt;
  /** Alternatif: kirim hash langsung kalau belum punya receipt */
  hash?: `0x${string}`;
  /** Judul kecil di kartu */
  title?: string;
};

/**
 * Komponen tampilan ringkas untuk hasil transaksi.
 * Bisa menerima `TransactionReceipt` penuh atau hanya `hash`.
 */
export const TxReceipt = ({ txResult, hash, title = "Transaction" }: TxReceiptProps) => {
  const { targetNetwork } = useTargetNetwork();
  const [copied, setCopied] = useState(false);

  // Ambil hash dari txResult bila belum diberikan
  const txHash = useMemo(() => (hash ?? txResult?.transactionHash) as `0x${string}` | undefined, [hash, txResult]);

  // Tentukan status transaksi
  const status: "pending" | "success" | "failed" = useMemo(() => {
    if (!txResult) return "pending";
    const s = (txResult as any).status;
    if (s === "success" || s === 1 || s === true) return "success";
    if (s === "reverted" || s === 0 || s === false) return "failed";
    return "pending";
  }, [txResult]);

  // Link ke block explorer
  const explorerUrl = txHash ? getBlockExplorerTxLink(targetNetwork as unknown as any, txHash) : undefined;

  const handleCopy = async () => {
    if (!txHash) return;
    try {
      await navigator.clipboard.writeText(txHash);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <div
      className={`alert ${
        status === "success" ? "alert-success" : status === "failed" ? "alert-error" : "alert-warning"
      } flex items-start justify-between gap-3`}
    >
      <div className="flex items-start gap-3">
        {status === "success" && <CheckCircleIcon className="h-5 w-5 shrink-0" />}
        {status === "failed" && <XCircleIcon className="h-5 w-5 shrink-0" />}
        {status === "pending" && <ClockIcon className="h-5 w-5 shrink-0" />}

        <div className="min-w-0">
          <div className="font-semibold">{title}</div>
          <div className="text-xs opacity-80 break-all font-mono">{txHash ?? "Waiting for transaction..."}</div>

          {explorerUrl && (
            <a
              href={explorerUrl}
              target="_blank"
              rel="noreferrer"
              className="link link-hover text-xs inline-flex items-center gap-1 mt-1"
            >
              View on Explorer <ArrowTopRightOnSquareIcon className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={handleCopy}
        disabled={!txHash}
        aria-label="Copy transaction hash"
        className="btn btn-ghost btn-xs"
      >
        {copied ? (
          <CheckCircleIcon className="h-5 w-5 text-green-500" />
        ) : (
          <ClipboardDocumentIcon className="h-5 w-5" />
        )}
      </button>
    </div>
  );
};

// 👇 gunakan named export agar bisa diambil lewat barrel file
export { TxReceipt as default };
