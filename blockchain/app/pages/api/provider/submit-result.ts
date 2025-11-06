import type { NextApiRequest, NextApiResponse } from "next";
import { contractAsProvider } from "@/lib/ethers-service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();
  
  try {
    const { jobId, resultUrl } = req.body; // ex: { "jobId": 0, "resultUrl": "ipfs://resultado" }

    const tx = await contractAsProvider.submitResult(jobId, resultUrl);
    const receipt = await tx.wait();

    res.status(200).json({ 
      message: `Resultado do Job ${jobId} submetido!`,
      transactionHash: receipt.hash 
    });

  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Erro ao submeter resultado", error: error.message });
  }
}