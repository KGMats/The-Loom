import { NextResponse } from \'next/server\';
import { allQuery, runQuery, getQuery } from \'../../../database.js\';
import { writeFile, mkdir } from \'fs/promises\';
import path from \'path\';
import { existsSync } from \'fs\';

// Função para criar um slug a partir de um texto
function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, \'-\')           // Substitui espaços por -
    .replace(/[^\w\-]+/g, \'\')       // Remove caracteres inválidos
    .replace(/\-\-+/g, \'-\');      // Remove hífens duplicados
}

interface Project {
  id: number;
  title: string;
  slug: string; // Adicionado
  description: string;
  type: \'IA\' | \'GRAFICA\';
  price: number;
  wallet_address: string;
  status: \'PENDING\' | \'WORKING\' | \'COMPLETED\';
  progress: number;
  created_at: string;
  cloud_link?: string;
  script_path?: string;
  external_links?: string;
  attachment_info?: string;
}

const isValidWalletAddress = (address: string) => /^0x[a-fA-F0-9]{40}$/.test(address);

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

export async function GET() {
  try {
    const projects = await allQuery(\'SELECT * FROM projects ORDER BY id DESC\');
    const parsedProjects = projects.map(parseProject);
    return NextResponse.json({ success: true, projects: parsedProjects });
  } catch (error: any) {
    console.error(\'GET /api/projects error:\', error);
    return NextResponse.json({ success: false, error: \'Erro ao carregar projetos\' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    
    const title = data.get(\'title\') as string;
    const description = data.get(\'description\') as string;
    const type = data.get(\'type\') as \'IA\' | \'GRAFICA\';
    const price = parseFloat(data.get(\'price\') as string);
    const wallet_address = data.get(\'wallet_address\') as string;
    const cloud_link = data.get(\'cloud_link\') as string;
    
    const externalLinksStr = data.get(\'external_links\');
    const external_links = externalLinksStr ? JSON.parse(externalLinksStr as string) : [];
    const attachment_info = data.get(\'attachment_info\') as string;
    
    const file = data.get(\'script_file\') as File | null;

    if (!title || !type || !price) {
      return NextResponse.json({ success: false, error: \'Campos obrigatórios faltando\' }, { status: 400 });
    }
    if (type !== \'IA\' && type !== \'GRAFICA\') {
      return NextResponse.json({ success: false, error: \'Tipo inválido. Use "IA" ou "GRAFICA"\' }, { status: 400 });
    }
    if (wallet_address && !isValidWalletAddress(wallet_address)) {
      return NextResponse.json({ success: false, error: \'Endereço de carteira inválido\' }, { status: 400 });
    }

    const slug = slugify(title);

    let scriptPath: string | null = null;
    if (file) {
      const uploadsDir = path.join(process.cwd(), \'public\', \'uploads\');
      if (!existsSync(uploadsDir)) {
        await mkdir(uploadsDir, { recursive: true });
      }
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, \'_\')}`;\n      const filePath = path.join(uploadsDir, filename);
      await writeFile(filePath, uint8Array);
      scriptPath = `/uploads/${filename}`;
    }

    const now = new Date().toISOString();
    let result: any;
    try {
      result = await runQuery(
        `INSERT INTO projects (
          title, slug, description, type, price, wallet_address,
          status, progress, created_at, cloud_link, script_path,
          external_links, attachment_info
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          title.trim(),
          slug,
          description || \'\',
          type,
          price,
          wallet_address || \'\',
          \'PENDING\',
          0,
          now,
          cloud_link || null,
          scriptPath,
          JSON.stringify(external_links),
          attachment_info || null
        ]
      );
    } catch (dbError: any) {
      if (dbError.code === \'SQLITE_CONSTRAINT\' && dbError.message.includes(\'UNIQUE constraint failed: projects.slug\')) {
        return NextResponse.json(
          { success: false, error: `O título "${title}" já foi usado. Por favor, escolha um título único.` },
          { status: 409 } // 409 Conflict
        );
      }
      // Re-throw para o catch principal
      throw dbError;
    }

    const inserted = await getQuery(\'SELECT * FROM projects WHERE id = ?\', [result.lastID]);
    return NextResponse.json({ success: true, project: parseProject(inserted) }, { status: 201 });

  } catch (error: any) {
    console.error(\'POST /api/projects error:\', error);
    
    if ((error as NodeJS.ErrnoException).code === \'ENOENT\') {
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
      { success: false, error: \'Erro interno do servidor\' },
      { status: 500 }
    );
  }
}