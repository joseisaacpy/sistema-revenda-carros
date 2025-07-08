const form = document.getElementById("veiculoForm");
const msg = document.getElementById("msg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const carro = {
    modelo: document.querySelector("#modelo").value.trim(),
    marca: document.querySelector("#marca").value.trim(),
    chassi: document.querySelector("#chassi").value.trim(),
    placa: document.querySelector("#placa").value.trim(),
    ano_modelo: parseInt(document.querySelector("#ano_modelo").value),
    cor: document.querySelector("#cor").value.trim(),
    combustivel: document.querySelector("#combustivel").value,
    km: parseInt(document.querySelector("#km").value),
    valor_compra: parseFloat(document.querySelector("#valor_compra").value),
    valor_venda_sugerido: parseFloat(
      document.querySelector("#valor_venda_sugerido").value
    ),
    status_estoque: document.querySelector("#status_estoque").value,
    data_compra: document.querySelector("#data_compra").value,
  };

  try {
    const res = await fetch("/api/carros", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(carro),
    });

    const data = await res.json();
    if (res.ok) {
      msg.textContent = data.message;
      msg.classList.remove("text-red-600");
      msg.classList.add("text-green-600"); // Garante classe verde no sucesso
      form.reset();
    } else {
      msg.textContent = data.error;
      msg.classList.remove("text-green-600");
      msg.classList.add("text-red-600");
    }
  } catch (err) {
    msg.textContent = "Erro ao cadastrar carro.";
  }
});

import { initMenuToggle } from "./menu.js";

document.addEventListener("DOMContentLoaded", () => {
  initMenuToggle();
});
