// Importa os tipos e plugins necessários
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
import * as dotenv from "dotenv";

// Carrega as variáveis do .env
dotenv.config();

// Define as variáveis de ambiente com checagem de tipo (opcional, mas bom)
const BASE_SEPOLIA_RPC_URL: string = process.env.BASE_SEPOLIA_RPC_URL || "https://sepolia.base.org";
const PRIVATE_KEY: string = process.env.BASE_SEPOLIA_PRIVATE_KEY || "";
const BASESCAN_API_KEY: string = process.env.BASESCAN_API_KEY || "";

// Define a configuração do Hardhat
const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    baseSepolia: {
      url: BASE_SEPOLIA_RPC_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 84532,
    },
  },
  etherscan: {
    apiKey: BASESCAN_API_KEY,
    customChains: [
      {
        network: "baseSepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://api-sepolia.basescan.org/api",
          browserURL: "https://sepolia.basescan.org/",
        },
      },
    ],
  },
  sourcify: {
    enabled: true,
  },
};

// Exporta a configuração
export default config;