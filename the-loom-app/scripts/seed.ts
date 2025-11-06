// Script para popular dados de teste
import { runQuery } from '../lib/database/database';

interface SeedData {
  projects: Array<{
    name: string;
    valor: number;
    type: 'grafica' | 'IA';
    description: string;
    gpu_requirements: any;
    wallet_address?: string;
    estimated_duration?: number;
    reward_amount?: number;
    status: string;
  }>;
  providers: Array<{
    wallet_address: string;
    gpu_type: string;
    gpu_count: number;
    hourly_rate: number;
    availability_status: string;
    reputation_score: number;
    total_jobs_completed: number;
  }>;
}

const seedData: SeedData = {
  projects: [
    {
      name: 'Treinamento de Modelo CNN para Diagnóstico Médico',
      valor: 2500,
      type: 'IA',
      description: 'Treinamento de rede neural convolucional para classificação de imagens médicas (raio-X, CT scan)',
      gpu_requirements: {
        gpu_memory: '16GB',
        compute_capability: '7.5',
        gpu_count: 2,
        cuda_cores: 10752,
        precision_required: 'FP32',
        special_features: ['Tensor Cores', 'RT Cores']
      },
      wallet_address: '0x1234567890123456789012345678901234567890',
      estimated_duration: 240, // 4 horas
      reward_amount: 0.5,
      status: 'pending'
    },
    {
      name: 'Renderização 3D - Arquitetura Residencial',
      valor: 800,
      type: 'grafica', 
      description: 'Renderização fotorrealística de projeto arquitetônico moderno com iluminação avançada',
      gpu_requirements: {
        gpu_memory: '8GB',
        compute_capability: '6.0',
        gpu_count: 1,
        render_engine: 'Blender Cycles',
        precision_required: 'FP32'
      },
      wallet_address: '0xabcdef123456789012345678901234567890abcd',
      estimated_duration: 120, // 2 horas
      reward_amount: 0.15,
      status: 'pending'
    },
    {
      name: 'Fine-tuning GPT para Análise de Sentimentos',
      valor: 1800,
      type: 'IA',
      description: 'Ajuste fino de modelo de linguagem para análise de sentimentos em reviews de produtos',
      gpu_requirements: {
        gpu_memory: '24GB',
        compute_capability: '8.0',
        gpu_count: 1,
        precision_required: 'FP16',
        special_features: ['Tensor Cores']
      },
      wallet_address: '0xfedcba0987654321098765432109876543210fed',
      estimated_duration: 360, // 6 horas
      reward_amount: 0.4,
      status: 'in_progress'
    },
    {
      name: 'Renderização de Animação para Publicidade',
      valor: 1200,
      type: 'grafica',
      description: 'Renderização de animação 3D para campanha publicitária com 30 segundos de duração',
      gpu_requirements: {
        gpu_memory: '12GB',
        compute_capability: '7.5',
        gpu_count: 2,
        render_engine: 'Unreal Engine',
        precision_required: 'FP32'
      },
      wallet_address: '0x9876543210123456789012345678901234567890',
      estimated_duration: 180, // 3 horas
      reward_amount: 0.25,
      status: 'pending'
    },
    {
      name: 'Processamento de Imagens Satelitais',
      valor: 3200,
      type: 'IA',
      description: 'Análise e processamento de imagens de satélite para detecção de mudanças urbanas',
      gpu_requirements: {
        gpu_memory: '32GB',
        compute_capability: '8.6',
        gpu_count: 4,
        cuda_cores: 16384,
        precision_required: 'FP32',
        special_features: ['Tensor Cores', 'Multi-Instance GPU']
      },
      wallet_address: '0x5678901234567890abcdef1234567890abcdef12',
      estimated_duration: 480, // 8 horas
      reward_amount: 0.8,
      status: 'pending'
    }
  ],
  providers: [
    {
      wallet_address: '0x1111222233334444555566667777888899990000',
      gpu_type: 'NVIDIA RTX 4090',
      gpu_count: 2,
      hourly_rate: 0.08,
      availability_status: 'available',
      reputation_score: 4.8,
      total_jobs_completed: 47
    },
    {
      wallet_address: '0x2222333344445555666677778888999900001111',
      gpu_type: 'NVIDIA RTX 3080',
      gpu_count: 3,
      hourly_rate: 0.05,
      availability_status: 'available',
      reputation_score: 4.5,
      total_jobs_completed: 23
    },
    {
      wallet_address: '0x3333444455556666777788889999000011112222',
      gpu_type: 'NVIDIA RTX 4090',
      gpu_count: 1,
      hourly_rate: 0.09,
      availability_status: 'busy',
      reputation_score: 4.9,
      total_jobs_completed: 89
    },
    {
      wallet_address: '0x4444555566667777888899990000111122223333',
      gpu_type: 'AMD RX 7900 XTX',
      gpu_count: 2,
      hourly_rate: 0.06,
      availability_status: 'available',
      reputation_score: 4.2,
      total_jobs_completed: 15
    },
    {
      wallet_address: '0x5555666677778888999900001111222233334444',
      gpu_type: 'NVIDIA RTX 4090',
      gpu_count: 4,
      hourly_rate: 0.12,
      availability_status: 'maintenance',
      reputation_score: 5.0,
      total_jobs_completed: 156
    }
  ]
};

