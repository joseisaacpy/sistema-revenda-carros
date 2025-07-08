// IMPORTS

import express from "express";
import db from "../database/db.js";

// CONSTANTES
const router = express.Router();

// Create
router.post("/", async (req, res) => {
  // Pega os IDs do cliente e do carro
  const {
    clienteId,
    carroId,
    dataVenda,
    valorFinalVenda,
    metodoPagamento,
    obsVenda,
  } = req.body;
  const data_venda = dataVenda ?? new Date().toISOString().split("T")[0];

  try {
    const result = await db.query(
      "INSERT INTO vendas (id_cliente, id_carro, data_venda, valor_final_venda, metodo_pagamento,observacoes_venda) VALUES ($1, $2, $3,$4,$5,$6) RETURNING *",
      [
        clienteId,
        carroId,
        data_venda,
        valorFinalVenda,
        metodoPagamento,
        obsVenda,
      ]
    );
    res.json({
      message: "Venda criada com sucesso.",
      venda: result.rows[0],
    });
  } catch (error) {
    console.error("Erro ao criar a venda", error);
    res.status(500).json({ error: "Erro ao criar a venda." });
  }
});

// Read todos
router.get("/", async (req, res) => {
  try {
    const vendas = await db.query("SELECT * FROM vendas");
    res.json(vendas.rows);
  } catch (error) {
    console.error("Erro ao buscar as vendas", error);
    res.status(500).json({ error: "Erro ao buscar as vendas." });
  }
});

export default router;
