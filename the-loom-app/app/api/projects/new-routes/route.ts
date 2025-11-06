import { NextResponse } from 'next/server';
import { allQuery, runQuery } from '../../../../database.js';

// ------------------------------------------------------------------
// R - READ (Ler TODOS os projetos com filtros opcionais)
// ------------------------------------------------------------------
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit')) || 50;
    const offset = parseInt(searchParams.get('offset')) || 0;

    let sql = 'SELECT * FROM projects';
    let params = [];
    const conditions = [];

    // Filtros opcionais
    if (type && (type === 'grafica' || type === 'IA')) {
      conditions.push('type = ?');
      params.push(type);
    }

    if (status && ['pending', 'in_progress', 'completed', 'cancelled'].includes(status)) {
      conditions.push('status = ?');
      params.push(status);
    }

    // Construir query com WHERE se houver filtros
    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

    sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const projects = await allQuery(sql, params);

    // Contar total para paginação
    let countSql = 'SELECT COUNT(*) as total FROM projects';
    let countParams = [];
    if (conditions.length > 0) {
      countSql += ' WHERE ' + conditions.join(' AND ');
      countParams = params.slice(0, -2); // Remove LIMIT e OFFSET
    }
    
    const totalResult = await allQuery(countSql, countParams);
    const total = totalResult[0].total;

    return NextResponse.json({
      projects,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      }
    });
  } catch (error) {
    console.error('Erro ao buscar projetos:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor ao buscar projetos' },
      { status: 500 }
    );
  }
}

// ------------------------------------------------------------------
// C - CREATE (Criar UM novo projeto)
// ------------------------------------------------------------------
export async function POST(request) {
  try {
    const { name, valor, type, description, gpu_requirements } = await request.json();

    // Validações robustas
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Nome é obrigatório e deve ser uma string válida' },
        { status: 400 }
      );
    }

    if (!valor || typeof valor !== 'number' || valor <= 0) {
      return NextResponse.json(
        { error: 'Valor é obrigatório e deve ser um número positivo' },
        { status: 400 }
      );
    }

    if (!type || (type !== 'grafica' && type !== 'IA')) {
      return NextResponse.json(
        { error: 'Tipo deve ser "grafica" ou "IA"' },
        { status: 400 }
      );
    }

    // Validar gpu_requirements se fornecido
    let gpuReqJson = null;
    if (gpu_requirements) {
      if (typeof gpu_requirements !== 'object') {
        return NextResponse.json(
          { error: 'gpu_requirements deve ser um objeto JSON' },
          { status: 400 }
        );
      }
      gpuReqJson = JSON.stringify(gpu_requirements);
    }

    // Validar description se fornecido
    if (description && typeof description !== 'string') {
      return NextResponse.json(
        { error: 'Description deve ser uma string' },
        { status: 400 }
      );
    }

    const result = await runQuery(
      `INSERT INTO projects (name, valor, type, description, gpu_requirements, status) 
       VALUES (?, ?, ?, ?, ?, 'pending')`,
      [name.trim(), valor, type, description || null, gpuReqJson]
    );

    if (result.changes === 0) {
      return NextResponse.json(
        { error: 'Erro ao criar projeto' },
        { status: 500 }
      );
    }

    // Buscar o projeto criado para retornar
    const createdProject = await allQuery(
      'SELECT * FROM projects WHERE id = ?',
      [result.lastID]
    );

    return NextResponse.json(
      {
        project: createdProject[0],
        message: 'Projeto criado com sucesso'
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erro ao criar projeto:', error);
    
    if (error.message.includes('CHECK constraint failed')) {
      return NextResponse.json(
        { error: 'Validações falharam. Verifique os dados enviados.' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Erro interno do servidor ao criar projeto' },
      { status: 500 }
    );
  }
}