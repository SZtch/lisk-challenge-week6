# 🚀 Lisk Speedrun - Week 3  


### 🧩 Overview

This dApp listens to `Transfer` events from two deployed contracts:

- **MyToken (ERC20)** – for token transfers  
- **MyNFT (ERC721)** – for minting and ownership transfers

  

The app uses the `useScaffoldEventHistory` hook to fetch on-chain events dynamically and display them in a paginated, user-friendly interface.

---

### ⚙️ Features

✅ Display real-time **token and NFT transfer events**  
✅ View **block number**, **transaction hash**, and **addresses**  
✅ Simple **tab switcher** between Token & NFT events  
✅ Responsive and styled using **DaisyUI + TailwindCSS**  
✅ Safe RPC window (limited to last 100k blocks to prevent rate errors)

---

### 🛠️ Tech Stack

- **Next.js 14**
- **Wagmi + Viem**
- **Scaffold-Lisk framework**
- **DaisyUI (TailwindCSS)**
- **Vercel deployment**

---

### 🔍 Structure

```bash
packages/nextjs/
├── app/
│   ├── events/
│   │   └── page.tsx        # Week 3 main feature
│   ├── debug/              # From week 2
│   └── page.tsx            # Homepage
├── components/
│   └── scaffold-eth/       # Shared components
└── scaffold.config.ts      # Config & network setup
````

---

### 🧠 How It Works

1. Fetches latest block number from Lisk Sepolia
2. Reads event logs (`Transfer` events) from both contracts
3. Displays formatted results (from/to/amount/block/tx link)
4. Auto-updates when new transactions occur

---

### 🧾 Contract Addresses

| Contract | Type   | Address                                      |
| -------- | ------ | -------------------------------------------- |
| MyToken  | ERC20  | `0x720eABB9e58F62454c98a70432D456009B9a1c8c` |
| MyNFT    | ERC721 | `0x0c6d0D811B9A82Bbe8Dc34Ea561665B9F511EbdF` |

---

### 🌐 Live Demo

🔗 **Frontend URL:**
[https://lisk-challenge-week3.vercel.app/events](https://lisk-challenge-week3.vercel.app/events)

🔗 **GitHub Repository:**
[https://github.com/SZtch/lisk-challenge-week3](https://github.com/SZtch/lisk-challenge-week3)

