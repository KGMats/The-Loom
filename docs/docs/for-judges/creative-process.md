---
sidebar_position: 2
---

# Our Creative & "Manufacturing" Process

Building The Loom in a hackathon environment was a sprint that required rapid ideation, clear focus, and tight collaboration. Here’s a look at how we brought our vision to life.

### Phase 1: Ideation and Validation

It all started with a shared frustration. We saw the immense potential of AI and other compute-heavy technologies being throttled by the high cost and centralization of computing resources. The question was simple: "Where is all the wasted power?"

The answer was "everywhere." In gaming PCs, in university labs, in company servers after hours.

This led to our core concept: **The Loom, the "Airbnb for GPUs."**

We validated the idea by quickly researching the current cloud computing market, the growth of the AI industry, and the hardware specs of modern consumer GPUs. The numbers confirmed our hypothesis: there was a massive, untapped market for decentralized computing.

### Phase 2: Defining the Minimum Viable Product (MVP)

With a clear vision, we had to be ruthless about our scope to deliver a functional product within the hackathon's timeframe. We defined our MVP around the core user journey:

1.  **A Client can post a job:** Define the task, set a budget, and deposit funds into a secure escrow.
2.  **A Worker can accept a job:** Browse available jobs, lock collateral to show commitment, and run the computation.
3.  **The transaction is completed trustlessly:** Upon successful completion, the smart contract automatically pays the Worker and releases the Client's result.

This focus on the critical path allowed us to prioritize features and allocate resources effectively.

### Phase 3: Divide and Conquer

We split the team into three core streams to work in parallel:

-   **Blockchain/Smart Contracts:** This team focused on writing and testing the Solidity `JobManager` contract. This was the backbone of the entire platform, responsible for the trustless escrow, collateral, and payment logic. They used Hardhat for a robust development and testing environment.

-   **Backend:** This team built the off-chain infrastructure. They created the Node.js API for users to interact with the platform, a database schema to manage jobs and user data, and the matchmaking logic to connect clients with available workers.

-   **Frontend/dApp:** This team was responsible for the user experience. They built the Next.js application, allowing users to connect their wallets, post jobs through a simple form, and view the status of their tasks. Their goal was to abstract away the complexity of the blockchain and create a seamless, intuitive interface.

### Phase 4: Integration and Testing

This was the most critical phase. We brought the three streams together. The frontend connected to the backend API and the smart contracts via Ethers.js. We ran end-to-end tests, simulating the entire job lifecycle from a client posting a job to a worker getting paid.

We deployed our smart contracts to the Base Goerli testnet, allowing us to test in a live, yet controlled, environment. After fixing bugs and polishing the UI, we deployed the final dApp to Vercel.

This iterative and parallelized workflow allowed us to build a complex, full-stack dApp in a highly compressed timeframe, resulting in the prototype you see today.
