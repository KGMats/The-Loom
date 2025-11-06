const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Erro ao abrir o banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite.');
    db.run(`CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      valor INTEGER NOT NULL,
      type TEXT NOT NULL CHECK(type IN ('grafica', 'IA')) 
    )`);
    // ↑↑↑ A MUDANÇA ESTÁ AQUI ↑↑↑
  }
});

module.exports = db;