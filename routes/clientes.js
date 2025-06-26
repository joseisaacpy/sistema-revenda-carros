// IMPORTS

import express from "express";
import db from "../database/db.js";

// CONSTANTES
const router = express.Router();

// Create
router.post("/", (req, res) => {
  const { nome, cpf, dataNascimento, email, telefone } = req.body;
  if (!nome || !cpf || !telefone) {
    return res.status(400).json({
      error: "Nome, CPF e Telefone são obrigatórios.",
    });
  }
  const stmt = db.prepare(
    "INSERT INTO clientes (nome, cpf, dataNascimento, email, telefone) VALUES (?, ?, ?, ?, ?)"
  );
  stmt.run(nome, cpf, dataNascimento, email, telefone);
  res.status(201).json({ message: "Cliente criado com sucesso." });
});

// Read todos
router.get("/", (req, res) => {
  const stmt = db.prepare("SELECT * FROM clientes");
  const clientes = stmt.all();
  if (clientes.length === 0) {
    return res.status(404).json({ error: "Nenhum cliente encontrado." });
  }
  res.json(clientes);
});

// Read por ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const stmt = db.prepare("SELECT * FROM clientes WHERE id = ?");
  const cliente = stmt.get(id);
  if (!cliente) {
    return res.status(404).json({ error: "Cliente não encontrado." });
  }
  res.json(cliente);
});

// Update
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nome, cpf, dataNascimento, email, telefone } = req.body;
  const stmt = db.prepare(
    "UPDATE clientes SET nome = ?, cpf = ?,dataNascimento = ?, email = ?, telefone = ? WHERE id = ?"
  );
  const result = stmt.run(nome, cpf, dataNascimento, email, telefone, id);
  if (result.changes === 0) {
    return res.status(404).json({ error: "Cliente não encontrado." });
  }
  res.json({ message: "Cliente atualizado com sucesso." });
});

// Delete
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const stmt = db.prepare("DELETE FROM clientes WHERE id = ?");
  const result = stmt.run(id);
  if (result.changes === 0) {
    return res.status(404).json({ error: "Cliente não encontrado." });
  }
  res.json({ message: "Cliente deletado com sucesso." });
});

export default router;
