// Scripts de migração do banco
import fs from 'fs';
import path from 'path';
import { runQuery, testConnection } from '../lib/database/database';

interface MigrationFile {
  filename: string;
  version: number;
  description: string;
  sql: string;
}

const MIGRATIONS_DIR = path.join(__dirname, '../lib/database/migrations');

// Lista das migrações em ordem
const MIGRATIONS = [
  {
    version: 1,
    filename: '001_initial.sql',
    description: 'Schema inicial para hackathon',
  },
  {
    version: 2,
    filename: '002_expand_for_gpu.sql', 
    description: 'Expansão para marketplace de GPU',
  },
  {
    version: 3,
    filename: '003_blockchain.sql',
    description: 'Integração blockchain ready',
  },
];

const loadMigrationFile = (filename: string): string => {
  const filePath = path.join(MIGRATIONS_DIR, filename);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Migration file not found: ${filename}`);
  }
  return fs.readFileSync(filePath, 'utf8');
};

const createMigrationsTable = async (): Promise<void> => {
  const sql = `
    CREATE TABLE IF NOT EXISTS _migrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      version INTEGER UNIQUE NOT NULL,
      filename TEXT NOT NULL,
      description TEXT,
      applied_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;
  await runQuery(sql);
};

const getAppliedMigrations = async (): Promise<number[]> => {
  const result = await runQuery('SELECT version FROM _migrations ORDER BY version');
  // runQuery returns { lastID, changes }, we need to query differently
  const { allQuery } = await import('../lib/database/database');
  const rows = await allQuery('SELECT version FROM _migrations ORDER BY version');
  return rows.map(row => row.version);
};

const applyMigration = async (migration: MigrationFile): Promise<void> => {
  try {
    console.log(`🔄 Applying migration ${migration.version}: ${migration.description}`);
    await runQuery(migration.sql);
    await runQuery(
      'INSERT INTO _migrations (version, filename, description) VALUES (?, ?, ?)',
      [migration.version, migration.filename, migration.description]
    );
    console.log(`✅ Migration ${migration.version} applied successfully`);
  } catch (error) {
    console.error(`❌ Failed to apply migration ${migration.version}:`, error);
    throw error;
  }
};

const runMigrations = async (targetVersion?: number): Promise<void> => {
  try {
    // Test database connection
    const isConnected = await testConnection();
    if (!isConnected) {
      throw new Error('Database connection failed');
    }

    // Create migrations table if it doesn't exist
    await createMigrationsTable();

    // Get already applied migrations
    const appliedMigrations = await getAppliedMigrations();
    const latestApplied = Math.max(...appliedMigrations, 0);

    // Determine which migrations to run
    const migrationsToRun = MIGRATIONS.filter(m => {
      if (targetVersion && m.version > targetVersion) return false;
      return m.version > latestApplied;
    });

    if (migrationsToRun.length === 0) {
      console.log('ℹ️ No migrations to apply. Database is up to date.');
      return;
    }

    console.log(`🚀 Running ${migrationsToRun.length} migration(s)...`);

    // Apply migrations sequentially
    for (const migrationInfo of migrationsToRun) {
      const sql = loadMigrationFile(migrationInfo.filename);
      const migration: MigrationFile = {
        ...migrationInfo,
        sql,
      };
      await applyMigration(migration);
    }

    console.log('🎉 All migrations applied successfully!');
  } catch (error) {
    console.error('💥 Migration process failed:', error);
    throw error;
  }
};

const rollbackMigration = async (version: number): Promise<void> => {
  try {
    console.log(`🔙 Rolling back migration ${version}...`);
    
    // Note: SQLite doesn't support easy rollback for schema changes
    // This is a simplified version - in production you'd want proper rollback scripts
    await runQuery('DELETE FROM _migrations WHERE version = ?', [version]);
    
    console.log(`✅ Migration ${version} rolled back`);
  } catch (error) {
    console.error(`❌ Failed to rollback migration ${version}:`, error);
    throw error;
  }
};

const getMigrationStatus = async (): Promise<void> => {
  try {
    const { allQuery } = await import('../lib/database/database');
    const appliedMigrations = await allQuery(
      'SELECT version, filename, description, applied_at FROM _migrations ORDER BY version'
    );
    
    console.log('📊 Migration Status:');
    console.log('==================');
    
    if (appliedMigrations.length === 0) {
      console.log('No migrations applied yet.');
    } else {
      appliedMigrations.forEach((migration: any) => {
        console.log(
          `v${migration.version} - ${migration.description} (${migration.filename}) - Applied: ${migration.applied_at}`
        );
      });
    }

    // Show available migrations
    console.log('\n📋 Available Migrations:');
    console.log('========================');
    MIGRATIONS.forEach(migration => {
      const isApplied = appliedMigrations.some((a: any) => a.version === migration.version);
      console.log(`v${migration.version} - ${migration.description} - ${isApplied ? '✅ Applied' : '⏳ Pending'}`);
    });
  } catch (error) {
    console.error('❌ Failed to get migration status:', error);
  }
};

// CLI interface
if (require.main === module) {
  const command = process.argv[2];
  const version = process.argv[3];

  switch (command) {
    case 'up':
      runMigrations(version ? parseInt(version) : undefined)
        .then(() => process.exit(0))
        .catch((error) => {
          console.error(error);
          process.exit(1);
        });
      break;

    case 'down':
      if (!version) {
        console.error('Please specify version to rollback: npm run db:rollback -- 2');
        process.exit(1);
      }
      rollbackMigration(parseInt(version))
        .then(() => process.exit(0))
        .catch((error) => {
          console.error(error);
          process.exit(1);
        });
      break;

    case 'status':
      getMigrationStatus()
        .then(() => process.exit(0))
        .catch((error) => {
          console.error(error);
          process.exit(1);
        });
      break;

    default:
      console.log(`
Usage: npm run db:migrate [command] [version]

Commands:
  up [version]    - Run migrations up to version (or all)
  down [version]  - Rollback to version
  status          - Show migration status

Examples:
  npm run db:migrate up         # Run all pending migrations
  npm run db:migrate up 2       # Run migrations up to version 2
  npm run db:migrate down 1     # Rollback to version 1
  npm run db:migrate status     # Show current status
      `);
      process.exit(0);
  }
}

export { 
  runMigrations, 
  rollbackMigration, 
  getMigrationStatus, 
  loadMigrationFile 
};