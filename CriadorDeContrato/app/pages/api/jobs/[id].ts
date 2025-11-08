import type { NextApiRequest, NextApiResponse } from "next";
import { readonlyContract, formatJob } from "@/lib/ethers-service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end();
  
  try {
    const { id } = req.query; // Pega o [id] do URL
    
    const jobData = await readonlyContract.s_jobs(id);
    const jobFormatted = formatJob(jobData);

    res.status(200).json(jobFormatted);

  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar job", error: error.message });
  }
}