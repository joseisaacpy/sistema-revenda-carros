// Função pra listar veículos em formato de tabela
async function listarVeiculos() {
  // Pega o elemento da tabela
  const veiculos = document.getElementById("veiculos-cadastrados");

  // Pega os dados da API
  const response = await fetch("/api/carros");

  // Pega os dados em formato JSON
  const data = await response.json();

  // Pega o elemento tbody e limpa
  const tbody = veiculos.querySelector("tbody");
  tbody.innerHTML = "";

  // Valida se tem veículos cadastrados
  if (data.length === 0 || data.length === undefined) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="text-center border-2 border-gray-300 p-1 font-bold">Nenhum veiculo cadastrado</td>
      </tr>
    `;
    return;
  }

  // Lista dos veículos em formato de tabela
  data.forEach((veiculo) => {
    const anoFabricacao = new Date(veiculo.ano).getFullYear();
    const row = document.createElement("tr");
    row.classList.add("border-2", "border-gray-300", "p-2");
    row.innerHTML = `
    <td class="border-2 border-gray-300  p-1">${veiculo.modelo}</td>
    <td class="border-2 border-gray-300 p-1">${veiculo.marca}</td>
    <td class="border-2 border-gray-300 p-1">${anoFabricacao}</td>
    <td class="border-2 border-gray-300 p-1">${Number(
      veiculo.preco
    ).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
      <td class="border-2 border-gray-300 p-1">${veiculo.status}</td>
        <td class="border-2 border-gray-300 p-1 flex gap-2 items-center justify-around">
  <button class="editar-veiculo text-blue-600 hover:text-blue-800 cursor-pointer" data-id="${
    veiculo.id_carro
  }" data-name="${
      veiculo.modelo
    }"><i class="fa-solid fa-pen-to-square"></i></button>
  <button class="excluir-veiculo text-red-600 hover:text-red-800 cursor-pointer" data-id="${
    veiculo.id_carro
  }" data-name="${veiculo.modelo}"><i class="fa-solid fa-trash"></i></button>
</td>
    `;

    // tbody recebe a linha
    tbody.appendChild(row);
  });

  // Seleciona os botões de editar e excluir
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
        const response = await fetch(`/api/carros/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          listarVeiculos(); // atualiza a lista de veiculos
        }
      } catch (error) {
        console.log(error);
      }
    });
  });
}
// Chama a função de abrir o menu
import { initMenuToggle } from "./menu.js";

// Ao carregar a pagina chama a função de abrir o menu e listar os veiculos
document.addEventListener("DOMContentLoaded", () => {
  initMenuToggle(), listarVeiculos();
});
