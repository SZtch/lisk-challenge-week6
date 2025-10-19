import type { Chain } from "viem";
export type ChainWithAttributes = Chain & {
  iconUrl?: string;
  badge?: string;
};
