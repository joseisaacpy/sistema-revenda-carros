// IMPORTS

import express from "express";
import db from "../database/db.js";

// CONSTANTES
const router = express.Router();

// Create

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
