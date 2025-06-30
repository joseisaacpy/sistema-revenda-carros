async function listarVeiculos() {
  const veiculos = document.getElementById("veiculos-cadastrados");
  const response = await fetch("/api/veiculos");
  const data = await response.json();
  data.forEach((veiculo) => {
    const li = document.createElement("li");
    li.innerHTML = `
          <div class="bg-white shadow-md p-4 rounded-md border border-gray-200">
            <p class="text-lg font-semibold">Modelo: ${veiculo.modelo}</p>
            <p class="text-lg font-semibold">Marca: ${veiculo.marca}</p>
            <p class="text-lg font-semibold">Ano de Fabricação: ${veiculo.ano}</p>
            <p class="text-lg font-semibold">Preço (R$): ${veiculo.preco}</p>
            <div class="mt-4 space-x-2">
              <button data-id="${veiculo.id}" data-name="${veiculo.modelo}" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Editar</button>
              <button data-id="${veiculo.id}" data-name="${veiculo.modelo}" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Excluir</button>
            </div>
          </div>
        `;
    veiculos.appendChild(li);
  });
}
import { initMenuToggle } from "./menu.js";

document.addEventListener("DOMContentLoaded", () => {
  initMenuToggle();
});

listarVeiculos();
