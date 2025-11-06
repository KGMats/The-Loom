'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProjects, getProjectStats } from '../lib/database/queries';
import { Project, ProjectFilters } from '../types/database';

// Hook personalizado para gerenciar projetos
export const useProjects = (filters: ProjectFilters = {}) => {
  return useQuery({
    queryKey: ['projects', filters],
    queryFn: () => getProjects(filters),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};

// Hook para estatísticas dos projetos
export const useProjectStats = () => {
  return useQuery({
    queryKey: ['project-stats'],
    queryFn: getProjectStats,
    staleTime: 10 * 60 * 1000, // 10 minutos
  });
};

// Hook para criar um novo projeto
export const useCreateProject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: any) => {
      // Importar aqui para evitar circular dependency
      const { createProject } = await import('../lib/database/queries');
      return createProject(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['project-stats'] });
    },
  });
};

// Hook para atualizar projeto
export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const { updateProject } = await import('../lib/database/queries');
      return updateProject(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['project-stats'] });
    },
  });
};

// Hook para deletar projeto
export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => {
      const { deleteProject } = await import('../lib/database/queries');
      return deleteProject(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['project-stats'] });
    },
  });
};

// Componente de exemplo usando os hooks
export default function ProjectManagerExample() {
  const [filters, setFilters] = useState<ProjectFilters>({
    limit: 10,
    offset: 0,
  });
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  
  // Hooks
  const { data: projects, isLoading, error } = useProjects(filters);
  const { data: stats } = useProjectStats();
  const createMutation = useCreateProject();
  const updateMutation = useUpdateProject();
  const deleteMutation = useDeleteProject();
  
  // Handlers
  const handleFilterChange = (key: keyof ProjectFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };
  
  const handleCreateProject = async (projectData: any) => {
    try {
      await createMutation.mutateAsync(projectData);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Erro ao criar projeto:', error);
    }
  };
  
  const handleUpdateProject = async (id: number, projectData: any) => {
    try {
      await updateMutation.mutateAsync({ id, data: projectData });
      setEditingProject(null);
    } catch (error) {
      console.error('Erro ao atualizar projeto:', error);
    }
  };
  
  const handleDeleteProject = async (id: number) => {
    if (window.confirm('Tem certeza que deseja deletar este projeto?')) {
      try {
        await deleteMutation.mutateAsync(id);
      } catch (error) {
        console.error('Erro ao deletar projeto:', error);
      }
    }
  };
  
  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-700">Erro ao carregar projetos. Tente novamente.</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Recarregar
        </button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Header com estatísticas */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">
          The Loom - Gerenciador de Projetos
        </h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Novo Projeto
        </button>
      </div>
      
      {/* Estatísticas rápidas */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow border">
            <div className="text-2xl font-bold text-blue-600">{stats.total_projects}</div>
            <div className="text-sm text-gray-600">Total de Projetos</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending_projects}</div>
            <div className="text-sm text-gray-600">Pendentes</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border">
            <div className="text-2xl font-bold text-green-600">{stats.completed_projects}</div>
            <div className="text-sm text-gray-600">Concluídos</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border">
            <div className="text-2xl font-bold text-purple-600">R$ {Math.round(stats.avg_project_value)}</div>
            <div className="text-sm text-gray-600">Valor Médio</div>
          </div>
        </div>
      )}
      
      {/* Filtros */}
      <div className="bg-white p-4 rounded-lg shadow border">
        <h2 className="text-lg font-semibold mb-3">Filtros</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo
            </label>
            <select
              value={filters.type || ''}
              onChange={(e) => handleFilterChange('type', e.target.value || undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos</option>
              <option value="IA">IA</option>
              <option value="grafica">Gráfica</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={filters.status || ''}
              onChange={(e) => handleFilterChange('status', e.target.value || undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos</option>
              <option value="pending">Pendente</option>
              <option value="in_progress">Em Progresso</option>
              <option value="completed">Concluído</option>
              <option value="cancelled">Cancelado</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Buscar
            </label>
            <input
              type="text"
              value={filters.search || ''}
              onChange={(e) => handleFilterChange('search', e.target.value || undefined)}
              placeholder="Nome ou descrição..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
      
      {/* Lista de projetos */}
      <div className="bg-white rounded-lg shadow border">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">
            Projetos ({projects?.length || 0})
          </h2>
        </div>
        
        <div className="divide-y">
          {projects?.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              Nenhum projeto encontrado.
            </div>
          ) : (
            projects?.map((project) => (
              <div key={project.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {project.name}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        project.type === 'IA' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-indigo-100 text-indigo-800'
                      }`}>
                        {project.type}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        project.status === 'completed' ? 'bg-green-100 text-green-800' :
                        project.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                        project.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    
                    {project.description && (
                      <p className="text-gray-600 text-sm mb-2">{project.description}</p>
                    )}
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>💰 R$ {project.valor.toLocaleString()}</span>
                      {project.gpu_requirements && (
                        <span>⚡ GPU Required</span>
                      )}
                      {project.wallet_address && (
                        <span>🔗 Blockchain Ready</span>
                      )}
                      <span>📅 {new Date(project.created_at).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingProject(project)}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm"
                      disabled={deleteMutation.isPending}
                    >
                      {deleteMutation.isPending ? '...' : 'Deletar'}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      {/* Modais e forms aqui... */}
      {isCreateModalOpen && (
        <CreateProjectModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateProject}
          isPending={createMutation.isPending}
        />
      )}
      
      {editingProject && (
        <EditProjectModal
          project={editingProject}
          isOpen={!!editingProject}
          onClose={() => setEditingProject(null)}
          onSubmit={(data) => handleUpdateProject(editingProject.id, data)}
          isPending={updateMutation.isPending}
        />
      )}
    </div>
  );
}

// Modal de criação (simplificado)
function CreateProjectModal({ isOpen, onClose, onSubmit, isPending }: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  isPending: boolean;
}) {
  const [formData, setFormData] = useState({
    name: '',
    valor: 0,
    type: 'IA' as 'IA' | 'grafica',
    description: '',
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Novo Projeto</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nome do projeto"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="number"
            placeholder="Valor (R$)"
            value={formData.valor}
            onChange={(e) => setFormData(prev => ({ ...prev, valor: Number(e.target.value) }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
          <select
            value={formData.type}
            onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="IA">IA</option>
            <option value="grafica">Gráfica</option>
          </select>
          <textarea
            placeholder="Descrição"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows={3}
          />
          <div className="flex space-x-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 border border-gray-300 rounded-md">
              Cancelar
            </button>
            <button type="submit" disabled={isPending} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md">
              {isPending ? 'Criando...' : 'Criar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Modal de edição (simplificado)
function EditProjectModal({ project, isOpen, onClose, onSubmit, isPending }: any) {
  const [formData, setFormData] = useState({
    name: project.name,
    valor: project.valor,
    type: project.type,
    description: project.description || '',
    status: project.status,
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Editar Projeto</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="number"
            value={formData.valor}
            onChange={(e) => setFormData(prev => ({ ...prev, valor: Number(e.target.value) }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
          <select
            value={formData.type}
            onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="IA">IA</option>
            <option value="grafica">Gráfica</option>
          </select>
          <select
            value={formData.status}
            onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="pending">Pendente</option>
            <option value="in_progress">Em Progresso</option>
            <option value="completed">Concluído</option>
            <option value="cancelled">Cancelado</option>
          </select>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows={3}
          />
          <div className="flex space-x-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 border border-gray-300 rounded-md">
              Cancelar
            </button>
            <button type="submit" disabled={isPending} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md">
              {isPending ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}