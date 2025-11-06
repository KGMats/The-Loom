export interface Project {
  id: string;
  name: string;
  valor: number;
  type: 'entrada' | 'saida';
}

export interface DatabaseResult {
  changes?: number;
  lastID?: number;
}