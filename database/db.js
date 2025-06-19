// Importa o módulo better-sqlite3
import Database from "better-sqlite3";
// Importa o módulo dotenv
import dotenv from "dotenv";
// Configura o dotenv
dotenv.config();

// Instancia o banco
const db = new Database(process.env.DATABASE_URL);

// Habilitar Foreign Keys
db.pragma("foreign_keys = ON");

// Cria a tabela de clientes
db.prepare(
  `CREATE TABLE IF NOT EXISTS clientes
  (id INTEGER PRIMARY KEY AUTOINCREMENT,
   nome TEXT NOT NULL,
   cpf TEXT NOT NULL,
   email TEXT,
   telefone TEXT NOT NULL
   );`
).run();

// Cria a tabela de veículos
db.prepare(
  `CREATE TABLE IF NOT EXISTS veiculos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    modelo TEXT NOT NULL,
    marca TEXT NOT NULL,
    ano INTEGER,
    preco REAL NOT NULL,
    status TEXT NOT NULL,
    cliente_id INTEGER,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
  );`
).run();

// Exporta o banco
export default db;
