import express from "express";
import db from "../database/db.js";

const router = express.Router();

// Create
router.post("/", (req, res) => {
  const { modelo, marca, ano, preco, status } = req.body;
  //   Validação de campos obrigatórios
  if (!modelo || !marca || !ano || !preco || !status) {
    return res
      .status(400)
      .json({ error: "Modelo, Marca, Ano, Preco e Status são obrigatórios." });
  }
  const stmt = db.prepare(
    "INSERT INTO veiculos (modelo, marca, ano, preco, status) VALUES (?, ?, ?, ?, ?)"
  );
  stmt.run(modelo, marca, ano, preco, status);
  res.status(201).json({ message: "Veiculo criado com sucesso." });
});

// Read todos
router.get("/", (req, res) => {
  const stmt = db.prepare("SELECT * FROM veiculos");
  const veiculos = stmt.all();
  if (veiculos.length === 0) {
    return res.status(404).json({ error: "Nenhum veiculo encontrado." });
  }
  res.json(veiculos);
});

// Read por ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const stmt = db.prepare("SELECT * FROM veiculos WHERE id = ?");
  const veiculo = stmt.get(id);
  if (!veiculo) {
    return res.status(404).json({ error: "Veículo não encontrado." });
  }
  res.json(veiculo);
});

// Update
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nome, cpf, email, telefone } = req.body;
  const stmt = db.prepare(
    "UPDATE veiculos SET nome = ?, cpf = ?, email = ?, telefone = ? WHERE id = ?"
  );
  const result = stmt.run(nome, cpf, email, telefone, id);
  if (result.changes === 0) {
    return res.status(404).json({ error: "Veículo não encontrado." });
  }
  res.json({ message: "Veículo atualizado com sucesso." });
});

// Delete
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const stmt = db.prepare("DELETE FROM veiculos WHERE id = ?");
  const result = stmt.run(id);
  if (result.changes === 0) {
    return res.status(404).json({ error: "Veículo não encontrado." });
  }
  res.json({ message: "Veículo deletado com sucesso." });
});

export default router;
