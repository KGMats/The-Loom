import { NextResponse } from 'next/server';
import { getQuery, runQuery } from '../../../../../database.js';

// ------------------------------------------------------------------
// R - READ (Ler UM projeto específico)
// ------------------------------------------------------------------
export async function GET(request, { params }) {
  try {
    const id = params.id;

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'ID deve ser um número válido' },
        { status: 400 }
      );
    }

    const project = await getQuery(
      'SELECT * FROM projects WHERE id = ?',
      [parseInt(id)]
    );

    if (!project) {
      return NextResponse.json(
        { error: 'Projeto não encontrado' },
        { status: 404 }
      );
    }

    // Parsear gpu_requirements se existir
    if (project.gpu_requirements) {
      try {
        project.gpu_requirements = JSON.parse(project.gpu_requirements);
      } catch (e) {
        console.warn('Erro ao fazer parse de gpu_requirements:', e);
        project.gpu_requirements = null;
      }
    }

    return NextResponse.json({ project });
  } catch (error) {
    console.error('Erro ao buscar projeto:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor ao buscar projeto' },
      { status: 500 }
    );
  }
}

// ------------------------------------------------------------------
// U - UPDATE (Atualizar UM projeto)
// ------------------------------------------------------------------
export async function PUT(request, { params }) {
  try {
    const id = params.id;

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'ID deve ser um número válido' },
        { status: 400 }
      );
    }

    const { name, valor, type, description, gpu_requirements, status } = await request.json();

    // Verificar se o projeto existe
    const existingProject = await getQuery(
      'SELECT * FROM projects WHERE id = ?',
      [parseInt(id)]
    );

    if (!existingProject) {
      return NextResponse.json(
        { error: 'Projeto não encontrado' },
        { status: 404 }
      );
    }

    // Validações para campos que podem ser atualizados
    const updateFields = [];
    const updateParams = [];

    if (name !== undefined) {
      if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return NextResponse.json(
          { error: 'Nome deve ser uma string válida' },
          { status: 400 }
        );
      }
      updateFields.push('name = ?');
      updateParams.push(name.trim());
    }

    if (valor !== undefined) {
      if (typeof valor !== 'number' || valor <= 0) {
        return NextResponse.json(
          { error: 'Valor deve ser um número positivo' },
          { status: 400 }
        );
      }
      updateFields.push('valor = ?');
      updateParams.push(valor);
    }

    if (type !== undefined) {
      if (type !== 'grafica' && type !== 'IA') {
        return NextResponse.json(
          { error: 'Tipo deve ser "grafica" ou "IA"' },
          { status: 400 }
        );
      }
      updateFields.push('type = ?');
      updateParams.push(type);
    }

    if (description !== undefined) {
      if (description && typeof description !== 'string') {
        return NextResponse.json(
          { error: 'Description deve ser uma string' },
          { status: 400 }
        );
      }
      updateFields.push('description = ?');
      updateParams.push(description || null);
    }

    if (gpu_requirements !== undefined) {
      if (gpu_requirements && typeof gpu_requirements !== 'object') {
        return NextResponse.json(
          { error: 'gpu_requirements deve ser um objeto JSON' },
          { status: 400 }
        );
      }
      const gpuReqJson = gpu_requirements ? JSON.stringify(gpu_requirements) : null;
      updateFields.push('gpu_requirements = ?');
      updateParams.push(gpuReqJson);
    }

    if (status !== undefined) {
      if (!['pending', 'in_progress', 'completed', 'cancelled'].includes(status)) {
        return NextResponse.json(
          { error: 'Status deve ser: pending, in_progress, completed, ou cancelled' },
          { status: 400 }
        );
      }
      updateFields.push('status = ?');
      updateParams.push(status);
    }

    // Adicionar updated_at
    updateFields.push('updated_at = CURRENT_TIMESTAMP');
    updateParams.push(parseInt(id));

    if (updateFields.length === 1) { // Apenas updated_at
      return NextResponse.json(
        { error: 'Nenhum campo válido para atualizar' },
        { status: 400 }
      );
    }

    const sql = `UPDATE projects SET ${updateFields.join(', ')} WHERE id = ?`;
    
    const result = await runQuery(sql, updateParams);

    if (result.changes === 0) {
      return NextResponse.json(
        { error: 'Nenhuma alteração foi feita' },
        { status: 400 }
      );
    }

    // Buscar projeto atualizado
    const updatedProject = await getQuery(
      'SELECT * FROM projects WHERE id = ?',
      [parseInt(id)]
    );

    // Parsear gpu_requirements se existir
    if (updatedProject.gpu_requirements) {
      try {
        updatedProject.gpu_requirements = JSON.parse(updatedProject.gpu_requirements);
      } catch (e) {
        console.warn('Erro ao fazer parse de gpu_requirements:', e);
        updatedProject.gpu_requirements = null;
      }
    }

    return NextResponse.json({
      project: updatedProject,
      message: 'Projeto atualizado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao atualizar projeto:', error);
    
    if (error.message.includes('CHECK constraint failed')) {
      return NextResponse.json(
        { error: 'Validações falharam. Verifique os dados enviados.' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Erro interno do servidor ao atualizar projeto' },
      { status: 500 }
    );
  }
}

// ------------------------------------------------------------------
// D - DELETE (Deletar UM projeto)
// ------------------------------------------------------------------
export async function DELETE(request, { params }) {
  try {
    const id = params.id;

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'ID deve ser um número válido' },
        { status: 400 }
      );
    }

    // Verificar se o projeto existe
    const existingProject = await getQuery(
      'SELECT * FROM projects WHERE id = ?',
      [parseInt(id)]
    );

    if (!existingProject) {
      return NextResponse.json(
        { error: 'Projeto não encontrado' },
        { status: 404 }
      );
    }

    const result = await runQuery(
      'DELETE FROM projects WHERE id = ?',
      [parseInt(id)]
    );

    if (result.changes === 0) {
      return NextResponse.json(
        { error: 'Erro ao deletar projeto' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Projeto deletado com sucesso',
      deletedProject: {
        id: existingProject.id,
        name: existingProject.name
      }
    });
  } catch (error) {
    console.error('Erro ao deletar projeto:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor ao deletar projeto' },
      { status: 500 }
    );
  }
}// Em: app/api/projects/[id]/route.js

