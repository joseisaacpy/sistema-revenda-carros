// IMPORTS

import express from "express";
import db from "../database/db.js";

// CONSTANTES
const router = express.Router();

// Create
router.post("/", (req, res) => {
  const { cliente_id, veiculo_id } = req.body;

  if (!cliente_id || !veiculo_id) {
    return res
      .status(400)
      .json({ error: "cliente_id e veiculo_id são obrigatórios." });
  }

  // Cria a venda
  const insertVenda = db.prepare(
    "INSERT INTO vendas (cliente_id, veiculo_id) VALUES (?, ?)"
  );
  insertVenda.run(cliente_id, veiculo_id);

  // Atualiza o veículo
  const updateVeiculo = db.prepare(
    "UPDATE veiculos SET status = 'Indisponivel', cliente_id = ? WHERE id = ?"
  );
  updateVeiculo.run(cliente_id, veiculo_id);

  res.status(201).json({ message: "Venda registrada com sucesso." });
});

export default router;
