async function carregarDashboard() {
  try {
    // Total de clientes
    const clientesRes = await fetch("/api/clientes");
    const clientes = await clientesRes.json();
    document.getElementById("total-clientes").textContent = clientes.length;

    // Veículos disponíveis
    const veiculosRes = await fetch("/api/veiculos");
    const veiculos = await veiculosRes.json();
    const disponiveis = veiculos.filter(
      (v) => v.status === "Disponivel"
    ).length;
    const vendidos = veiculos.filter((v) => v.status === "Indisponivel").length;

    document.getElementById("veiculos-disponiveis").textContent = disponiveis;
    document.getElementById("veiculos-vendidos").textContent = vendidos;

    // Última venda (vai depender da sua entidade venda)
    const vendasRes = await fetch("/api/vendas");
    const vendas = await vendasRes.json();

    if (vendas.length > 0) {
      const ultima = vendas[vendas.length - 1];
      document.getElementById("ultima-venda").textContent = `${new Date(
        ultima.data
      ).toLocaleDateString("pt-BR")}`;
    }
  } catch (err) {
    console.error("Erro ao carregar dados do dashboard", err);
  }
}

// Chama a função de abrir o menu
import { initMenuToggle } from "./menu.js";

// Ao carregar a pagina chama a função de abrir o menu e de carregar dados do dashboard
document.addEventListener("DOMContentLoaded", () => {
  initMenuToggle(), carregarDashboard();
});
