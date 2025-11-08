import type { NextApiRequest, NextApiResponse } from "next";
import { contractAsRequester, readonlyContract } from "@/lib/ethers-service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { dataUrl, usdAmount } = req.body; // ex: { "dataUrl": "ipfs://...", "usdAmount": 10 }
    
    // Converte o valor em USD (ex: 10) para o formato do contrato (ex: 10 * 1e8)
    const rewardUsd = BigInt(usdAmount * 10 ** 8);

    // Pergunta ao contrato quanto ETH é necessário
    const requiredEth = await readonlyContract.convertUsdToEth(rewardUsd);

    console.log(`Postando job: ${dataUrl} por $${usdAmount} (${requiredEth} ETH)`);

    // Executa a transação como o REQUISITANTE
    const tx = await contractAsRequester.postJob(dataUrl, rewardUsd, {
      value: requiredEth,
    });
    
    // Espera a transação ser minerada
    const receipt = await tx.wait();
    console.log("Transação minerada:", receipt.hash);
    
    // Encontra o ID do job no evento
    const jobPostedEvent = receipt.logs.find(
      (log: any) => log.fragment.name === "JobPosted"
    );
    const jobId = jobPostedEvent.args[0].toString();

    res.status(200).json({ 
      message: "Job postado com sucesso!",
      jobId: jobId,
      transactionHash: receipt.hash 
    });

  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Erro ao postar job", error: error.message });
  }
}