"use client";

import React, { useState } from 'react';

interface CreateProjectData {
  title: string;
  description: string;
  type: 'IA' | 'GRAFICA';
  price: number;
  wallet_address: string;
}

interface Props {
  initial?: Partial<CreateProjectData>;
  onCancel: () => void;
  onSubmit: (data: CreateProjectData) => void;
  loading?: boolean;
  isEditing?: boolean;
}

export default function CreateProject({ initial = {}, onCancel, onSubmit, loading = false, isEditing = false }: Props) {
  const [formData, setFormData] = useState<CreateProjectData>({
    title: initial.title || '',
    description: initial.description || '',
    type: (initial.type as 'IA' | 'GRAFICA') || 'IA',
    price: initial.price || 0,
    wallet_address: initial.wallet_address || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-lg p-6 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">{isEditing ? '✏️ Editar Projeto' : '➕ Novo Projeto'}</h2>
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
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded font-semibold transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold transition-colors"
            disabled={loading}
          >
            {isEditing ? 'Atualizar' : 'Criar'}
          </button>
        </div>
      </form>
    </div>
  );
}
