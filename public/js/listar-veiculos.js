async function listarVeiculos() {
  const veiculos = document.getElementById("veiculos-cadastrados");
  const response = await fetch("/api/veiculos");
  const data = await response.json();
  const tbody = veiculos.querySelector("tbody");
  tbody.innerHTML = "";
  // Lista dos veículos em formato de tabela
  data.forEach((veiculo) => {
    const row = document.createElement("tr");
    row.classList.add("border-2", "border-gray-300", "p-2");
    row.innerHTML = `
    <td class="border-2 border-gray-300 p-1">${veiculo.modelo}</td>
    <td class="border-2 border-gray-300 p-1">${veiculo.marca}</td>
    <td class="border-2 border-gray-300 p-1">${veiculo.ano}</td>
    <td class="border-2 border-gray-300 p-1">${veiculo.preco}</td>
        <td class="border-2 border-gray-300 p-1 flex gap-2 items-center justify-around">
  <button class="editar-veiculo text-blue-600 hover:text-blue-800 cursor-pointer" data-id="${veiculo.id}" data-name="${veiculo.modelo}"><i class="fa-solid fa-pen-to-square"></i></button>
  <button class="excluir-veiculo text-red-600 hover:text-red-800 cursor-pointer" data-id="${veiculo.id}" data-name="${veiculo.modelo}"><i class="fa-solid fa-trash"></i></button>
</td>
    `;
    tbody.appendChild(row);
  });

  // seleciona os botões de editar e excluir
  const editarVeiculos = document.querySelectorAll(".editar-veiculo");
  const excluirVeiculos = document.querySelectorAll(".excluir-veiculo");

  excluirVeiculos.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const id = btn.dataset.id;
      const name = btn.dataset.name;

      const confirm = window.confirm(
        `Tem certeza que deseja excluir o veículo ${name}?`
      );

      if (!confirm) return;

      try {
        const response = await fetch(`/api/veiculos/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          listarVeiculos(); // atualiza a lista de clientes
        }
      } catch (error) {
        console.log(error);
      }
    });
  });
}
import { initMenuToggle } from "./menu.js";

document.addEventListener("DOMContentLoaded", () => {
  initMenuToggle();
});

listarVeiculos();
