'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect, useConnect, useAccountModal } from '@rainbow-me/rainbowkit';

// Types simples
interface Project {
  id: number;
  title: string;
  description: string;
  type: 'IA' | 'GRAFICA';
  price: number;
  wallet_address: string;
  status: 'PENDING' | 'WORKING' | 'COMPLETED';
  progress: number;
  created_at: string;
}

interface CreateProjectData {
  title: string;
  description: string;
  type: 'IA' | 'GRAFICA';
  price: number;
  wallet_address: string;
}

// Hook para buscar projetos
const fetchProjects = async (): Promise<{ success: boolean; projects: Project[] }> => {
  const response = await fetch('/api/projects');
  if (!response.ok) throw new Error('Erro ao carregar projetos');
  return response.json();
};

// Hook para criar projeto
const createProject = async (data: CreateProjectData) => {
  const response = await fetch('/api/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Erro ao criar projeto');
  return response.json();
};

// Hook para atualizar projeto
const updateProject = async ({ id, data }: { id: number; data: Partial<Project> }) => {
  const response = await fetch(`/api/projects/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Erro ao atualizar projeto');
  return response.json();
};

// Hook para deletar projeto
const deleteProject = async (id: number) => {
  const response = await fetch(`/api/projects/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Erro ao deletar projeto');
  return response.json();
};

export default function TheLoomMVP() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<CreateProjectData>({
    title: '',
    description: '',
    type: 'IA',
    price: 0,
    wallet_address: '',
  });

  const queryClient = useQueryClient();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  // Queries
  const { data, isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setIsModalOpen(false);
      setFormData({ title: '', description: '', type: 'IA', price: 0, wallet_address: '' });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setEditingProject(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const dataToSend = {
      ...formData,
      wallet_address: address || '',
    };

    if (editingProject) {
      updateMutation.mutate({ id: editingProject.id, data: dataToSend });
    } else {
      createMutation.mutate(dataToSend);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      type: project.type,
      price: project.price,
      wallet_address: project.wallet_address,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja deletar este projeto?')) {
      deleteMutation.mutate(id);
    }
  };

  const startProject = (project: Project) => {
    if (project.status === 'PENDING') {
      // Simular progresso
      const progressInterval = setInterval(() => {
        updateMutation.mutate({
          id: project.id,
          data: { 
            status: 'WORKING',
            progress: Math.min(project.progress + 10, 100)
          }
        });
        
        if (project.progress + 10 >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            updateMutation.mutate({
              id: project.id,
              data: { status: 'COMPLETED', progress: 100 }
            });
          }, 2000);
        }
      }, 1000);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'WORKING': return 'bg-blue-100 text-blue-800';
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'IA' ? 'bg-purple-100 text-purple-800' : 'bg-orange-100 text-orange-800';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-2xl text-gray-600">🚀 Carregando The Loom...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-2xl text-red-600">❌ Erro ao carregar projetos</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-3xl font-bold text-gray-900">🏗️ The Loom</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {address ? `💰 ${address.slice(0, 6)}...${address.slice(-4)}` : 'Carteira não conectada'}
              </span>
              <ConnectButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Total de Projetos</h3>
            <p className="text-3xl font-bold text-blue-600">{data?.projects?.length || 0}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Projetos Ativos</h3>
            <p className="text-3xl font-bold text-yellow-600">
              {data?.projects?.filter(p => p.status === 'WORKING').length || 0}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Concluídos</h3>
            <p className="text-3xl font-bold text-green-600">
              {data?.projects?.filter(p => p.status === 'COMPLETED').length || 0}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mb-8">
          <button
            onClick={() => {
              setEditingProject(null);
              setFormData({ title: '', description: '', type: 'IA', price: 0, wallet_address: '' });
              setIsModalOpen(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            ➕ Novo Projeto
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.projects?.map((project) => (
            <div key={project.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                <div className="flex space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getTypeColor(project.type)}`}>
                    {project.type}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Preço</span>
                  <span className="font-semibold">{project.price} ETH</span>
                </div>
                
                {project.status === 'WORKING' && (
                  <div className="mb-2">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progresso</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex space-x-2">
                {project.status === 'PENDING' && (
                  <button
                    onClick={() => startProject(project)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold text-sm transition-colors"
                  >
                    ▶️ Iniciar
                  </button>
                )}
                
                <button
                  onClick={() => handleEdit(project)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded font-semibold text-sm transition-colors"
                >
                  ✏️ Editar
                </button>
                
                <button
                  onClick={() => handleDelete(project.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded font-semibold text-sm transition-colors"
                >
                  🗑️ Deletar
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">
              {editingProject ? '✏️ Editar Projeto' : '➕ Novo Projeto'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Título</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Descrição</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 h-20"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Tipo</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as 'IA' | 'GRAFICA' })}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="IA">🤖 IA</option>
                  <option value="GRAFICA">🎨 Gráfica</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Preço (ETH)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded font-semibold transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold transition-colors"
                  disabled={createMutation.isPending || updateMutation.isPending}
                >
                  {editingProject ? 'Atualizar' : 'Criar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}