import sqlite3 from 'sqlite3';

const verboseSqlite = sqlite3.verbose();
const DB_FILE = './the-loom-hackathon.db'; 

// Esta função vai popular nossos dados de demonstração
const seedDatabase = (db) => {
  // Usamos os dados de exemplo do seu arquivo seed.ts
  const demoProjects = [
    {
      title: 'Treinamento de Modelo CNN (Demo)',
      description: 'Treinamento de rede neural para classificação de imagens médicas.',
      type: 'IA',
      price: 2.5, // Simplifiquei 'valor' e 'reward_amount' para 'price'
      wallet_address: '0x1234567890123456789012345678901234567890',
      status: 'PENDING',
      progress: 0
    },
    {
      title: 'Renderização 3D - Arquitetura (Demo)',
      description: 'Renderização fotorrealística de projeto arquitetônico.',
      type: 'GRAFICA',
      price: 0.8,
      wallet_address: '0xabcdef123456789012345678901234567890abcd',
      status: 'PENDING',
      progress: 0
    },
    {
      title: 'Fine-tuning GPT (Demo)',
      description: 'Ajuste fino de modelo de linguagem para análise de sentimentos.',
      type: 'IA',
      price: 1.2,
      wallet_address: '0xfedcba0987654321098765432109876543210fed',
      status: 'PENDING',
      progress: 0
    }
  ];

  console.log('Banco de dados vazio. Populando com dados de demonstração...');
  const stmt = db.prepare(`
    INSERT INTO projects (title, description, type, price, wallet_address, status, progress, created_at) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  demoProjects.forEach(p => {
    stmt.run(
      p.title,
      p.description,
      p.type,
      p.price,
      p.wallet_address,
      p.status,
      p.progress,
      new Date().toISOString()
    );
  });
  
  stmt.finalize((err) => {
    if (err) console.error('Erro ao popular dados:', err.message);
    else console.log('✅ Banco de dados populado com 3 projetos de demonstração.');
  });
};

const db = new verboseSqlite.Database(DB_FILE, (err) => {
  if (err) {
    return console.error('Erro ao abrir o banco (MVP):', err.message);
  }
  console.log('Conectado ao SQLite (MVP).');

  // db.serialize garante que os comandos rodem em ordem (um após o outro)
  db.serialize(() => {
    // Passo 1: Criar a tabela (Substitui o migrate.ts / schema.sql)
    // Usamos os campos que o seu frontend e API esperam
    db.run(`CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL, 
      description TEXT,
      type TEXT NOT NULL CHECK(type IN ('IA', 'GRAFICA')),
      price REAL NOT NULL,
      wallet_address TEXT,
      status TEXT DEFAULT 'PENDING' NOT NULL,
      progress INTEGER DEFAULT 0 NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Passo 2: Verificar se a tabela está vazia e popular (Substitui o seed.ts)
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

// --- As 3 funções de Query para sua API ---
// (Exatamente como na resposta anterior)

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