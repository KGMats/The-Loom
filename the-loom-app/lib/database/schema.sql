-- ===================================================================
-- THE LOOM - SCHEMA DO BANCO DE DADOS
-- Versão: 1.0 - Hackathon Ready
-- Data: 2025-11-06
-- Descrição: Marketplace descentralizado de GPU Computing
-- ===================================================================

-- Tabela principal: projects (evoluirá para tasks)
CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    valor INTEGER NOT NULL CHECK(valor > 0),
    type TEXT NOT NULL CHECK(type IN ('grafica', 'IA')),
    description TEXT,
    
    -- Campos para evolução marketplace
    wallet_address TEXT,                    -- Endereço blockchain
    gpu_requirements TEXT,                  -- JSON com specs GPU
    estimated_duration INTEGER,             -- Minutos estimados
    reward_amount DECIMAL(10,2),            -- Recompensa em ETH
    
    -- Workflow management
    status TEXT DEFAULT 'pending' CHECK(status IN (
        'pending', 'in_progress', 'completed', 'cancelled', 
        'assigned', 'in_computation', 'results_submitted', 'paid'
    )),
    
    -- Timestamps
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    started_at DATETIME,
    completed_at DATETIME
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_projects_type ON projects(type);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_wallet ON projects(wallet_address);
CREATE INDEX IF NOT EXISTS idx_projects_created ON projects(created_at);

-- Tabela para GPU Providers (futuro marketplace)
CREATE TABLE IF NOT EXISTS gpu_providers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    wallet_address TEXT UNIQUE NOT NULL,
    gpu_type TEXT NOT NULL,                 -- 'NVIDIA RTX 4090', 'RTX 3080', etc
    gpu_count INTEGER DEFAULT 1,
    hourly_rate DECIMAL(8,4),              -- ETH por hora
    availability_status TEXT DEFAULT 'available' CHECK(availability_status IN (
        'available', 'busy', 'offline', 'maintenance'
    )),
    reputation_score DECIMAL(3,2) DEFAULT 0.0,
    total_jobs_completed INTEGER DEFAULT 0,
    total_earnings DECIMAL(10,4) DEFAULT 0.0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_active_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabela para assignments (futuro marketplace)
CREATE TABLE IF NOT EXISTS task_assignments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER NOT NULL,
    provider_id INTEGER NOT NULL,
    status TEXT DEFAULT 'assigned' CHECK(status IN (
        'assigned', 'accepted', 'in_progress', 'completed', 'cancelled', 'rejected'
    )),
    start_time DATETIME,
    completion_time DATETIME,
    payment_amount DECIMAL(10,4),
    transaction_hash TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id),
    FOREIGN KEY (provider_id) REFERENCES gpu_providers(id)
);

-- Tabela para payments (futuro marketplace)
CREATE TABLE IF NOT EXISTS payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER NOT NULL,
    provider_id INTEGER NOT NULL,
    amount DECIMAL(10,4) NOT NULL,
    currency TEXT DEFAULT 'ETH',
    transaction_hash TEXT UNIQUE,
    block_number INTEGER,
    gas_used INTEGER,
    gas_price DECIMAL(20,0),
    gas_fee DECIMAL(10,6),
    status TEXT DEFAULT 'pending' CHECK(status IN (
        'pending', 'confirmed', 'failed', 'refunded'
    )),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    confirmed_at DATETIME,
    FOREIGN KEY (project_id) REFERENCES projects(id),
    FOREIGN KEY (provider_id) REFERENCES gpu_providers(id)
);

-- Tabela para métricas e analytics
CREATE TABLE IF NOT EXISTS marketplace_metrics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    metric_type TEXT NOT NULL,              -- 'daily_jobs', 'total_earnings', 'avg_completion_time'
    metric_value DECIMAL(10,4),
    additional_data TEXT,                   -- JSON com dados extras
    recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Triggers para updated_at automático
CREATE TRIGGER IF NOT EXISTS update_projects_timestamp 
    AFTER UPDATE ON projects
    FOR EACH ROW
    BEGIN
        UPDATE projects SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

CREATE TRIGGER IF NOT EXISTS update_providers_timestamp 
    AFTER UPDATE ON gpu_providers
    FOR EACH ROW
    BEGIN
        UPDATE gpu_providers SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

CREATE TRIGGER IF NOT EXISTS update_assignments_timestamp 
    AFTER UPDATE ON task_assignments
    FOR EACH ROW
    BEGIN
        UPDATE task_assignments SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;