// Configurações gerais da aplicação
export const APP_CONFIG = {
  name: 'The Loom',
  description: 'Marketplace Descentralizado de GPU Computing',
  version: '1.0.0',
  author: 'The Loom Team',
  url: 'https://the-loom.app',
  support: 'support@the-loom.app',
};

export const UI_CONFIG = {
  theme: {
    primary: '#3B82F6',      // Blue-500
    secondary: '#8B5CF6',    // Violet-500
    success: '#10B981',      // Emerald-500
    warning: '#F59E0B',      // Amber-500
    error: '#EF4444',        // Red-500
    info: '#06B6D4',         // Cyan-500
  },
  layout: {
    maxWidth: '1200px',
    sidebarWidth: '280px',
    headerHeight: '64px',
  },
  animation: {
    duration: {
      fast: 150,
      normal: 300,
      slow: 500,
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
};

export const VALIDATION_CONFIG = {
  project: {
    name: {
      required: true,
      minLength: 3,
      maxLength: 255,
    },
    description: {
      required: false,
      maxLength: 2000,
    },
    valor: {
      required: true,
      min: 1,
      max: 100000,
    },
    gpu_requirements: {
      allowedFields: [
        'gpu_memory', 'compute_capability', 'gpu_count', 
        'gpu_type', 'cuda_cores', 'memory_bandwidth', 
        'render_engine', 'precision_required', 'special_features'
      ],
    },
  },
  provider: {
    wallet_address: {
      required: true,
      pattern: /^0x[a-fA-F0-9]{40}$/,
    },
    gpu_type: {
      required: true,
      maxLength: 100,
    },
    hourly_rate: {
      required: false,
      min: 0.001,
      max: 1.0,
    },
  },
};

export const CACHE_CONFIG = {
  projects: {
    staleTime: 5 * 60 * 1000,     // 5 minutos
    cacheTime: 10 * 60 * 1000,    // 10 minutos
  },
  providers: {
    staleTime: 2 * 60 * 1000,     // 2 minutos
    cacheTime: 5 * 60 * 1000,     // 5 minutos
  },
  stats: {
    staleTime: 15 * 60 * 1000,    // 15 minutos
    cacheTime: 30 * 60 * 1000,    // 30 minutos
  },
};

export const PAGINATION_CONFIG = {
  defaultLimit: 20,
  maxLimit: 100,
  limits: [10, 20, 50, 100],
};

export const ERROR_MESSAGES = {
  database: {
    connection: 'Erro de conexão com o banco de dados',
    query: 'Erro ao executar consulta',
    migration: 'Erro durante migração do banco',
  },
  validation: {
    required: 'Este campo é obrigatório',
    invalid: 'Valor inválido',
    tooLong: 'Valor muito longo',
    tooShort: 'Valor muito curto',
  },
  network: {
    timeout: 'Timeout de rede',
    offline: 'Sem conexão com a internet',
    server: 'Erro interno do servidor',
  },
};

export const SUCCESS_MESSAGES = {
  project: {
    created: 'Projeto criado com sucesso!',
    updated: 'Projeto atualizado com sucesso!',
    deleted: 'Projeto deletado com sucesso!',
  },
  provider: {
    registered: 'Provedor registrado com sucesso!',
    updated: 'Provedor atualizado com sucesso!',
  },
  assignment: {
    created: 'Tarefa atribuída com sucesso!',
    updated: 'Atribuição atualizada com sucesso!',
  },
};

export const ROUTES = {
  home: '/',
  dashboard: '/dashboard',
  projects: '/projects',
  providers: '/providers',
  assignments: '/assignments',
  payments: '/payments',
  analytics: '/analytics',
  settings: '/settings',
};

export const API_ENDPOINTS = {
  projects: '/api/projects',
  providers: '/api/providers',
  assignments: '/api/assignments',
  payments: '/api/payments',
  analytics: '/api/analytics',
  blockchain: '/api/blockchain',
};

export const DEVELOPMENT_CONFIG = {
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
  
  // Debug settings
  debug: {
    database: false,
    api: false,
    blockchain: false,
    cache: false,
  },
  
  // Mock data
  useMockData: process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true',
  mockDelay: parseInt(process.env.NEXT_PUBLIC_MOCK_DELAY || '500'),
};

export default {
  APP_CONFIG,
  UI_CONFIG,
  VALIDATION_CONFIG,
  CACHE_CONFIG,
  PAGINATION_CONFIG,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  ROUTES,
  API_ENDPOINTS,
  DEVELOPMENT_CONFIG,
};