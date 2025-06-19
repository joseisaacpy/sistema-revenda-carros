// IMPORTS
import express from "express";
import db from "./database/db.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// CONSTANTES
const port = 3000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// MIDDLEWARES
app.use(express.json());
app.use(express.static(join(__dirname, "public"))); // Correção aqui

// ROTAS

// Rota raiz
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "views", "index.html"));
});

// Create
app.post("/clientes", (req, res) => {
  const { nome, cpf, email, telefone } = req.body;
  // Valida se os campos de Nome, CPF e Telefone foram preenchidos
  if (!nome || !cpf || !telefone) {
    return res
      .status(400)
      .json({ error: "Os campos de Nome, CPF e Telefone são obrigatórios" });
  }
  const stmt = db.prepare(
    "INSERT INTO clientes (nome, cpf, email, telefone) VALUES (?, ?, ?, ?)"
  );
  stmt.run(nome, cpf, email, telefone);
  res.status(201).json({ message: "Cliente criado com sucesso" });
});

// Read
app.get("/clientes/:id", (req, res) => {
  const { id } = req.params;
  const stmt = db.prepare("SELECT * FROM clientes WHERE id = ?");
  const cliente = stmt.get(id);
  // Valida se o cliente existe
  if (!cliente) {
    return res.status(404).json({ error: "Cliente não encontrado" });
  }
  res.json(cliente);
});

app.get("/clientes", (req, res) => {
  const stmt = db.prepare("SELECT * FROM clientes");
  const clientes = stmt.all();
  // Valida se o array de clientes está vazio
  if (clientes.length === 0) {
    return res.status(404).json({ error: "Nenhum cliente encontrado" });
  }
  res.json(clientes);
});

// Update
app.put("/clientes/:id", (req, res) => {
  const { id } = req.params;
  const { nome, cpf, email, telefone } = req.body;
  const stmt = db.prepare(
    "UPDATE clientes SET nome = ?, cpf = ?, email = ?, telefone = ? WHERE id = ?"
  );
  stmt.run(nome, cpf, email, telefone, id);
  // Valida se o cliente existe
  if (stmt.changes === 0) {
    return res.status(404).json({ error: "Cliente não encontrado" });
  }
  res.json({ message: "Cliente atualizado com sucesso" });
});

// Delete
app.delete("/clientes/:id", (req, res) => {
  const { id } = req.params;
  const stmt = db.prepare("DELETE FROM clientes WHERE id = ?");
  const cliente = stmt.run(id);
  // Valida se o cliente existe
  if (cliente.changes === 0) {
    return res.status(404).json({ error: "Cliente não encontrado" });
  }
  res.json({ message: "Cliente deletado com sucesso" });
});
// OUVINTE
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
