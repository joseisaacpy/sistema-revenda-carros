// IMPORTS
import express from "express";
import db from "./database/db.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import dotenv from "dotenv";

// CONFIGURAÇÃO DO DOTENV
dotenv.config();

// IMPORTS DAS ROTAS
import clientesRoutes from "./routes/clientes.js";
import carrosRoutes from "./routes/carros.js";
import vendasRoutes from "./routes/vendas.js";
// import fornecedoresRoutes from "./routes/fornecedores.js";
// import comprasCarrosRoutes from "./routes/comprasCarros.js";

// CONSTANTES
const port = process.env.PORT || 3000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// MIDDLEWARES
app.use(express.json());
app.use(express.static(join(__dirname, "public")));

// ROTAS DE API
app.use("/api/clientes", clientesRoutes);
app.use("/api/carros", carrosRoutes);
app.use("/api/vendas", vendasRoutes);
// app.use("/api/fornecedores", fornecedoresRoutes);
// app.use("/api/compras-carros", comprasCarrosRoutes);

// ROTAS DE PÁGINAS
app.get("/", (req, res) => {
  // res.sendFile(join(__dirname, "views", "index.html"));
  res.sendFile(join(__dirname, "views", "dashboard.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(join(__dirname, "views", "login.html"));
});

app.get("/dashboard", (req, res) => {
  res.sendFile(join(__dirname, "views", "dashboard.html"));
});

app.get("/cad-clientes", (req, res) => {
  res.sendFile(join(__dirname, "views", "cad-clientes.html"));
});

app.get("/cad-carros", (req, res) => {
  res.sendFile(join(__dirname, "views", "cad-carros.html"));
});

app.get("/listar-clientes", (req, res) => {
  res.sendFile(join(__dirname, "views", "listar-clientes.html"));
});

app.get("/listar-carros", (req, res) => {
  res.sendFile(join(__dirname, "views", "listar-carros.html"));
});

// Rota 404
app.use((req, res) => {
  res.status(404).sendFile(join(__dirname, "views", "404.html"));
});

// OUVINTE
app.listen(port, "0.0.0.0", () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
