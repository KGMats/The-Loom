// Em: app/api/projects/route.ts
import { NextResponse } from 'next/server';
// Importamos nosso banco de dados simples.
// O @/ está configurado no seu tsconfig.json
import db from '@/lib/database.js';

// Função auxiliar para traduzir campos do Banco para o Frontend
const dbProjectToFrontend = (project: any) => {
  return {
    id: project.id,
    title: project.name, // (Banco 'name' -> Front 'title')
    description: project.description,
    price: project.valor, // (Banco 'valor' -> Front 'price')
    type: project.type,
    status: project.status,
    progress: project.progress,
    wallet_address: project.wallet_address,
  };
};

// ----------------------------------------------------
// GET /api/projects (Ler TODOS os projetos)
// ----------------------------------------------------
export async function GET() {
  try {
    const projects = await new Promise<any[]>((resolve, reject) => {
      db.all('SELECT * FROM projects ORDER BY id DESC', [], (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });

    // Traduz os campos do banco para o frontend
    const frontendProjects = projects.map(dbProjectToFrontend);

    // O seu frontend espera um objeto { success: true, projects: ... }
    return NextResponse.json({ success: true, projects: frontendProjects });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// ----------------------------------------------------
// POST /api/projects (CRIAR um projeto)
// ----------------------------------------------------
export async function POST(request: Request) {
  try {
    // O frontend envia 'title', 'price', etc.
    const { title, description, type, price, wallet_address } = await request.json();

    if (!title || price === undefined || !type) {
      return NextResponse.json({ error: 'Campos obrigatórios faltando' }, { status: 400 });
    }
    
    // Traduzimos os campos do frontend para o banco
    const name = title;
    const valor = price;
    const status = 'PENDING';
    const progress = 0;

    const result = await new Promise<{ lastID: number }>((resolve, reject) => {
      db.run(
        'INSERT INTO projects (name, description, valor, type, status, progress, wallet_address) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, description, valor, type, status, progress, wallet_address],
        function (err) { // Não use arrow function para ter o 'this'
          if (err) reject(err);
          resolve({ lastID: this.lastID });
        }
      );
    });

    return NextResponse.json(
      { 
        id: result.lastID, 
        title, 
        description, 
        price, 
        type, 
        status, 
        progress, 
        wallet_address 
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}