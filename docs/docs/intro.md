# Welcome to The Loom: The Airbnb for GPUs

![The Loom Banner](/img/banner.png)

:::tip Live Demo
Try the live application at [the-loom.vercel.app](https://the-loom.vercel.app)
:::

## 🎯 We are Weaving the World's Computing Power

**The Loom** is a decentralized supercomputer, operating as a peer-to-peer marketplace. We connect users who need intensive computational power with a global network of providers who make their idle CPUs and GPUs available.

In short, we are the **"Airbnb for GPUs."**

### The Problem We Solve

- 💰 **Exorbitant Costs:** Access to high-performance computing is controlled by a few tech giants, making it prohibitively expensive.
-  idle **Massive Inefficiency:** Billions of dollars worth of powerful hardware sits idle in personal computers and private servers across the globe.
- 🚧 **Innovation Bottleneck:** This inefficiency stifles innovation, concentrates power, and slows down the very progress that technologies like AI promise.

### Our Solution: A Decentralized Marketplace

The Loom transforms any idle device into a node in a global computation network, creating a more accessible, efficient, and fair market for everyone.

- ✅ **For Users:** Access the computational power you need at a **60-80% cost savings** compared to traditional cloud providers.
- ✅ **For Providers:** Monetize your hardware when you're not using it.
- ✅ **Trustless & Secure:** All transactions are managed by audited smart contracts on the blockchain, ensuring fairness and security.

---

### High-Level Architecture

Our ecosystem is composed of three main actors: the **Client** (who needs computation), the **Worker** (who provides it), and **The Loom Network**, which orchestrates the process.

```mermaid
graph TD
    subgraph The Loom Network
        A[Client]
        B[The Loom Platform API/dApp]
        C[Matchmaking Service]
    end

    subgraph Blockchain (Base L2)
        D[Job Manager Smart Contract]
    end

    subgraph Worker Infrastructure
        E[Worker Node]
        F[Computation Environment]
    end

    A -- 1. Submit Job (Task, Budget) --> B
    B -- 2. Find Available Worker --> C
    C -- 3. Offer Job --> E
    E -- 4. Accept Job & Lock Collateral --> D
    A -- 5. Deposit Escrow Payment --> D
    D -- 6. Notify Worker to Start --> E
    E -- 7. Execute Task --> F
    F -- 8. Return Results --> A
    A -- 9. Confirm Completion --> D
    D -- 10. Release Payment to E & Return Collateral --> E
```

---

## 🏆 Built for the Future, on a Solid Foundation

This project was built for the [Hackathon Name] hackathon, leveraging cutting-edge technologies to deliver a robust and scalable solution.

<div style={{display: 'flex', gap: '2rem', alignItems: 'center', margin: '2rem 0'}}>
  <img src="/img/chainlink-logo.png" alt="Chainlink" height="60"/>
  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/BASE_logo.svg" alt="Base" height="60"/>
  <img src="/img/ethereum-logo.png" alt="Ethereum" height="60"/>
</div>

### Integration Points

| Technology | Role in The Loom |
|---|---|
| **Base (L2)** | Provides a secure, low-cost, and scalable environment for our smart contracts, making job and payment transactions fast and affordable. |
| **Chainlink** | We use Chainlink for Price Feeds (e.g., USD to ETH conversion for stable pricing) and potentially for future automation tasks. |
| **Ethereum** | The foundational settlement layer, providing ultimate security and decentralization for our network. |

---

## 🚀 Get Started

Ready to join the decentralized computing revolution?

- **[Quick Start Guide →](/getting-started/quick-start)**: Get the platform running in 3 minutes.
- **[Become a Worker →](/worker-node/setup)**: Learn how to connect your hardware and start earning.

---

## 🤝 Team

Built by:
- **[Seu Nome]** - Full Stack + Smart Contracts
- **[Membro 2]** - Frontend + Design
- **[Membro 3]** - Backend + Infrastructure