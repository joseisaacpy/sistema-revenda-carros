// Importa o pg
import pg from "pg";
// Importa o módulo dotenv
import dotenv from "dotenv";
// Configura o dotenv
dotenv.config();

// Instancia o Postgre
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

// Função para conectar ao banco de dados
const conectarDB = async () => {
  try {
    await pool.connect();
    console.log("Conexão com o banco de dados estabelecida com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
  }
};

// Chama a função para conectar ao banco de dados
conectarDB();

// Exporta o banco
export default pool;
