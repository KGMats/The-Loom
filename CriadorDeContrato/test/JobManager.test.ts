const { ethers } = require("hardhat");
import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { JobManager, MockV3Aggregator } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import "@nomicfoundation/hardhat-chai-matchers";

// Define um preço constante para o ETH em USD para os testes
// $3000 com 8 decimais
const ETH_PRICE_USD = 3000 * 10 ** 8; // 300000000000

describe("JobManager", function () {
  // Define o "fixture" - uma função que configura o estado inicial para cada teste
  async function deployJobManagerFixture() {
    // 1. Obter contas de teste
    const [owner, requester, provider1, provider2] = await ethers.getSigners();

    // 2. Deployar o Mock
    const MockAggregatorFactory = await ethers.getContractFactory("MockV3Aggregator");
    const mockAggregator: MockV3Aggregator = await MockAggregatorFactory.deploy(ETH_PRICE_USD);
    await mockAggregator.waitForDeployment();
    const mockAddress = await mockAggregator.getAddress();

    // 3. Deployar o JobManager, passando o endereço do Mock
    const JobManagerFactory = await ethers.getContractFactory("JobManager");
    const jobManager: JobManager = await JobManagerFactory.deploy(mockAddress);
    await jobManager.waitForDeployment();

    // 4. Definir valores úteis
    // $10 em USD (com 8 decimais)
    const tenDollarsUsd = 10 * 10 ** 8; // 1000000000
    // $10 em ETH, baseado no nosso preço mockado de $3000
    // (10 * 1e8 * 1e18) / (3000 * 1e8) = (10 * 1e18) / 3000
    const tenDollarsEth = ethers.parseEther("10") / BigInt(3000); // Aprox: 0.00333 ETH

    return { jobManager, mockAggregator, owner, requester, provider1, provider2, tenDollarsUsd, tenDollarsEth };
  }

  // Bloco de testes principal
  describe("Deployment", function () {
    it("Should set the correct price feed address", async function () {
      const { jobManager, mockAggregator } = await loadFixture(deployJobManagerFixture);
      const feedAddress = await jobManager.i_priceFeed();
      expect(feedAddress).to.equal(await mockAggregator.getAddress());
    });
  });

  describe("Job Posting", function () {
    it("Should allow a requester to post a job with correct ETH value", async function () {
      const { jobManager, requester, tenDollarsUsd, tenDollarsEth } = await loadFixture(deployJobManagerFixture);
      const dataUrl = "ipfs://QmWTE";

      // Requester posta o job, enviando o valor exato em ETH
      await jobManager.connect(requester).postJob(dataUrl, tenDollarsUsd, {
        value: tenDollarsEth,
      });

      // Verifica se o job foi criado
      const job = await jobManager.s_jobs(0);
      expect(job.requester).to.equal(requester.address);
      expect(job.rewardUsd).to.equal(tenDollarsUsd);
      expect(job.rewardEth).to.equal(tenDollarsEth);
      expect(job.status).to.equal(0); // 0 = Open
    });

    it("Should refund excess ETH if sent more than required", async function () {
      const { jobManager, requester, tenDollarsUsd, tenDollarsEth } = await loadFixture(deployJobManagerFixture);
      const dataUrl = "ipfs://QmWTE";
      const sentAmount = tenDollarsEth + ethers.parseEther("1"); // Envia 1 ETH a mais

      // O `changeEtherBalance` verifica se o saldo do requester
      // mudou pela quantia correta (perdeu `tenDollarsEth`, não `sentAmount`)
      await expect(
        jobManager.connect(requester).postJob(dataUrl, tenDollarsUsd, {
          value: sentAmount,
        })
      ).to.changeEtherBalance(requester, -tenDollarsEth); // Saldo final = inicial - tenDollarsEth
    });

    it("Should REVERT if insufficient ETH is sent", async function () {
      const { jobManager, requester, tenDollarsUsd, tenDollarsEth } = await loadFixture(deployJobManagerFixture);
      const insufficientAmount = tenDollarsEth - BigInt(1000); // 1000 wei a menos

      await expect(
        jobManager.connect(requester).postJob("ipfs://...", tenDollarsUsd, {
          value: insufficientAmount,
        })
      ).to.be.revertedWith("Insufficient ETH sent for this USD value");
    });
  });

  describe("Job Lifecycle", function () {
    let fixture: any;
    beforeEach(async () => {
      // Configura o cenário: um job já foi postado
      fixture = await loadFixture(deployJobManagerFixture);
      const { jobManager, requester, tenDollarsUsd, tenDollarsEth } = fixture;
      await jobManager.connect(requester).postJob("ipfs://...", tenDollarsUsd, {
        value: tenDollarsEth,
      });
    });

    it("Should allow a provider to accept an open job (FCFS)", async function () {
      const { jobManager, provider1, provider2 } = fixture;

      // Provider 1 aceita o job 0
      await jobManager.connect(provider1).acceptJob(0);
      const job = await jobManager.s_jobs(0);

      // Verifica se o provider foi definido e o status mudou
      expect(job.provider).to.equal(provider1.address);
      expect(job.status).to.equal(1); // 1 = InProgress

      // Provider 2 tenta aceitar o mesmo job (deve falhar)
      await expect(
        jobManager.connect(provider2).acceptJob(0)
      ).to.be.revertedWith("Job is not open");
    });

    it("Should allow the correct provider to submit results", async function () {
      const { jobManager, provider1, provider2 } = fixture;
      await jobManager.connect(provider1).acceptJob(0); // Provider 1 aceita

      const resultUrl = "ipfs://resultado";

      // Provider 2 (errado) tenta submeter (deve falhar)
      await expect(
        jobManager.connect(provider2).submitResult(0, resultUrl)
      ).to.be.revertedWith("Only assigned provider can submit");

      // Provider 1 (correto) submete
      await jobManager.connect(provider1).submitResult(0, resultUrl);
      const job = await jobManager.s_jobs(0);
      
      expect(job.resultUrl).to.equal(resultUrl);
      expect(job.status).to.equal(2); // 2 = PendingApproval
    });

    it("Should allow requester to approve and pay the provider", async function () {
      const { jobManager, requester, provider1, tenDollarsEth } = fixture;
      
      await jobManager.connect(provider1).acceptJob(0);
      await jobManager.connect(provider1).submitResult(0, "ipfs://resultado");

      // Verifica a mudança no saldo do provider
      // O provider deve ganhar exatamente a recompensa em ETH
      await expect(
        jobManager.connect(requester).approveAndPay(0)
      ).to.changeEtherBalance(provider1, tenDollarsEth);

      // Verifica o status final do job
      const job = await jobManager.s_jobs(0);
      expect(job.status).to.equal(3); // 3 = Completed
    });

    it("Should REVERT if a non-requester tries to approve", async function () {
        const { jobManager, provider1, provider2 } = fixture;
        
        await jobManager.connect(provider1).acceptJob(0);
        await jobManager.connect(provider1).submitResult(0, "ipfs://resultado");
  
        // Provider 1 (errado) tenta aprovar (deve falhar)
        await expect(
          jobManager.connect(provider1).approveAndPay(0)
        ).to.be.revertedWith("Only requester can approve");
  
        // Provider 2 (errado) tenta aprovar (deve falhar)
        await expect(
            jobManager.connect(provider2).approveAndPay(0)
          ).to.be.revertedWith("Only requester can approve");
      });
  });
});