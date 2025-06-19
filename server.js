// IMPORTS
import express from "express";
import db from "./database/db.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import clientesRoutes from "./routes/clientes.js";
import veiculosRoutes from "./routes/veiculos.js";

// CONSTANTES
const port = 3000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// MIDDLEWARES
app.use(express.json());
app.use(express.static(join(__dirname, "public")));

// ROTAS DE PÁGINAS
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "views", "index.html"));
});
app.get("/cad-clientes", (req, res) => {
  res.sendFile(join(__dirname, "views", "cad-clientes.html"));
});
app.get("/cad-veiculos", (req, res) => {
  res.sendFile(join(__dirname, "views", "cad-veiculos.html"));
});
app.get("/listar-clientes", (req, res) => {
  res.sendFile(join(__dirname, "views", "listar-clientes.html"));
});
app.get("/listar-veiculos", (req, res) => {
  res.sendFile(join(__dirname, "views", "listar-veiculos.html"));
});

// ROTAS DE API
app.use("/api/clientes", clientesRoutes);
app.use("/api/veiculos", veiculosRoutes);

// OUVINTE
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
