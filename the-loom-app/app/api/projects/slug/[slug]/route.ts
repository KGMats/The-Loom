import { NextResponse } from 'next/server';
import { getQuery } from '../../../../database';

// Função helper para parsear campos que são JSON strings
function parseProject(project: any) {
  if (project.external_links) {
    try {
      project.external_links = JSON.parse(project.external_links);
    } catch (e) {
      console.warn(`Aviso: Falha ao parsear external_links para o projeto slug=${project.slug}`);
      project.external_links = []; // Retorna um array vazio em caso de erro
    }
  }
  return project;
}

// GET /api/projects/slug/[slug] - busca um projeto pelo seu slug
export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug;

    if (!slug) {
      return NextResponse.json({ success: false, error: 'Slug não fornecido' }, { status: 400 });
    }

    const project = await getQuery('SELECT * FROM projects WHERE slug = ?', [slug]);

    if (!project) {
      return NextResponse.json({ success: false, error: 'Projeto não encontrado' }, { status: 404 });
    }

    // Parsear os campos JSON antes de retornar
    const parsedProject = parseProject(project);

    return NextResponse.json({ success: true, project: parsedProject });

  } catch (error: any) {
    console.error(`GET /api/projects/slug/[slug] error:`, error);
    return NextResponse.json({ success: false, error: 'Erro ao buscar projeto' }, { status: 500 });
  }
}
