# ⚡ SimpleDEX — Lisk Challenge Week 6

## 📘 Overview
**SimpleDEX** is a lightweight decentralized exchange (DEX) built on **Lisk Sepolia Testnet** using **Hardhat + Next.js**.  
It lets users provide liquidity, remove liquidity, and perform swaps between two ERC-20 tokens — **MyToken** and **SimpleUSDC** — with real-time pool statistics.

---

## ⚙️ Core Features
- 💧 **Add / Remove Liquidity** — supply or withdraw tokens to the pool  
- 🔁 **Token Swap** — instantly swap between MyToken ↔ SimpleUSDC  
- 📊 **Pool Analytics** — live reserves, liquidity share, and ratio display  
- 🔐 **Approval Flow** — secure token approval before adding liquidity  
- 🛡️ **Security** — protected by `ReentrancyGuard` and safe ratio handling  
- 🧩 **Frontend Ready** — integrated with wallet (wagmi + RainbowKit)

---

## 📄 Deployed Contracts (Lisk Sepolia)

| Contract | Address |
|-----------|-----------|
| **MyToken** | `0x720eABB9e58F62454c98a70432D456009B9a1c8c` |
| **SimpleUSDC** | `0xD90EB856847335A0A3Ab40C029f85A730670e579` |
| **SimpleDEX** | `0x22e4fB838dBE14BD1Fc2e9dB96c50A2Ae2D118D0` |
| **PriceFeed** | `0x1f65aF04ce142D05e31A6ad454F8926480da8Cba` |
| **Network** | Lisk Sepolia |
| **RPC** | https://rpc.sepolia-api.lisk.com |

---

## 🧭 How It Works
1. **Approve Tokens** — users must approve DEX to spend MyToken & SimpleUSDC  
2. **Add Liquidity** — both tokens are deposited to the pool  
3. **Remove Liquidity** — users burn LP tokens to reclaim assets  
4. **Swap** — trades are processed using the constant product formula (x * y = k)

---

## 🧰 Tech Stack
- **Solidity / Hardhat** — smart contracts  
- **Next.js / TypeScript** — frontend  
- **TailwindCSS** — UI styling  
- **wagmi + viem + RainbowKit** — wallet integration  
- **Lisk Sepolia RPC** — network connection  

---

## 🚀 Run Locally

```bash
# install deps
yarn install

# compile contracts
yarn hardhat compile

# deploy locally
yarn deploy

# deploy to Lisk Sepolia
yarn deploy --network liskSepolia

# start frontend
cd packages/nextjs
yarn dev

🧑‍💻 Author

@SZtch — builder exploring DeFi on Lisk
