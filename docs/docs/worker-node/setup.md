# Worker Node Setup

Welcome, future provider! By connecting your hardware to The Loom, you can monetize your idle computing power and become a vital part of the decentralized computing revolution.

This guide will walk you through setting up the The Loom Worker Client.

---

## 1. Prerequisites

Before you begin, please ensure you have the following installed and configured:

-   **Node.js:** The worker client runs on Node.js. We recommend the latest LTS version.
-   **Docker:** To ensure security and manage dependencies, all jobs are executed in a sandboxed Docker container. You must have Docker installed and the Docker daemon running.
-   **Git:** For cloning the worker client repository.
-   **Web3 Wallet:** You need an EVM-compatible wallet (like MetaMask) with a small amount of ETH on the **Base Goerli** testnet. This will be used to pay gas fees for interacting with the smart contract (e.g., to stake collateral and receive payments).

---

## 2. Installation

First, clone the worker client repository from GitHub and install the required dependencies.

```bash
# Clone the repository
git clone https://github.com/the-loom/worker-client.git

# Navigate into the directory
cd worker-client

# Install dependencies
npm install
```

---

## 3. Configuration

The worker client is configured via a `.env` file. Create a file named `.env` in the root of the `worker-client` directory.

```bash
# Create the configuration file
touch .env
```

Now, open the `.env` file and add the following variables:

```env
# Your wallet's private key.
# IMPORTANT: Use a dedicated "hot wallet" for this, not your main wallet.
# This key is used by the client to automatically sign transactions.
WORKER_PRIVATE_KEY=0x...

# The Loom API endpoint
API_BASE_URL=https://api.the-loom.io/v1

# (Optional) A friendly name for your worker node
WORKER_NAME="My Gaming PC"
```

### A Note on Security

-   **Private Key:** The `WORKER_PRIVATE_KEY` is stored locally on your machine and is never sent to The Loom's backend. It is required for your client to autonomously accept jobs and interact with the smart contract.
-   **Best Practice:** We strongly recommend creating a new, dedicated wallet for your worker node. Fund it with only the necessary amount of ETH for gas and collateral. Do not use a wallet that holds significant personal funds.

---

## 4. Running the Worker Client

Once your `.env` file is configured, you can start the worker client.

```bash
npm run start
```

On startup, the client will:
1.  Connect to your wallet.
2.  Read your machine's hardware specifications (CPU cores, RAM, GPU model).
3.  Register itself with The Loom's matchmaking service.
4.  Begin listening for new job offers.

You should see log output indicating that the worker is "Registered and listening for jobs."

**Congratulations! Your node is now live on The Loom network.** You will automatically be considered for incoming computational jobs that match your hardware profile.
