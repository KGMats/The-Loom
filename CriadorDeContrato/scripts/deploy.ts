const hre = require("hardhat");

async function main() {
  // 1. Defina o endereço do Price Feed (ETH/USD na Base Sepolia)
  // Chainlink ETH/USD Price Feed na Base Sepolia
  const priceFeedAddress: string = "0x4aDC67696bA383F43DD60A9e78F2C97Fbbfc7cb1";

  const constructorArgs = [
    priceFeedAddress,
  ];

  console.log("Fazendo deploy do contrato JobManager...");
  console.log(`Usando Price Feed: ${priceFeedAddress}`);
  console.log(`Network: ${hre.network.name}`);

  // 2. Obter o signer (conta que fará o deploy)
  const signers = await hre.ethers.getSigners();
  
  if (signers.length === 0) {
    throw new Error("Nenhum signer disponível. Verifique se BASE_SEPOLIA_PRIVATE_KEY está configurado no .env");
  }
  
  const deployer = signers[0];
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log(`Deploying com a conta: ${deployer.address}`);
  console.log(`Saldo da conta: ${hre.ethers.formatEther(balance)} ETH`);

  // 3. Fazer o deploy do contrato
  const JobManager = await hre.ethers.getContractFactory("JobManager");
  const jobManager = await JobManager.deploy(priceFeedAddress);
  await jobManager.waitForDeployment();
  
  const contractAddress = await jobManager.getAddress();
  console.log(`JobManager deployado em: ${contractAddress}`);

  // 4. Verificação no Basescan
  if (hre.network.config.chainId === 84532 && process.env.BASESCAN_API_KEY) {
    console.log("Aguardando 1 minuto (60s) para o Basescan indexar...");
    
    // Await de 60 segundos
    await new Promise(resolve => setTimeout(resolve, 60000));

    console.log("Iniciando verificação...");
    try {
      await hre.run("verify:verify", {
        address: contractAddress,
        constructorArguments: constructorArgs,
      });
      console.log("Contrato verificado no Basescan!");
    } catch (error: any) {
      if (error.message.toLowerCase().includes("already verified")) {
        console.log("Contrato já verificado.");
      } else {
        console.error("Falha na verificação:", error);
      }
    }
  }
}

// Padrão de execução do script
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});