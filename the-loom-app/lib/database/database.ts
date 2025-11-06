import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';

const DB_PATH = './database.db';

// Promise wrappers para async/await
const runQuery = (sql: string, params: any[] = []): Promise<any> => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_PATH);
    db.run(sql, params, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve({ lastID: this.lastID, changes: this.changes });
      }
    });
    db.close();
  });
};

const getQuery = (sql: string, params: any[] = []): Promise<any> => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_PATH);
    db.get(sql, params, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
    db.close();
  });
};

const allQuery = (sql: string, params: any[] = []): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_PATH);
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
    db.close();
  });
};

const closeDatabase = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_PATH);
    db.close((err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

const initDatabase = async (): Promise<void> => {
  try {
    const schemaPath = path.join(__dirname, 'schema.sql');
    if (fs.existsSync(schemaPath)) {
      const schema = fs.readFileSync(schemaPath, 'utf8');
      await runQuery(schema);
      console.log('✅ Database schema initialized');
    } else {
      console.warn('⚠️ Schema file not found, using migrations instead');
    }
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    throw error;
  }
};

// Teste de conexão
const testConnection = async (): Promise<boolean> => {
  try {
    const result = await getQuery('SELECT 1 as test');
    return result && result.test === 1;
  } catch (error) {
    console.error('❌ Database connection test failed:', error);
    return false;
  }
};

export { 
  runQuery, 
  getQuery, 
  allQuery, 
  closeDatabase, 
  initDatabase, 
  testConnection 
};

export default { 
  runQuery, 
  getQuery, 
  allQuery, 
  closeDatabase, 
  initDatabase, 
  testConnection 
};