async function carregarDashboard() {
  try {
    // Faz uma requisição para todas as APIs
    const [clientesRes, carrosRes, vendasRes] = await Promise.all([
      fetch("/api/clientes"),
      fetch("/api/carros"),
      fetch("/api/vendas"),
    ]);

    // Pega o json de cada requisição
    const [clientes, carros, vendas] = await Promise.all([
      clientesRes.json(),
      carrosRes.json(),
      vendasRes.json(),
    ]);

    // Total de clientes
    const totalClientes = clientes?.length || 0;
    document.getElementById("total-clientes").textContent = totalClientes;

    // Veículos
    const status = carros?.reduce(
      (acc, carro) => {
        if (carro.status_estoque === "Estoque") acc.disponiveis++;
        else if (carro.status_estoque === "Vendido") acc.vendidos++;
        return acc;
      },
      { disponiveis: 0, vendidos: 0 }
    );

    document.getElementById("veiculos-disponiveis").textContent =
      status.disponiveis;
    document.getElementById("veiculos-vendidos").textContent = status.vendidos;

    // Última venda
    if (vendas?.length > 0) {
      const ultimaVenda = vendas[vendas.length - 1];
      const dataFormatada = new Date(ultimaVenda.data).toLocaleDateString(
        "pt-BR"
      );
      document.getElementById("ultima-venda").textContent = dataFormatada;
    }
  } catch (err) {
    console.error("Erro ao carregar dados do dashboard:", err);
  }
}

// Chama a função de abrir o menu
import { initMenuToggle } from "./menu.js";

// Ao carregar a pagina chama a função de abrir o menu e de carregar dados do dashboard
document.addEventListener("DOMContentLoaded", () => {
  initMenuToggle(), carregarDashboard();
});
