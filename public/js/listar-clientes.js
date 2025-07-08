// Função pra listar clientes em formato de tabela
async function listarClientes() {
  // Pega o elemento da tabela
  const clientes = document.getElementById("clientes-cadastrados");

  // Pega os dados da API
  const response = await fetch("/api/clientes");

  // Pega os dados em formato JSON
  const data = await response.json();

  // Pega o elemento tbody e limpa
  const tbody = clientes.querySelector("tbody");
  tbody.innerHTML = "";

  // Valida se tem clientes cadastrados
  if (data.length === 0 || data.length === undefined) {
    tbody.innerHTML = `
        <tr>
          <td colspan="12" class="text-center border-2 border-gray-300 p-1 font-bold">Nenhum cliente cadastrado</td>
        </tr>
      `;
  }

  data.forEach((cliente) => {
    // Data em formato brasileiro
    let dataFormatada = new Date(cliente.dataNascimento).toLocaleDateString(
      "pt-BR"
    );

    // Cria uma linha
    const row = document.createElement("tr");

    // Adiciona class na linha
    row.classList.add("border-2", "border-gray-300", "p-2");

    // Adiciona conteudo na linha
    row.innerHTML = `
   <td class="border-2 border-gray-300 p-1">${cliente.nome}</td>
  <td class="border-2 border-gray-300 p-1">${cliente.cpf_cnpj}</td>
  <td class="border-2 border-gray-300 p-1">${dataFormatada}</td>
  <td class="border-2 border-gray-300 p-1">${cliente.email || "-"}</td>
  <td class="border-2 border-gray-300 p-1">${
    cliente.telefone_celular || "-"
  }</td>
  <td class="border-2 border-gray-300 p-1">${cliente.cep || "-"}</td>
  <td class="border-2 border-gray-300 p-1">${cliente.rua || "-"}</td>
  <td class="border-2 border-gray-300 p-1">${cliente.numero || "-"}</td>
  <td class="border-2 border-gray-300 p-1">${cliente.bairro || "-"}</td>
  <td class="border-2 border-gray-300 p-1">${cliente.cidade || "-"}</td>
  <td class="border-2 border-gray-300 p-1">${cliente.estado || "-"}</td>
  <td class="border-2 border-gray-300 p-1 flex gap-2 items-center justify-around">
    <button class="editar-cliente text-blue-600 hover:text-blue-800 cursor-pointer" data-id="${
      cliente.id_cliente
    }" data-name="${cliente.nome}">
      <i class="fa-solid fa-pen-to-square"></i>
    </button>
    <button class="excluir-cliente text-red-600 hover:text-red-800 cursor-pointer" data-id="${
      cliente.id_cliente
    }" data-name="${cliente.nome}">
      <i class="fa-solid fa-trash"></i>
    </button>
  </td>
    `;

    // tbody recebe a linha
    tbody.appendChild(row);
  });

  // Seleciona os botões de editar e excluir
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
          listarClientes(); // Atualiza a lista de clientes
        }
      } catch (error) {
        console.log(error);
      }
    });
  });
}

// Chama a função de abrir o menu
import { initMenuToggle } from "./menu.js";

// Ao carregar a pagina chama a função de abrir o menu e listar os clientes
document.addEventListener("DOMContentLoaded", () => {
  initMenuToggle(), listarClientes();
});
