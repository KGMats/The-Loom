// app/api/projects/route.js - API MVP SIMPLIFICADA
import { NextResponse } from 'next/server';
import { runQuery, allQuery, getQuery } from '../../../database_mvp.js';

// GET - Listar todos os projetos
export async function GET() {
  try {
    const projects = await allQuery(`
      SELECT * FROM projects 
      ORDER BY created_at DESC
    `);

    return NextResponse.json({ 
      success: true,
      projects,
      total: projects.length
    });
  } catch (error) {
    console.error('Erro ao buscar projetos:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro ao carregar projetos',
        message: error.message 
      },
      { status: 500 }
    );
  }
}

// POST - Criar novo projeto
export async function POST(request) {
  try {
    const data = await request.json();
    const { title, description, type, price, wallet_address } = data;

    // Validação básica
    if (!title || !type || !price) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Título, tipo e preço são obrigatórios' 
        },
        { status: 400 }
      );
    }

    // Validação do tipo
    if (!['IA', 'GRAFICA'].includes(type)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Tipo deve ser "IA" ou "GRAFICA"' 
        },
        { status: 400 }
      );
    }

    // Inserir no banco
    const result = await runQuery(
      'INSERT INTO projects (title, description, type, price, wallet_address) VALUES (?, ?, ?, ?, ?)',
      [title, description || '', type, price, wallet_address || '']
    );

    // Buscar o projeto criado
    const newProject = await getQuery(
      'SELECT * FROM projects WHERE id = ?',
      [result.lastID]
    );

    return NextResponse.json({
      success: true,
      message: 'Projeto criado com sucesso!',
      project: newProject
    }, { status: 201 });

  } catch (error) {
    console.error('Erro ao criar projeto:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro ao criar projeto',
        message: error.message 
      },
      { status: 500 }
    );
  }
}