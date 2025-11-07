

import sqlite3 from 'sqlite3';

const verboseSqlite = sqlite3.verbose();
const DB_FILE = './the-loom-hackathon.db'; 

// Esta função vai popular nossos dados de demonstração
const seedDatabase = (db) => {
  const demoProjects = [
    {
      title: 'Treinamento de Modelo CNN (Demo)',
      description: 'Treinamento de rede neural para classificação de imagens médicas.',
      type: 'IA',
      price: 2.5,
      wallet_address: '0x1234567890123456789012345678901234567890',
      status: 'PENDING',
      progress: 0,
      cloud_link: 'http://example.com/datasets/cnn-med-images.zip', 
      script_path: '/demo/cnn-script.py'
    },
    {
      title: 'Renderização 3D - Arquitetura (Demo)',
      description: 'Renderização fotorrealística de projeto arquitetônico.',
      type: 'GRAFICA',
      price: 0.8,
      wallet_address: '0xabcdef123456789012345678901234567890abcd',
      status: 'PENDING',
      progress: 0,
      cloud_link: 'http://example.com/datasets/arch-viz.zip', 
      script_path: '/demo/render-script.py'
    },
    {
      title: 'Fine-tuning GPT (Demo)',
      description: 'Ajuste fino de modelo de linguagem para análise de sentimentos.',
      type: 'IA',
      price: 1.2,
      wallet_address: '0xfedcba0987654321098765432109876543210fed',
      status: 'PENDING',
      progress: 0,
      cloud_link: 'http://example.com/datasets/sentiment-data.json', 
      script_path: '/demo/finetune-script.py'
    }
  ];

  console.log('Banco de dados vazio. Populando com dados de demonstração...');
  const stmt = db.prepare(`
    INSERT INTO projects (title, description, type, price, wallet_address, status, progress, created_at, cloud_link, script_path) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  demoProjects.forEach(p => {
    stmt.run(
      p.title, p.description, p.type, p.price, p.wallet_address,
      p.status, p.progress, new Date().toISOString(),
      p.cloud_link || null,
      p.script_path || null
    );
  });
  
  stmt.finalize();
};

const db = new verboseSqlite.Database(DB_FILE, (err) => {
  if (err) return console.error('Erro ao conectar ao banco de dados:', err.message);
  console.log('Conectado ao banco de dados SQLite.');

  db.serialize(() => {
    // Tabela principal de projetos
    db.run(`CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL, 
      description TEXT,
      type TEXT NOT NULL CHECK(type IN ('IA', 'GRAFICA')),
      price REAL NOT NULL,
      wallet_address TEXT,
      status TEXT DEFAULT 'PENDING' NOT NULL,
      progress INTEGER DEFAULT 0 NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      cloud_link TEXT,
      script_path TEXT,
      external_links TEXT,
      attachment_info TEXT
    )`);

    // Nova tabela para gerenciar slugs temporários
    db.run(`CREATE TABLE IF NOT EXISTS job_claims (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      project_id INTEGER NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      expires_at DATETIME NOT NULL,
      FOREIGN KEY(project_id) REFERENCES projects(id) ON DELETE CASCADE
    )`);

    // Limpa slugs expirados ao iniciar (boa prática)
    db.run(`DELETE FROM job_claims WHERE expires_at < CURRENT_TIMESTAMP`);

    // Popula o banco de dados se estiver vazio
    db.get('SELECT COUNT(*) as count FROM projects', (err, row) => {
      if (err) return console.error('Erro ao contar projetos:', err.message);
      
      if (row.count === 0) {
        seedDatabase(db);
      } else {
        console.log('Banco de dados já contém dados. Povoamento ignorado.');
      }
    });
  });
});

// --- Funções de Query para a API ---
export const runQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
};

export const getQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
};

export const allQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
};