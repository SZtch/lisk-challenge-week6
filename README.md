
# ⚡ Lisk Challenge Week 4 – Oracles & Gasless TX

A dApp built for **@LiskSEA Speedrun Week 4**, integrating **RedStone Oracles** for real-world data and **ERC-4337 gasless transactions** with a smart wallet UX.

### 🔹 Core Features

* Live **ETH/USD** & **BTC/USD** price feeds via **RedStone Pull Oracle**
* **ERC-4337 Account Abstraction** for gasless interactions
* **Thirdweb Paymaster** for sponsored tx
* **Next.js 14 + Scaffold-ETH 2** frontend

### 🔹 Stack

Solidity · Hardhat · RedStone · Next.js · TailwindCSS · RainbowKit · Lisk Sepolia

### 🔹 Commands

```bash
# install
cd packages/nextjs && yarn install

# run local
yarn dev

# deploy contracts
cd ../hardhat && npx hardhat deploy --network lisk-sepolia

# deploy frontend
cd ../nextjs && vercel --prod
```

### 🔹 Live App

🔗 [https://lisk-challenge-week4.vercel.app](https://lisk-challenge-week4.vercel.app)

---
