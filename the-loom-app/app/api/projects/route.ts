import { NextResponse } from 'next/server';
import { allQuery, runQuery, getQuery } from '../../../database.js';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

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
  cloud_link?: string;
  script_path?: string;
  external_links?: string; // Vem como string do DB
  attachment_info?: string;
}

const isValidWalletAddress = (address: string) => /^0x[a-fA-F0-9]{40}$/.test(address);

// Função helper para parsear external_links
function parseProject(project: any) {
  if (project.external_links) {
    try {
      project.external_links = JSON.parse(project.external_links);
    } catch (e) {
      project.external_links = [];
    }
  }
  return project;
}

// GET /api/projects - lista todos os projetos
export async function GET() {
  try {
    const projects = await allQuery('SELECT * FROM projects ORDER BY id DESC');
    
    // 🔥 CORREÇÃO: Parse external_links para cada projeto
    const parsedProjects = projects.map(parseProject);
    
    return NextResponse.json({ success: true, projects: parsedProjects });
  } catch (error: any) {
    console.error('GET /api/projects error:', error);
    return NextResponse.json({ success: false, error: 'Erro ao carregar projetos' }, { status: 500 });
  }
}

// POST /api/projects - cria um novo projeto
export async function POST(request: Request) {
  try {
    const data = await request.formData();
    
    const title = data.get('title') as string;
    const description = data.get('description') as string;
    const type = data.get('type') as 'IA' | 'GRAFICA';
    const price = parseFloat(data.get('price') as string);
    const wallet_address = data.get('wallet_address') as string;
    const cloud_link = data.get('cloud_link') as string;
    
    const externalLinksStr = data.get('external_links');
    const external_links = externalLinksStr ? JSON.parse(externalLinksStr as string) : [];
    const attachment_info = data.get('attachment_info') as string;
    
    const file = data.get('script_file') as File | null;

    // Validações
    if (!title || !type || !price) {
      return NextResponse.json({ success: false, error: 'Campos obrigatórios faltando' }, { status: 400 });
    }

    if (type !== 'IA' && type !== 'GRAFICA') {
      return NextResponse.json({ success: false, error: 'Tipo inválido. Use "IA" ou "GRAFICA"' }, { status: 400 });
    }

    if (wallet_address && !isValidWalletAddress(wallet_address)) {
      return NextResponse.json({ success: false, error: 'Endereço de carteira inválido' }, { status: 400 });
    }

    let scriptPath: string | null = null;

    // Processar arquivo
    if (file) {
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
      
      if (!existsSync(uploadsDir)) {
        await mkdir(uploadsDir, { recursive: true });
      }

      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const filePath = path.join(uploadsDir, filename);

      await writeFile(filePath, uint8Array);
      scriptPath = `/uploads/${filename}`;
      console.log(`Arquivo salvo em: ${filePath}`);
    }

    const now = new Date().toISOString();
    const result: any = await runQuery(
      `INSERT INTO projects (
        title, description, type, price, wallet_address,
        status, progress, created_at, cloud_link, script_path,
        external_links, attachment_info
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title.trim(),
        description || '',
        type,
        price,
        wallet_address || '',
        'PENDING',
        0,
        now,
        cloud_link || null,
        scriptPath,
        JSON.stringify(external_links),
        attachment_info || null
      ]
    );

    const inserted = await getQuery('SELECT * FROM projects WHERE id = ?', [result.lastID]);
    
    // 🔥 CORREÇÃO: Parse antes de retornar
    return NextResponse.json({ success: true, project: parseProject(inserted) }, { status: 201 });
  } catch (error: any) {
    console.error('POST /api/projects error:', error);
    
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return NextResponse.json(
        { success: false, error: "Erro no servidor: Não foi possível salvar o arquivo." },
        { status: 500 }
      );
    }

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { success: false, error: "Erro de formato: Links externos inválidos" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}