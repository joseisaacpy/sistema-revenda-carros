// função pra listar clientes em formato de tabela
async function listarClientes() {
  const clientes = document.getElementById("clientes-cadastrados");
  const response = await fetch("/api/clientes");
  const data = await response.json();
  const tbody = clientes.querySelector("tbody");
  // limpa o conteudo da tabela
  tbody.innerHTML = ""; // limpa a tabela antes de preencher

  data.forEach((cliente) => {
    // data em formato brasileiro
    let dataFormatada = new Date(cliente.dataNascimento).toLocaleDateString(
      "pt-BR"
    );
    // cria uma linha
    const row = document.createElement("tr");
    // adiciona class na linha
    row.classList.add("border-2", "border-gray-300", "p-2");
    // adiciona conteudo na linha
    row.innerHTML = `
    <td class="border-2 border-gray-300 p-1">${cliente.nome}</td>
    <td class="border-2 border-gray-300 p-1">${cliente.cpf}</td>
    <td class="border-2 border-gray-300 p-1">${dataFormatada}</td>
    <td class="border-2 border-gray-300 p-1">${cliente.email}</td>
    <td class="border-2 border-gray-300 p-1">${cliente.telefone}</td>
    <td class="border-2 border-gray-300 p-1 flex gap-2 items-center justify-around">
  <button class="editar-cliente text-blue-600 hover:text-blue-800 cursor-pointer" data-id="${cliente.id}" data-name="${cliente.nome}"><i class="fa-solid fa-pen-to-square"></i></button>
  <button class="excluir-cliente text-red-600 hover:text-red-800 cursor-pointer" data-id="${cliente.id}" data-name="${cliente.nome}"><i class="fa-solid fa-trash"></i></button>
</td>
    `;
    // tbody recebe a linha
    tbody.appendChild(row);
  });

  // seleciona os botões de editar e excluir
  const editarClientes = document.querySelectorAll(".editar-cliente");
  const excluirClientes = document.querySelectorAll(".excluir-cliente");

  excluirClientes.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const id = btn.dataset.id;
      const name = btn.dataset.name;

      const confirm = window.confirm(
        `Tem certeza que deseja excluir o cliente ${name}?`
      );

      if (!confirm) return;

      try {
        const response = await fetch(`/api/clientes/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          listarClientes(); // atualiza a lista de clientes
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

listarClientes();