import { NextResponse } from 'next/server';
import db from '@/database.js'; // ou '../../database.js'

// ------------------------------------------------------------------
// R - READ (Ler UM projeto específico)
// ------------------------------------------------------------------
export async function GET(request, { params }) {
  try {
    const id = params.id; // Pega o 'id' da URL (ex: /api/projects/123)

    const project = await new Promise((resolve, reject) => {
      db.get('SELECT * FROM projects WHERE id = ?', [id], (err, row) => {
        if (err) reject(err);
        resolve(row);
      });
    });

    if (!project) {
      return NextResponse.json(
        { error: 'Projeto não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ------------------------------------------------------------------
// U - UPDATE (Atualizar UM projeto)
// ------------------------------------------------------------------
export async function PUT(request, { params }) {
  try {
    const id = params.id;
    const { name, valor, type } = await request.json();

    // Validações (iguais às do POST)
    if (!name || !valor || !type) {
      return NextResponse.json(
        { error: 'Campos "name", "valor" e "type" são obrigatórios' },
        { status: 400 }
      );
    }
    if (type !== 'entrada' && type !== 'saida') {
      return NextResponse.json(
        { error: 'O campo "type" deve ser "entrada" ou "saida"' },
        { status: 400 }
      );
    }

    const result = await new Promise((resolve, reject) => {
      // 'function' para pegar o 'this.changes'
      db.run(
        'UPDATE projects SET name = ?, valor = ?, type = ? WHERE id = ?',
        [name, valor, type, id],
        function (err) {
          if (err) reject(err);
          // 'this.changes' diz quantas linhas foram afetadas
          resolve({ changes: this.changes });
        }
      );
    });

    // Se nenhuma linha mudou, é porque o ID não foi encontrado
    if (result.changes === 0) {
      return NextResponse.json(
        { error: 'Projeto não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ id, name, valor, type });
  } catch (error) {
    // Trata o erro de restrição (CHECK) do banco
    if (error.message.includes('CHECK constraint failed')) {
      return NextResponse.json(
        { error: 'O campo "type" deve ser "entrada" ou "saida"' },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ------------------------------------------------------------------
// D - DELETE (Deletar UM projeto)
// ------------------------------------------------------------------
export async function DELETE(request, { params }) {
  try {
    const id = params.id;

    const result = await new Promise((resolve, reject) => {
      db.run('DELETE FROM projects WHERE id = ?', [id], function (err) {
        if (err) reject(err);
        resolve({ changes: this.changes });
      });
    });

    if (result.changes === 0) {
      return NextResponse.json(
        { error: 'Projeto não encontrado' },
        { status: 404 }
      );
    }

    // Retorna uma resposta vazia com status 204 (No Content)
    // ou uma mensagem de sucesso
    return NextResponse.json({ message: 'Projeto deletado com sucesso' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}