"use client";

import { useEffect, useState } from "react";
import { WrapperBuilder } from "@redstone-finance/evm-connector";
import { getSignersForDataServiceId } from "@redstone-finance/sdk";
import { ethers } from "ethers";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";

type SymbolT = "ETH" | "BTC";

export const PriceDisplay = ({ symbol }: { symbol: SymbolT }) => {
  const [price, setPrice] = useState<string>("-");
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState<string>("");

  // ambil address & abi dari deployedContracts.ts (sudah kamu isi)
  const { data: priceFeed } = useDeployedContractInfo("PriceFeed");

  const fetchPrice = async () => {
    setIsLoading(true);
    setErr("");

    try {
      if (!priceFeed?.address || !priceFeed?.abi) {
        throw new Error("PriceFeed not deployed");
      }
      if (typeof window === "undefined" || !window.ethereum) {
        throw new Error("Please connect your wallet");
      }

      // ethers v5 provider & contract
      const provider = new ethers.providers.Web3Provider(window.ethereum as any);
      const contract = new ethers.Contract(priceFeed.address, priceFeed.abi, provider);

      // ==== RedStone wrapper (coba API baru, fallback ke lama) ====
      let wrapped: any;

      // API baru (preferred): usingDataService({ dataPackagesIds, authorizedSigners })
      const tryNewApi = () => {
        return (WrapperBuilder as any).wrap(contract).usingDataService({
          dataPackagesIds: [symbol],
          authorizedSigners: getSignersForDataServiceId("redstone-main-demo"),
        });
      };

      // API lama (fallback): usingDataService({ dataServiceId, uniqueSignersCount, dataFeeds })
      const tryOldApi = () => {
        return (WrapperBuilder as any).wrap(contract).usingDataService({
          dataServiceId: "redstone-main-demo",
          uniqueSignersCount: 1,
          dataFeeds: [symbol],
        });
      };

      try {
        wrapped = tryNewApi();
      } catch {
        wrapped = tryOldApi();
      }

      // panggil fungsi di kontrak
      const raw = symbol === "ETH" ? await wrapped.getEthPrice() : await wrapped.getBtcPrice();

      // format 8 desimal ke 2 desimal
      const num = typeof raw === "object" && raw?._isBigNumber ? (raw as any).toString() : String(raw);
      const formatted = (Number(num) / 1e8).toFixed(2);

      setPrice(formatted);
    } catch (e: any) {
      console.error(e);
      setErr(e?.message || "Failed to fetch price");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrice();
    const id = setInterval(fetchPrice, 30_000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbol, priceFeed?.address]);

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title justify-center">{symbol}/USD</h2>

        {err ? (
          <div className="alert alert-error">
            <span className="text-sm">{err}</span>
          </div>
        ) : isLoading ? (
          <div className="flex justify-center py-8">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : (
          <div className="stats">
            <div className="stat">
              <div className="stat-title">Current Price</div>
              <div className="stat-value">${price}</div>
              <div className="stat-desc">Live via RedStone</div>
            </div>
          </div>
        )}

        <div className="card-actions justify-end">
          <button className="btn btn-sm btn-outline" onClick={fetchPrice} disabled={isLoading}>
            {isLoading ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>
    </div>
  );
};
