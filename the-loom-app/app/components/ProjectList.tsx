"use client";

import React from 'react';

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

interface Props {
  projects: Project[];
  onEdit: (p: Project) => void;
  onStart: (p: Project) => void;
  onDelete: (id: number) => void;
  onUpdateProgress?: (id: number, progress: number) => void;
}

export default function ProjectList({ projects, onEdit, onStart, onDelete }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((p) => (
        <div key={p.id} className="bg-white p-4 rounded shadow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold">{p.title}</h3>
              <p className="text-sm text-gray-500">{p.type} • {p.price} ETH</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">{p.status || 'DISPONÍVEL'}</p>
              <p className="text-xs text-gray-400">#{p.id}</p>
            </div>
          </div>

          {p.description ? <p className="mt-3 text-sm text-gray-700">{p.description}</p> : null}

          <div className="mt-4 flex space-x-2">
            <button
              onClick={() => onEdit(p)}
              className="flex-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-3 py-2 rounded text-sm"
            >
              Editar
            </button>
            {p.status === 'PENDING' && (
              <button
                onClick={() => onStart(p)}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm"
              >
                Iniciar
              </button>
            )}
            {p.status === 'WORKING' && (
              <div className="flex-1 bg-blue-100 text-blue-800 px-3 py-2 rounded text-sm flex items-center justify-center">
                {p.progress}% Concluído
              </div>
            )}
            {p.status === 'COMPLETED' && (
              <div className="flex-1 bg-green-100 text-green-800 px-3 py-2 rounded text-sm flex items-center justify-center">
                ✓ Concluído
              </div>
            )}
            <button
              onClick={() => onDelete(p.id)}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm"
            >
              Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
