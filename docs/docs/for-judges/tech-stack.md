# Our Technology Stack

The Loom is built on a modern, robust, and scalable technology stack designed to bridge the gap between Web2 and Web3. Our architectural decisions prioritize security, user experience, and cost-efficiency.

```mermaid
graph TD
    subgraph User Interface
        A[Next.js / React]
        B[Ethers.js]
    end

    subgraph Backend Services
        C[Node.js / Express]
        D[Matchmaking Engine]
        E[SQLite/PostgreSQL]
    end

    subgraph Blockchain (Web3)
        F[Base (L2)]
        G[Solidity Smart Contracts]
        H[Chainlink]
    end

    A -- Interacts with --> C
    A -- Wallet Connection --> B
    B -- Transactions --> G
    C -- Manages Jobs & Workers --> E
    C -- Initiates Blockchain Events --> G
    G -- Runs on --> F
    H -- Provides Data/Automation to --> G
```

---

## Key Components

### Frontend
- **Framework:** Next.js (React)
- **Styling:** Tailwind CSS / Emotion
- **Blockchain Interaction:** Ethers.js to connect to user wallets and interact with our smart contracts.

### Backend
- **Runtime:** Node.js with Express.js
- **Database:** SQLite for hackathon-level simplicity, designed for easy migration to PostgreSQL for production.
- **Core Logic:** A custom matchmaking engine to efficiently pair clients with the best-suited worker nodes based on job requirements, worker specs, and reputation.

### Blockchain
- **Smart Contracts:** Written in Solidity. The core logic includes a `JobManager` contract that handles the entire lifecycle of a compute job, including escrow, collateral, and payment settlement.
- **Oracles & Automation:** Chainlink is used for reliable price feeds (to calculate costs in USD) and its automation capabilities can be used for periodic tasks and failsafe mechanisms.

---

## Why We Chose Base as our Layer 2

Our choice of an L2 solution was critical. We needed a platform that was secure, scalable, and, most importantly, affordable for our users. We chose **Base** for several key reasons:

1.  **Low Transaction Costs:** For a marketplace that may handle thousands of jobs, keeping transaction fees to a minimum is paramount. Base's architecture, built on the OP Stack, offers significantly lower gas fees compared to Ethereum mainnet, making our platform economically viable for both clients and workers.

2.  **Scalability and Speed:** Base provides the high throughput and fast confirmation times necessary for a responsive user experience. Jobs can be posted, accepted, and paid for without the long waits associated with a congested L1.

3.  **Ethereum Security:** By settling transactions on Ethereum, Base inherits the security and decentralization of the most battle-tested blockchain network. This ensures that user funds in our escrow contracts are secure.

4.  **Developer-Friendly Ecosystem:** Base is EVM-compatible, meaning we can use the same battle-tested tools and development patterns from the Ethereum ecosystem (like Hardhat, Ethers.js, and Solidity) without a steep learning curve. This accelerated our development process significantly during the hackathon.

By building on Base, we are not just creating a functional prototype; we are laying the groundwork for a production-ready system capable of onboarding the next wave of users to decentralized computing.
