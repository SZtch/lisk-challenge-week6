"use client";

import { NFTCollection } from "~~/components/example-ui/NFTCollection";
import { TokenBalance } from "~~/components/example-ui/TokenBalance";
import { TokenTransfer } from "~~/components/example-ui/TokenTransfer";
import { TxHistory } from "~~/components/example-ui/TxHistory";

export default function Home() {
  return (
    <section className="flex flex-col items-center p-10">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <TokenBalance />
        <TokenTransfer />
        <NFTCollection />
      </div>

      <div className="mt-8 w-full flex justify-center">
        <TxHistory />
      </div>
    </section>
  );
}
