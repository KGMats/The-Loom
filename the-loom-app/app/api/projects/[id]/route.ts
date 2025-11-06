// app/api/projects/[id]/route.js - API MVP SIMPLIFICADA
import { NextResponse } from 'next/server';
import { runQuery, getQuery } from '../../../../database_mvp.js';

// GET - Buscar projeto por ID
export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!id || isNaN(id)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'ID inválido' 
        },
        { status: 400 }
      );
    }

    const project = await getQuery(
      'SELECT * FROM projects WHERE id = ?',
      [id]
    );

    if (!project) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Projeto não encontrado' 
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      project
    });

  } catch (error) {
    console.error('Erro ao buscar projeto:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro ao buscar projeto',
        message: error.message 
      },
      { status: 500 }
    );
  }
}

// PUT - Atualizar projeto
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const data = await request.json();

    if (!id || isNaN(id)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'ID inválido' 
        },
        { status: 400 }
      );
    }

    // Verificar se o projeto existe
    const existingProject = await getQuery(
      'SELECT * FROM projects WHERE id = ?',
      [id]
    );

    if (!existingProject) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Projeto não encontrado' 
        },
        { status: 404 }
      );
    }

    // Campos atualizáveis
    const allowedFields = ['title', 'description', 'status', 'progress'];
    const updates = [];
    const values = [];

    Object.keys(data).forEach(key => {
      if (allowedFields.includes(key) && data[key] !== undefined) {
        updates.push(`${key} = ?`);
        values.push(data[key]);
      }
    });

    if (updates.length === 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Nenhum campo válido para atualizar' 
        },
        { status: 400 }
      );
    }

    values.push(id);

    await runQuery(
      `UPDATE projects SET ${updates.join(', ')} WHERE id = ?`,
      values
    );

    // Buscar o projeto atualizado
    const updatedProject = await getQuery(
      'SELECT * FROM projects WHERE id = ?',
      [id]
    );

    return NextResponse.json({
      success: true,
      message: 'Projeto atualizado com sucesso!',
      project: updatedProject
    });

  } catch (error) {
    console.error('Erro ao atualizar projeto:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro ao atualizar projeto',
        message: error.message 
      },
      { status: 500 }
    );
  }
}

// DELETE - Deletar projeto
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    if (!id || isNaN(id)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'ID inválido' 
        },
        { status: 400 }
      );
    }

    // Verificar se o projeto existe
    const project = await getQuery(
      'SELECT * FROM projects WHERE id = ?',
      [id]
    );

    if (!project) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Projeto não encontrado' 
        },
        { status: 404 }
      );
    }

    // Deletar
    await runQuery(
      'DELETE FROM projects WHERE id = ?',
      [id]
    );

    return NextResponse.json({
      success: true,
      message: 'Projeto deletado com sucesso!'
    });

  } catch (error) {
    console.error('Erro ao deletar projeto:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro ao deletar projeto',
        message: error.message 
      },
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