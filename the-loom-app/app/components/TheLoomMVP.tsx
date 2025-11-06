"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect } from 'wagmi';
import ProjectStats from './ProjectStats';
import CreateProject from './CreateProject';
import ProjectList from './ProjectList';

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

  // Guarda interval IDs para evitar leaks quando navegar fora do componente
  const intervalsRef = useRef<Record<number, number>>({});

  useEffect(() => {
    return () => {
      Object.values(intervalsRef.current).forEach((id) => clearInterval(id));
      intervalsRef.current = {};
    };
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

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
      // Evita closure sobre project.progress usando variável local
      let progress = typeof project.progress === 'number' ? project.progress : 0;
      const projId = project.id;

      // dispara estado WORKING imediatamente
      updateMutation.mutate({ id: projId, data: { status: 'WORKING', progress } });

      const intervalId = window.setInterval(() => {
        progress = Math.min(progress + 10, 100);

        updateMutation.mutate({
          id: projId,
          data: {
            status: progress >= 100 ? 'COMPLETED' : 'WORKING',
            progress
          }
        });

        if (progress >= 100) {
          clearInterval(intervalsRef.current[projId]);
          delete intervalsRef.current[projId];
        }
      }, 2000);

      intervalsRef.current[projId] = intervalId as unknown as number;
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
        <ProjectStats projects={data?.projects || []} />

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

        <ProjectList
          projects={data?.projects || []}
          onEdit={handleEdit}
          onStart={startProject}
          onDelete={handleDelete}
        />
      </main>

      {/* Modal with extracted CreateProject component */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <CreateProject
            initial={editingProject || undefined}
            onCancel={() => setIsModalOpen(false)}
            onSubmit={(payload) => {
              if (editingProject) {
                updateMutation.mutate({ id: editingProject.id, data: { ...payload, wallet_address: payload.wallet_address || address || '' } });
              } else {
                createMutation.mutate({ ...payload, wallet_address: payload.wallet_address || address || '' });
              }
            }}
            loading={createMutation.isPending || updateMutation.isPending}
            isEditing={!!editingProject}
          />
        </div>
      )}
    </div>
  );
}