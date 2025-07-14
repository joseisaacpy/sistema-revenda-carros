// Importa o pg
import pg from "pg";
// Importa o módulo dotenv
import dotenv from "dotenv";
// Configura o dotenv
dotenv.config();

// Instancia o Postgre
const { Pool } = pg;
// Cria o pool
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl:
//     process.env.NODE_ENV === "production"
//       ? { rejectUnauthorized: false }
//       : false,
// });
//
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

// Exporta o banco
export default pool;
