import { NextResponse } from 'next/server';
import { allQuery, runQuery, getQuery } from '../../../database.js';

const isValidWalletAddress = (address: string) => /^0x[a-fA-F0-9]{40}$/.test(address);

// GET /api/projects - lista todos os projetos
export async function GET() {
  try {
    const projects = await allQuery('SELECT * FROM projects ORDER BY id DESC');
    return NextResponse.json({ success: true, projects });
  } catch (error: any) {
    console.error('GET /api/projects error:', error);
    return NextResponse.json({ success: false, error: 'Erro ao carregar projetos' }, { status: 500 });
  }
}

// POST /api/projects - cria um novo projeto
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { title, description, type, price, wallet_address } = data;

    if (!title || typeof title !== 'string' || !title.trim()) {
      return NextResponse.json({ success: false, error: 'Título é obrigatório' }, { status: 400 });
    }
    if (!type || !['IA', 'GRAFICA'].includes(type)) {
      return NextResponse.json({ success: false, error: 'Tipo deve ser "IA" ou "GRAFICA"' }, { status: 400 });
    }
    if (typeof price !== 'number' || isNaN(price) || price <= 0) {
      return NextResponse.json({ success: false, error: 'Preço deve ser um número positivo' }, { status: 400 });
    }
    if (wallet_address && !isValidWalletAddress(wallet_address)) {
      return NextResponse.json({ success: false, error: 'Endereço de carteira inválido' }, { status: 400 });
    }

    const now = new Date().toISOString();
    const result: any = await runQuery(
      `INSERT INTO projects (title, description, type, price, wallet_address, status, progress, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [title.trim(), description || '', type, price, wallet_address || '', 'PENDING', 0, now]
    );

    const inserted = await getQuery('SELECT * FROM projects WHERE id = ?', [result.lastID]);
    return NextResponse.json({ success: true, project: inserted }, { status: 201 });
  } catch (error: any) {
    console.error('POST /api/projects error:', error);
    return NextResponse.json({ success: false, error: 'Erro interno do servidor' }, { status: 500 });
  }
}