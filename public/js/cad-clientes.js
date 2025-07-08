const form = document.getElementById("clienteForm");
const msg = document.getElementById("msg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Coleta de dados do formulário
  const cliente = {
    nome: document.getElementById("nome").value.trim(),
    cpf: document.getElementById("cpf").value.trim(),
    dataNascimento: document.getElementById("data-nasc").value,
    email: document.getElementById("email").value.trim(),
    telefone: document.getElementById("telefone").value.trim(),
    cep: document.getElementById("cep").value.trim(),
    rua: document.getElementById("rua").value.trim(),
    numero: document.getElementById("numero").value.trim(),
    bairro: document.getElementById("bairro").value.trim(),
    cidade: document.getElementById("cidade").value.trim(),
    estado: document.getElementById("estado").value.trim().toUpperCase(), // ex: SP
  };

  try {
    const res = await fetch("/api/clientes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cliente),
    });

    const data = await res.json();

    if (res.ok) {
      msg.textContent = data.message || "Cliente cadastrado com sucesso.";
      msg.classList.remove("text-red-600");
      msg.classList.add("text-green-600");
      form.reset();
    } else {
      msg.textContent = data.error || "Erro ao cadastrar cliente.";
      msg.classList.remove("text-green-600");
      msg.classList.add("text-red-600");
    }
  } catch (err) {
    console.error("Erro na requisição:", err);
    msg.textContent = "Erro de conexão com o servidor.";
    msg.classList.remove("text-green-600");
    msg.classList.add("text-red-600");
  }
});

// Importa e ativa o menu
import { initMenuToggle } from "./menu.js";

document.addEventListener("DOMContentLoaded", () => {
  initMenuToggle();
});