const clearExistingData = async (): Promise<void> => {
  console.log('🧹 Clearing existing data...');
  
  await runQuery('DELETE FROM task_assignments');
  await runQuery('DELETE FROM payments');
  await runQuery('DELETE FROM projects');
  await runQuery('DELETE FROM gpu_providers');
  await runQuery('DELETE FROM marketplace_metrics');
  
  console.log('✅ Existing data cleared');
};

const seedProjects = async (): Promise<void> => {
  console.log('📊 Seeding projects...');
  
  for (const project of seedData.projects) {
    const gpuReqJson = JSON.stringify(project.gpu_requirements);
    
    await runQuery(`
      INSERT INTO projects (
        name, valor, type, description, gpu_requirements, 
        wallet_address, estimated_duration, reward_amount, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      project.name,
      project.valor,
      project.type,
      project.description,
      gpuReqJson,
      project.wallet_address,
      project.estimated_duration,
      project.reward_amount,
      project.status
    ]);
  }
  
  console.log(`✅ ${seedData.projects.length} projects seeded`);
};

const seedProviders = async (): Promise<void> => {
  console.log('🖥️ Seeding GPU providers...');
  
  for (const provider of seedData.providers) {
    await runQuery(`
      INSERT INTO gpu_providers (
        wallet_address, gpu_type, gpu_count, hourly_rate,
        availability_status, reputation_score, total_jobs_completed
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [
      provider.wallet_address,
      provider.gpu_type,
      provider.gpu_count,
      provider.hourly_rate,
      provider.availability_status,
      provider.reputation_score,
      provider.total_jobs_completed
    ]);
  }
  
  console.log(`✅ ${seedData.providers.length} GPU providers seeded`);
};

const seedMetrics = async (): Promise<void> => {
  console.log('📈 Seeding marketplace metrics...');
  
  const now = new Date();
  const metrics = [
    {
      metric_type: 'daily_jobs_completed',
      metric_value: 12,
      recorded_at: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString()
    },
    {
      metric_type: 'total_earnings_eth',
      metric_value: 15.47,
      recorded_at: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString()
    },
    {
      metric_type: 'avg_completion_time_minutes',
      metric_value: 187,
      recorded_at: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString()
    }
  ];
  
  for (const metric of metrics) {
    await runQuery(`
      INSERT INTO marketplace_metrics (metric_type, metric_value, recorded_at)
      VALUES (?, ?, ?)
    `, [metric.metric_type, metric.metric_value, metric.recorded_at]);
  }
  
  console.log('✅ Marketplace metrics seeded');
};

const runSeeding = async (): Promise<void> => {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Clear existing data first
    await clearExistingData();
    
    // Seed new data
    await seedProjects();
    await seedProviders();
    await seedMetrics();
    
    console.log('🎉 Database seeded successfully!');
    console.log('\n📊 Seeded data summary:');
    console.log(`- ${seedData.projects.length} projects`);
    console.log(`- ${seedData.providers.length} GPU providers`);
    console.log('- Marketplace metrics');
    
  } catch (error) {
    console.error('💥 Seeding failed:', error);
    throw error;
  }
};

// CLI interface
if (require.main === module) {
  const clearOnly = process.argv.includes('--clear');
  const force = process.argv.includes('--force');
  
  if (clearOnly) {
    clearExistingData()
      .then(() => {
        console.log('✅ Database cleared successfully');
        process.exit(0);
      })
      .catch((error) => {
        console.error(error);
        process.exit(1);
      });
  } else {
    runSeeding()
      .then(() => process.exit(0))
      .catch((error) => {
        console.error(error);
        process.exit(1);
      });
  }
}

export { runSeeding, clearExistingData };