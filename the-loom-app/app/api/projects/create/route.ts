import { NextRequest, NextResponse } from 'next/server';
import db from '../../../../utils/database.js';
import type { Project, DatabaseResult } from '../types';

interface DatabaseResult {
  lastID?: number;
}

interface Project {
  id: string;
  name: string;
  valor: number;
  type: 'entrada' | 'saida';
}

// C - CREATE (Criar UM novo projeto)
export async function POST(request: NextRequest) {
  try {
    const { name, valor, type } = await request.json() as Partial<Project>;

    // Validação simples
    if (!name || !valor || !type) {
      return NextResponse.json(
        { error: 'Campos "name", "valor" e "type" são obrigatórios' },
        { status: 400 }
      );
    }

    // Validação do 'type' que definimos no banco
    if (type !== 'entrada' && type !== 'saida') {
      return NextResponse.json(
        { error: 'O campo "type" deve ser "entrada" ou "saida"' },
        { status: 400 }
      );
    }

    const result = await new Promise<DatabaseResult>((resolve, reject) => {
      db.run(
        'INSERT INTO projects (name, valor, type) VALUES (?, ?, ?)',
        [name, valor, type],
        function (this: DatabaseResult, err: Error | null) {
          if (err) {
            reject(err);
          } else {
            resolve({ lastID: this.lastID });
          }
        }
      );
    });

    return NextResponse.json(
      { id: result.lastID, name, valor, type },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error && error.message.includes('CHECK constraint failed')) {
      return NextResponse.json(
        { error: 'O campo "type" deve ser "entrada" ou "saida"' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro desconhecido' },
      { status: 500 }
    );
  }
}