import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState, useEffect } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { parseEther } from 'viem';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

interface Job {
  id: number;
  status: string;
  requester: string;
  provider: string | null;
  dataUrl: string;
  scriptUrl: string;
  resultUrl: string | null;
}

export default function Home() {
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();

  // --- Correção para o Erro de Hidratação ---
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  // --- Fim da Correção ---

  const [openJobs, setOpenJobs] = useState<Job[]>([]);
  const [myJobs, setMyJobs] = useState<Job[]>([]);
  
  // Estados do formulário
  const [scriptUrl, setScriptUrl] = useState('');
  const [dataUrl, setDataUrl] = useState('');
  const [usdAmount, setUsdAmount] = useState('');

  // --- Funções de Leitura ---
  const fetchJobs = async () => {
    try {
      const openJobsRes = await fetch(`${API_URL}/api/jobs/open`);
      if(openJobsRes.ok) setOpenJobs(await openJobsRes.json());

      if (address) {
        const myJobsRes = await fetch(`${API_URL}/api/jobs/my?userAddress=${address}`);
        if(myJobsRes.ok) setMyJobs(await myJobsRes.json());
      }
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
      alert("Failed to fetch jobs. Is the backend API running?");
    }
  };

  useEffect(() => {
    fetchJobs();
    const interval = setInterval(fetchJobs, 5000); // Atualiza a cada 5 segundos
    return () => clearInterval(interval);
  }, [address]);

  // --- Funções de Escrita (Ações) ---

  const handlePostJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletClient) return alert('Please connect your wallet');

    try {
      // 1. Preparar a transação
      const res = await fetch(`${API_URL}/api/jobs/prepare-post`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scriptUrl, dataUrl, usdAmount }),
      });
      const txDetails = await res.json();

      if (!res.ok) throw new Error(txDetails.message);

      // 2. Enviar a transação
      const txHash = await walletClient.sendTransaction({
        to: txDetails.to,
        data: txDetails.data,
        value: BigInt(txDetails.value),
      });

      alert(`Transaction sent! Hash: ${txHash}`);
      // Limpa o formulário
      setScriptUrl('');
      setDataUrl('');
      setUsdAmount('');

    } catch (error) {
      console.error("Error posting job:", error);
      alert(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const handleJobAction = async (jobId: number, action: 'accept' | 'submit' | 'approve') => {
    if (!walletClient) return alert('Please connect your wallet');

    let resultUrl = null;
    if (action === 'submit') {
      resultUrl = prompt("Please enter the result URL (IPFS):");
      if (!resultUrl) return;
    }

    try {
      // 1. Preparar a transação
      const res = await fetch(`${API_URL}/api/jobs/${jobId}/prepare-action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, resultUrl }),
      });
      const txDetails = await res.json();
      if (!res.ok) throw new Error(txDetails.message);

      // 2. Enviar a transação
      const txHash = await walletClient.sendTransaction({
        to: txDetails.to,
        data: txDetails.data,
      });

      alert(`Action '${action}' sent! Hash: ${txHash}`);
    } catch (error) {
      console.error(`Error performing action ${action}:`, error);
      alert(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>DePIN Frontend Tester</h1>
        <ConnectButton />
      </header>

      {/* Renderiza o conteúdo dinâmico apenas no lado do cliente */}
      {isClient ? (
        !isConnected ? (
          <p>Please connect your wallet to continue.</p>
        ) : (
          <main style={{ marginTop: '2rem' }}>
            <section>
              <h2>Post a New Job</h2>
              <form onSubmit={handlePostJob} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '400px' }}>
                <input value={scriptUrl} onChange={e => setScriptUrl(e.target.value)} placeholder="Script URL (IPFS)" required />
                <input value={dataUrl} onChange={e => setDataUrl(e.target.value)} placeholder="Data URL (IPFS)" required />
                <input value={usdAmount} onChange={e => setUsdAmount(e.target.value)} placeholder="Reward in USD (e.g., 5.50)" type="number" step="0.01" required />
                <button type="submit">Post Job</button>
              </form>
            </section>

            <hr style={{ margin: '2rem 0' }} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <section>
                <h2>My Jobs</h2>
                {myJobs.length === 0 ? <p>No jobs found for your address.</p> : myJobs.map(job => (
                  <div key={job.id} style={{ border: '1px solid blue', padding: '1rem', marginBottom: '1rem' }}>
                    <h4>Job #{job.id} - {job.status}</h4>
                    <p>Requester: {job.requester}</p>
                    <p>Provider: {job.provider || 'N/A'}</p>
                    {job.status === 'InProgress' && job.provider?.toLowerCase() === address?.toLowerCase() && (
                       <button onClick={() => handleJobAction(job.id, 'submit')}>Submit Result</button>
                    )}
                    {job.status === 'PendingApproval' && job.requester.toLowerCase() === address?.toLowerCase() && (
                       <button onClick={() => handleJobAction(job.id, 'approve')}>Approve & Pay</button>
                    )}
                  </div>
                ))}
              </section>

              <section>
                <h2>Open Marketplace Jobs</h2>
                {openJobs.length === 0 ? <p>No open jobs.</p> : openJobs.map(job => (
                  <div key={job.id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
                    <h4>Job #{job.id} - {job.status}</h4>
                    <p>Requester: {job.requester}</p>
                    <button onClick={() => handleJobAction(job.id, 'accept')}>Accept Job</button>
                  </div>
                ))}
              </section>
            </div>
          </main>
        )
      ) : null}
    </div>
  );
}
