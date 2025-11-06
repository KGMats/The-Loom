// Types TypeScript para o banco de dados
export interface Project {
  id: number;
  name: string;
  valor: number;
  type: 'grafica' | 'IA';
  description?: string;
  wallet_address?: string;
  gpu_requirements?: GPURequirements;
  estimated_duration?: number;
  reward_amount?: number;
  status: ProjectStatus;
  created_at: string;
  updated_at: string;
  started_at?: string;
  completed_at?: string;
}