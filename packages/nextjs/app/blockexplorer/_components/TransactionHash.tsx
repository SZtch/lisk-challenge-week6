"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircleIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";

type Props = { hash: string };

export const TransactionHash = ({ hash }: Props) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(hash);
      setCopied(true);
      setTimeout(() => setCopied(false), 800);
    } catch (e) {
      console.error("Copy failed", e);
    }
  };

  const short = `${hash?.slice(0, 6)}...${hash?.slice(-4)}`;

  return (
    <div className="flex items-center">
      <Link href={`/blockexplorer/transaction/${hash}`}>{short}</Link>
      {copied ? (
        <CheckCircleIcon
          className="ml-1.5 text-xl font-normal text-sky-600 h-5 w-5"
          aria-hidden="true"
        />
      ) : (
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy transaction hash"
          className="ml-1.5"
        >
          <DocumentDuplicateIcon
            className="text-xl font-normal text-sky-600 h-5 w-5"
            aria-hidden="true"
          />
        </button>
      )}
    </div>
  );
};
