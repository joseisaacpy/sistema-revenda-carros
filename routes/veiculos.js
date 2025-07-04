// IMPORTS
import express from "express";
import db from "../database/db.js";

// CONSTANTES
const router = express.Router();

// CREATE (único veículo)
router.post("/", async (req, res) => {
  const { modelo, marca, ano, preco, status } = req.body;

  if (!modelo || !marca || !ano || !preco || !status) {
    return res
      .status(400)
      .json({ error: "Modelo, Marca, Ano, Preço e Status são obrigatórios." });
  }

  try {
    await db.query(
      "INSERT INTO veiculos (modelo, marca, ano, preco, status) VALUES ($1, $2, $3, $4, $5)",
      [modelo, marca, ano, preco, status]
    );
    res.status(201).json({ message: "Veículo criado com sucesso." });
  } catch (error) {
    console.error("Erro ao criar veículo:", error);
    res.status(500).json({ error: "Erro ao criar veículo." });
  }
});

// CREATE (múltiplos veículos)
router.post("/array", async (req, res) => {
  const dados = Array.isArray(req.body) ? req.body : [req.body];

  try {
    for (const veiculo of dados) {
      const { modelo, marca, ano, preco, status } = veiculo;

      if (!modelo || !marca || !ano || preco === undefined || !status) {
        return res.status(400).json({
          error:
            "Modelo, Marca, Ano, Preço e Status são obrigatórios em todos os objetos.",
        });
      }

      await db.query(
        "INSERT INTO veiculos (modelo, marca, ano, preco, status) VALUES ($1, $2, $3, $4, $5)",
        [modelo, marca, ano, preco, status]
      );
    }

    res.status(201).json({ message: "Veículos cadastrados com sucesso." });
  } catch (error) {
    console.error("Erro ao cadastrar veículos em lote:", error);
    res.status(500).json({ error: "Erro ao cadastrar veículos." });
  }
});

// READ (todos)
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM veiculos");
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Nenhum veículo encontrado." });
    }
    res.json(result.rows);
  } catch (error) {
    console.error("Erro ao buscar veículos:", error);
    res.status(500).json({ error: "Erro ao buscar veículos." });
  }
});

// READ (por ID)
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("SELECT * FROM veiculos WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Veículo não encontrado." });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Erro ao buscar veículo:", error);
    res.status(500).json({ error: "Erro ao buscar veículo." });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { modelo, marca, ano, preco, status } = req.body;

  try {
    const result = await db.query(
      "UPDATE veiculos SET modelo = $1, marca = $2, ano = $3, preco = $4, status = $5 WHERE id = $6",
      [modelo, marca, ano, preco, status, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Veículo não encontrado." });
    }

    res.json({ message: "Veículo atualizado com sucesso." });
  } catch (error) {
    console.error("Erro ao atualizar veículo:", error);
    res.status(500).json({ error: "Erro ao atualizar veículo." });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query("DELETE FROM veiculos WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Veículo não encontrado." });
    }

    res.json({ message: "Veículo deletado com sucesso." });
  } catch (error) {
    console.error("Erro ao deletar veículo:", error);
    res.status(500).json({ error: "Erro ao deletar veículo." });
  }
});

export default router;
