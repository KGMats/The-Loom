// Configurações do banco de dados
export const DATABASE_CONFIG = {
  path: './database.db',
  timeout: 30000, // 30 seconds
};

export const QUERY_CONFIG = {
  // Limites para paginação
  DEFAULT_LIMIT: 50,
  MAX_LIMIT: 100,
  
  // Cache settings
  CACHE_TTL: 5 * 60 * 1000, // 5 minutes
  CACHE_MAX_ENTRIES: 1000,
  
  // Timeout settings
  QUERY_TIMEOUT: 10000, // 10 seconds
  CONNECTION_TIMEOUT: 5000, // 5 seconds
};

export const FIELD_CONSTRAINTS = {
  PROJECT_NAME_MAX_LENGTH: 255,
  PROJECT_DESCRIPTION_MAX_LENGTH: 2000,
  WALLET_ADDRESS_LENGTH: 42, // Ethereum address
  GPU_TYPE_MAX_LENGTH: 100,
  TRANSACTION_HASH_LENGTH: 66, // 0x + 64 hex chars
  
  // Validation patterns
  WALLET_ADDRESS_PATTERN: /^0x[a-fA-F0-9]{40}$/,
  TRANSACTION_HASH_PATTERN: /^0x[a-fA-F0-9]{64}$/,
};

export const STATUS_VALUES = {
  PROJECT: {
    PENDING: 'pending',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    ASSIGNED: 'assigned',
    IN_COMPUTATION: 'in_computation',
    RESULTS_SUBMITTED: 'results_submitted',
    PAID: 'paid',
  },
  
  PROVIDER: {
    AVAILABLE: 'available',
    BUSY: 'busy',
    OFFLINE: 'offline',
    MAINTENANCE: 'maintenance',
  },
  
  ASSIGNMENT: {
    ASSIGNED: 'assigned',
    ACCEPTED: 'accepted',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    REJECTED: 'rejected',
  },
  
  PAYMENT: {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    FAILED: 'failed',
    REFUNDED: 'refunded',
  },
};

export const GPU_CONSTANTS = {
  // GPU Types supported
  SUPPORTED_GPU_TYPES: [
    'NVIDIA RTX 4090',
    'NVIDIA RTX 4080', 
    'NVIDIA RTX 3080',
    'NVIDIA RTX 3070',
    'NVIDIA RTX 3060',
    'AMD RX 7900 XTX',
    'AMD RX 7800 XT',
    'AMD RX 6800 XT',
  ],
  
  // Memory configurations
  MEMORY_SIZES: [
    '4GB', '6GB', '8GB', '10GB', '12GB', '16GB', '20GB', '24GB', '32GB', '48GB', '80GB'
  ],
  
  // Compute capabilities (NVIDIA CUDA compute capability)
  COMPUTE_CAPABILITIES: [
    '5.0', '5.2', '5.3', '6.0', '6.1', '6.2', '7.0', '7.5', '8.0', '8.6', '8.9'
  ],
  
  // Render engines
  RENDER_ENGINES: [
    'Blender Cycles',
    'Blender Eevee',
    'Unreal Engine',
    'Unity',
    'Maya Arnold',
    'Cinema 4D Octane',
    'V-Ray',
    'KeyShot',
  ],
  
  // Precision requirements
  PRECISION_TYPES: ['FP16', 'FP32', 'FP64'],
  
  // Special features
  SPECIAL_FEATURES: [
    'RT Cores',
    'Tensor Cores', 
    'Multi-Instance GPU',
    'NVLink',
    'Infinity Cache',
    'Ray Tracing',
    'DLSS Support',
  ],
};

export const CURRENCY_CONFIG = {
  DEFAULT_CURRENCY: 'ETH',
  SUPPORTED_CURRENCIES: ['ETH', 'USDC', 'DAI', 'WBTC'],
  
  // Gas settings
  DEFAULT_GAS_PRICE: 20, // gwei
  MAX_GAS_PRICE: 100, // gwei
  GAS_MULTIPLIER: 1.2,
};

export const REPUTATION_CONFIG = {
  MIN_SCORE: 0.0,
  MAX_SCORE: 5.0,
  DECIMAL_PLACES: 2,
  
  // Reputation thresholds
  TRUSTED_PROVIDER: 4.0,
  PREMIUM_PROVIDER: 4.5,
  ELITE_PROVIDER: 4.8,
};

export const BUSINESS_RULES = {
  // Project constraints
  MIN_PROJECT_VALUE: 1, // USD
  MAX_PROJECT_VALUE: 100000, // USD
  MIN_ESTIMATED_DURATION: 15, // minutes
  MAX_ESTIMATED_DURATION: 10080, // 1 week in minutes
  
  // Provider constraints  
  MIN_GPU_COUNT: 1,
  MAX_GPU_COUNT: 16,
  MIN_HOURLY_RATE: 0.001, // ETH
  MAX_HOURLY_RATE: 1.0, // ETH
  
  // Payment constraints
  MIN_PAYMENT_AMOUNT: 0.001, // ETH
  MAX_PAYMENT_AMOUNT: 100, // ETH
  PAYMENT_TIMEOUT_HOURS: 24,
  
  // Assignment constraints
  MAX_CONCURRENT_ASSIGNMENTS_PER_PROVIDER: 5,
  ASSIGNMENT_TIMEOUT_HOURS: 72,
};

export default {
  DATABASE_CONFIG,
  QUERY_CONFIG,
  FIELD_CONSTRAINTS,
  STATUS_VALUES,
  GPU_CONSTANTS,
  CURRENCY_CONFIG,
  REPUTATION_CONFIG,
  BUSINESS_RULES,
};