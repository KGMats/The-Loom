// database.js - MVP SIMPLIFICADO
const sqlite3 = require('sqlite3').verbose();

// Banco de dados SQLite simples
const db = new sqlite3.Database('./the-loom.db', (err) => {
  if (err) {
    console.error('Erro ao conectar no banco:', err.message);
  } else {
    console.log('✅ Conectado ao banco SQLite');
    
    // Tabela simplificada
    db.run(`CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      type TEXT NOT NULL CHECK(type IN ('IA', 'GRAFICA')),
      price REAL NOT NULL,
      wallet_address TEXT,
      status TEXT DEFAULT 'PENDING' CHECK(status IN ('PENDING', 'WORKING', 'COMPLETED')),
      progress INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Dados fictícios
    const mockData = [
      {
        title: 'Treinamento de IA para Diagnóstico Médico',
        description: 'Treinar uma CNN para detectar tumores em exames de raio-X',
        type: 'IA',
        price: 2.5,
        wallet_address: '0x742d35cc4cF9214D29a66E39E6B9E8B2b2A2c3D4E5F',
        status: 'PENDING',
        progress: 0
      },
      {
        title: 'Renderização 3D - Filme de Animação',
        description: 'Renderizar 500 frames de animação 3D para curta-metragem',
        type: 'GRAFICA',
        price: 1.8,
        wallet_address: '0x1234567890abcdef1234567890abcdef12345678',
        status: 'WORKING',
        progress: 65
      },
      {
        title: 'Processamento de Imagens Satelitais',
        description: 'Aplicar filtros NDVI em imagens de satélite da Amazônia',
        type: 'IA',
        price: 3.2,
        wallet_address: '0xabcdef1234567890abcdef1234567890abcdef12',
        status: 'COMPLETED',
        progress: 100
      },
      {
        title: 'Renderização de Arquitetura VR',
        description: 'Criar ambiente VR de um edifício sustentável',
        type: 'GRAFICA',
        price: 4.1,
        wallet_address: '0x99887766554433221199887766554433221199',
        status: 'PENDING',
        progress: 0
      },
      {
        title: 'Análise de Big Data - Marketing',
        description: 'Processar dados de 1M usuários para análise de comportamento',
        type: 'IA',
        price: 5.5,
        wallet_address: '0x5566778899aabbccddee5566778899aabbccdd',
        status: 'WORKING',
        progress: 30
      }
    ];

    // Inserir dados fictícios apenas se não existirem
    db.get('SELECT COUNT(*) as count FROM projects', (err, row) => {
      if (err) {
        console.error('Erro ao verificar projetos:', err);
      } else if (row.count === 0) {
        console.log('🚀 Inserindo dados fictícios...');
        mockData.forEach((project, index) => {
          setTimeout(() => {
            db.run(
              'INSERT INTO projects (title, description, type, price, wallet_address, status, progress) VALUES (?, ?, ?, ?, ?, ?, ?)',
              [project.title, project.description, project.type, project.price, project.wallet_address, project.status, project.progress],
              function(err) {
                if (err) {
                  console.error('Erro ao inserir projeto:', err);
                } else {
                  console.log(`✅ Projeto ${index + 1} inserido com ID: ${this.lastID}`);
                }
              }
            );
          }, index * 100);
        });
      }
    });
  }
});

// Funções auxiliares simples
function runQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
}

function getQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

function allQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

module.exports = { db, runQuery, getQuery, allQuery };