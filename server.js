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
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "views", "index.html")); // Correção aqui
});

// OUVINTE
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
