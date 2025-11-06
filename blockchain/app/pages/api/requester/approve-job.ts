import type { NextApiRequest, NextApiResponse } from "next";
import { contractAsRequester } from "@/lib/ethers-service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();
  
  try {
    const { jobId } = req.body; // ex: { "jobId": 0 }

    const tx = await contractAsRequester.approveAndPay(jobId);
    const receipt = await tx.wait();

    res.status(200).json({ 
      message: `Job ${jobId} aprovado e pago!`,
      transactionHash: receipt.hash 
    });

  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Erro ao aprovar job", error: error.message });
  }
}