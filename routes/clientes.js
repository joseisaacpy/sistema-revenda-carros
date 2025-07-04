// IMPORTS

import express from "express";
import db from "../database/db.js";

// CONSTANTES
const router = express.Router();

// Create
router.post("/", async (req, res) => {
  const { nome, cpf, dataNascimento, email, telefone } = req.body;
  if (!nome || !cpf || !telefone) {
    return res.status(400).json({
      error: "Nome, CPF e Telefone são obrigatórios.",
    });
  }
  try {
    await db.query(
      `INSERT INTO clientes (nome, cpf, dataNascimento, email, telefone) VALUES ($1, $2, $3, $4, $5)`,
      [nome, cpf, dataNascimento, email, telefone]
    );
    res.status(201).json({ message: "Cliente criado com sucesso." });
  } catch (error) {
    console.error("Erro ao criar o cliente:", error);
    res.status(500).json({ error: "Erro ao criar o cliente." });
  }
});

// Read todos
router.get("/", async (req, res) => {
  try {
    const clientes = await db.query("SELECT * FROM clientes");
    res.json(clientes.rows);
  } catch (error) {
    console.error("Erro ao buscar os clientes", error);
    res.status(500).json({ error: "Erro ao buscar os clientes." });
  }
});

// Read por ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await db.query("SELECT * FROM clientes WHERE id=$1", [id]);
    // Validação de cliente
    if (cliente.rows.length === 0) {
      return res.status(404).json({ error: "Cliente nao encontrado." });
    }
    res.json(cliente.rows[0]); // Retorna apenas o cliente encontrado
  } catch (error) {
    console.error("Erro ao buscar o cliente", error);
    res.status(500).json({ error: "Erro ao buscar o cliente." });
  }
});

// Update
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, cpf, dataNascimento, email, telefone } = req.body;
    const result = await db.query(
      "UPDATE clientes SET nome=$1, cpf=$2, dataNascimento=$3, email=$4, telefone=$5 WHERE id=$6",
      [nome, cpf, dataNascimento, email, telefone, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Cliente nao encontrado." });
    }
    res.json({ message: "Cliente atualizado com sucesso." });
  } catch (error) {
    console.error("Erro ao atualizar o cliente", error);
    res.status(500).json({ error: "Erro ao atualizar o cliente." });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query("DELETE FROM clientes WHERE id = $1", [id]);
    res.json({ message: "Cliente deletado com sucesso." });
    // Valida se o cliente foi deletado
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Cliente não encontrado." });
    }
  } catch (error) {
    console.error("Erro ao deletar o cliente", error);
    res.status(500).json({ error: "Erro ao deletar o cliente." });
  }
});

export default router;
