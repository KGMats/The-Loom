import type { NextApiRequest, NextApiResponse } from "next";
import { contractAsProvider } from "@/lib/ethers-service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();
  
  try {
    const { jobId } = req.body; // ex: { "jobId": 0 }

    // Executa a transação como o PROVEDOR
    const tx = await contractAsProvider.acceptJob(jobId);
    const receipt = await tx.wait();

    res.status(200).json({ 
      message: `Job ${jobId} aceito pelo provedor!`,
      transactionHash: receipt.hash 
    });

  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Erro ao aceitar job", error: error.message });
  }
}