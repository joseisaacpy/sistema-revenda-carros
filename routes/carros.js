// IMPORTS
import express from "express";
import db from "../database/db.js";

// CONSTANTES
const router = express.Router();

// CREATE (único Carro)
router.post("/", async (req, res) => {
  const { modelo, marca, ano, preco, status } = req.body;

  if (!modelo || !marca || !ano || !preco || !status) {
    return res
      .status(400)
      .json({ error: "Modelo, Marca, Ano, Preço e Status são obrigatórios." });
  }

  try {
    await db.query(
      "INSERT INTO carros (modelo, marca, ano_modelo, preco, status) VALUES ($1, $2, $3, $4, $5)",
      [modelo, marca, ano, preco, status]
    );
    res.status(201).json({ message: "Carro criado com sucesso." });
  } catch (error) {
    console.error("Erro ao criar Carro:", error);
    res.status(500).json({ error: "Erro ao criar Carro." });
  }
});

// CREATE (múltiplos Carros)
router.post("/array", async (req, res) => {
  const dados = Array.isArray(req.body) ? req.body : [req.body];

  try {
    for (const carro of dados) {
      const { modelo, marca, ano, preco, status } = carro;

      if (!modelo || !marca || !ano || preco === undefined || !status) {
        return res.status(400).json({
          error:
            "Modelo, Marca, Ano, Preço e Status são obrigatórios em todos os objetos.",
        });
      }

      await db.query(
        "INSERT INTO carros (modelo, marca, ano_modelo, preco, status) VALUES ($1, $2, $3, $4, $5)",
        [modelo, marca, ano, preco, status]
      );
    }

    res.status(201).json({ message: "Carros cadastrados com sucesso." });
  } catch (error) {
    console.error("Erro ao cadastrar Carros em lote:", error);
    res.status(500).json({ error: "Erro ao cadastrar Carros." });
  }
});

// READ (todos)
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM carros");
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Nenhum Carro encontrado." });
    }
    res.json(result.rows);
  } catch (error) {
    console.error("Erro ao buscar Carros:", error);
    res.status(500).json({ error: "Erro ao buscar Carros." });
  }
});

// READ (por ID)
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("SELECT * FROM carros WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Carro não encontrado." });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Erro ao buscar Carro:", error);
    res.status(500).json({ error: "Erro ao buscar Carro." });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { modelo, marca, ano, preco, status } = req.body;

  try {
    const result = await db.query(
      "UPDATE carros SET modelo = $1, marca = $2, ano_modelo = $3, preco = $4, status = $5 WHERE id = $6",
      [modelo, marca, ano, preco, status, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Carro não encontrado." });
    }

    res.json({ message: "Carro atualizado com sucesso." });
  } catch (error) {
    console.error("Erro ao atualizar Carro:", error);
    res.status(500).json({ error: "Erro ao atualizar Carro." });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query("DELETE FROM carros WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Carro não encontrado." });
    }

    res.json({ message: "Carro deletado com sucesso." });
  } catch (error) {
    console.error("Erro ao deletar Carro:", error);
    res.status(500).json({ error: "Erro ao deletar Carro." });
  }
});

export default router;
