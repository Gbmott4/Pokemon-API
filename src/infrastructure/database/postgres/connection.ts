import 'dotenv/config';
import { Pool } from 'pg';

//console.log('DATABASE_URL definida:', Boolean(process.env.DATABASE_URL));

export const postgresPool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

postgresPool.on('connect', () => {
  console.log(
    '🐘 [database]: Conexão com o PostgreSQL estabelecida com sucesso!',
  );
});

postgresPool.on('error', (err) => {
  console.error('💥 [database]: Erro inesperado no pool do PostgreSQL:', err);
});
