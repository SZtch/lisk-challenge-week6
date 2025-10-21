"use client";

import { useAccount } from "wagmi";
import { PriceDisplay } from "~~/components/example-ui/PriceDisplay";

export default function OraclePage() {
  const { isConnected } = useAccount();
  if (!isConnected) return <div className="p-10 text-center">Connect wallet to view prices</div>;
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">🔮 Live Price Feeds</h1>
      <div className="flex justify-center gap-6 flex-col sm:flex-row">
        <PriceDisplay symbol="ETH" />
        <PriceDisplay symbol="BTC" />
      </div>
    </div>
  );
}
