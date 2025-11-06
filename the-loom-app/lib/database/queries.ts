// Queries reutilizáveis para o banco de dados
import { getQuery, allQuery, runQuery } from './database';

export interface ProjectFilters {
  type?: 'grafica' | 'IA';
  status?: string;
  limit?: number;
  offset?: number;
  search?: string;
}

// ========== PROJECTS QUERIES ==========

export const getProjects = async (filters: ProjectFilters = {}) => {
  const { type, status, limit = 50, offset = 0, search } = filters;
  
  let sql = 'SELECT * FROM projects';
  const params: any[] = [];
  const conditions: string[] = [];

  if (type) {
    conditions.push('type = ?');
    params.push(type);
  }

  if (status) {
    conditions.push('status = ?');
    params.push(status);
  }

  if (search) {
    conditions.push('(name LIKE ? OR description LIKE ?)');
    params.push(`%${search}%`, `%${search}%`);
  }

  if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }

  sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
  params.push(limit, offset);

  return allQuery(sql, params);
};

export const getProject = async (id: number) => {
  const project = await getQuery('SELECT * FROM projects WHERE id = ?', [id]);
  
  if (project && project.gpu_requirements) {
    try {
      project.gpu_requirements = JSON.parse(project.gpu_requirements);
    } catch (e) {
      console.warn('Erro ao fazer parse de gpu_requirements:', e);
      project.gpu_requirements = null;
    }
  }
  
  return project;
};

export const createProject = async (data: {
  name: string;
  valor: number;
  type: 'grafica' | 'IA';
  description?: string;
  gpu_requirements?: any;
  wallet_address?: string;
  estimated_duration?: number;
  reward_amount?: number;
}) => {
  const { name, valor, type, description, gpu_requirements, wallet_address, estimated_duration, reward_amount } = data;
  
  const gpuReqJson = gpu_requirements ? JSON.stringify(gpu_requirements) : null;
  
  return runQuery(
    `INSERT INTO projects (name, valor, type, description, gpu_requirements, wallet_address, estimated_duration, reward_amount) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [name, valor, type, description || null, gpuReqJson, wallet_address || null, estimated_duration || null, reward_amount || null]
  );
};

export const updateProject = async (id: number, data: any) => {
  const updateFields: string[] = [];
  const params: any[] = [];

  // Campos atualizáveis
  if (data.name !== undefined) {
    updateFields.push('name = ?');
    params.push(data.name);
  }
  
  if (data.valor !== undefined) {
    updateFields.push('valor = ?');
    params.push(data.valor);
  }
  
  if (data.type !== undefined) {
    updateFields.push('type = ?');
    params.push(data.type);
  }
  
  if (data.description !== undefined) {
    updateFields.push('description = ?');
    params.push(data.description || null);
  }
  
  if (data.gpu_requirements !== undefined) {
    const gpuReqJson = data.gpu_requirements ? JSON.stringify(data.gpu_requirements) : null;
    updateFields.push('gpu_requirements = ?');
    params.push(gpuReqJson);
  }
  
  if (data.status !== undefined) {
    updateFields.push('status = ?');
    params.push(data.status);
  }
  
  if (data.wallet_address !== undefined) {
    updateFields.push('wallet_address = ?');
    params.push(data.wallet_address);
  }

  if (updateFields.length === 0) {
    throw new Error('Nenhum campo válido para atualizar');
  }

  updateFields.push('updated_at = CURRENT_TIMESTAMP');
  params.push(id);

  return runQuery(
    `UPDATE projects SET ${updateFields.join(', ')} WHERE id = ?`,
    params
  );
};

export const deleteProject = async (id: number) => {
  return runQuery('DELETE FROM projects WHERE id = ?', [id]);
};

export const getProjectsCount = async (filters: ProjectFilters = {}) => {
  const { type, status, search } = filters;
  
  let sql = 'SELECT COUNT(*) as count FROM projects';
  const params: any[] = [];
  const conditions: string[] = [];

  if (type) {
    conditions.push('type = ?');
    params.push(type);
  }

  if (status) {
    conditions.push('status = ?');
    params.push(status);
  }

  if (search) {
    conditions.push('(name LIKE ? OR description LIKE ?)');
    params.push(`%${search}%`, `%${search}%`);
  }

  if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }

  const result = await getQuery(sql, params);
  return result.count;
};

// ========== GPU PROVIDERS QUERIES ==========

export const getGPUProviders = async (filters: {
  availability_status?: string;
  gpu_type?: string;
  limit?: number;
  offset?: number;
} = {}) => {
  const { availability_status, gpu_type, limit = 50, offset = 0 } = filters;
  
  let sql = 'SELECT * FROM gpu_providers';
  const params: any[] = [];
  const conditions: string[] = [];

  if (availability_status) {
    conditions.push('availability_status = ?');
    params.push(availability_status);
  }

  if (gpu_type) {
    conditions.push('gpu_type LIKE ?');
    params.push(`%${gpu_type}%`);
  }

  if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }

  sql += ' ORDER BY reputation_score DESC, total_jobs_completed DESC LIMIT ? OFFSET ?';
  params.push(limit, offset);

  return allQuery(sql, params);
};

export const createGPUProvider = async (data: {
  wallet_address: string;
  gpu_type: string;
  gpu_count?: number;
  hourly_rate?: number;
  availability_status?: string;
}) => {
  const { wallet_address, gpu_type, gpu_count = 1, hourly_rate, availability_status = 'available' } = data;
  
  return runQuery(
    `INSERT INTO gpu_providers (wallet_address, gpu_type, gpu_count, hourly_rate, availability_status) 
     VALUES (?, ?, ?, ?, ?)`,
    [wallet_address, gpu_type, gpu_count, hourly_rate || null, availability_status]
  );
};

// ========== ANALYTICS QUERIES ==========

export const getMarketplaceMetrics = async (days: number = 30) => {
  return allQuery(`
    SELECT 
      metric_type,
      AVG(metric_value) as avg_value,
      MAX(metric_value) as max_value,
      MIN(metric_value) as min_value,
      COUNT(*) as record_count
    FROM marketplace_metrics 
    WHERE recorded_at >= date('now', '-${days} days')
    GROUP BY metric_type
  `);
};

export const getProjectStats = async () => {
  return getQuery(`
    SELECT 
      COUNT(*) as total_projects,
      COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_projects,
      COUNT(CASE WHEN status = 'in_progress' THEN 1 END) as in_progress_projects,
      COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_projects,
      COUNT(CASE WHEN type = 'IA' THEN 1 END) as ai_projects,
      COUNT(CASE WHEN type = 'grafica' THEN 1 END) as graphics_projects,
      AVG(valor) as avg_project_value
    FROM projects
  `);
};

export default {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  getProjectsCount,
  getGPUProviders,
  createGPUProvider,
  getMarketplaceMetrics,
  getProjectStats,
};