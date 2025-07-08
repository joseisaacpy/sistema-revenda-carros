// Função pra preencher os select
async function preencherSelect() {
  // Select de clientes
  const selectClientes = document.getElementById("select-clientes");

  // Limpa o select de clientes
  selectClientes.innerHTML = "";

  // Select de Carros
  const selectCarros = document.getElementById("select-carros");

  // Limpa o select de carros
  selectCarros.innerHTML = "";

  //   Requisições de busca de clientes e carros
  const [reqClientes, reqCarros] = await Promise.all([
    fetch("/api/clientes"), // Requisição de clientes
    fetch("/api/carros"), // Requisição de carros
  ]);

  //   Respostas em JSON de clientes e carros
  const [clientes, carros] = await Promise.all([
    reqClientes.json(), // JSON de clientes
    reqCarros.json(), // JSON de carros
  ]);

  //   Preenche os selects de clientes
  clientes.forEach((cliente) => {
    const option = document.createElement("option");
    option.value = cliente.id_cliente;
    option.textContent = cliente.nome;
    selectClientes.appendChild(option);
  });

  //   Preenche os selects de carros
  carros.forEach((carro) => {
    const option = document.createElement("option");
    option.value = carro.id_carro;
    option.textContent = carro.modelo;
    selectCarros.appendChild(option);
  });
}

// Formulário
const form = document.getElementById("vendaForm");

// Mensagem de retorno
const msg = document.getElementById("msg");

// Adiciona um evento de submit ao formulário
form.addEventListener("submit", async (e) => {
  // Evita o envio do formulário
  e.preventDefault();
  // Pega dados do formulário
  const clienteId = document.getElementById("select-clientes").value;

  const carroId = document.getElementById("select-carros").value;

  let dataVenda = document.getElementById("data-venda").value;

  const valorFinalVenda = document.getElementById("valor-final-venda").value;

  const metodoPagamento = document.getElementById("metodo-pagamento").value;

  const obsVenda = document.getElementById("observacao-venda").value;
  
  if (obsVenda == "") {
    obsVenda = null;
  }

  let dataFormatada;

  if (dataVenda == "" || dataVenda == null) {
    dataVenda = new Date().toISOString().split("T")[0];
    // dataFormatada = dataVenda.split("-").reverse().join("-");
  }

  // Faz uma requisição para a rota de vendas
  const res = await fetch("/api/vendas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      clienteId,
      carroId,
      data_venda: dataVenda,
      valorFinalVenda,
      metodoPagamento,
      obsVenda,
    }),
  });
  // Pega a resposta em JSON
  const data = await res.json();
  // Se a resposta for ok, mostra a mensagem de sucesso
  if (res.ok) {
    msg.textContent = data.message;
    msg.classList.remove("text-red-600");
    msg.classList.add("text-green-600");
  } else {
    // Senão, mostra a mensagem de erro
    msg.textContent = data.message;
    msg.classList.remove("text-green-600");
    msg.classList.add("text-red-600");
  }

  // Limpa o formulário
  form.reset();
});

// Carrega os selects ao carregar a pagina
document.addEventListener("DOMContentLoaded", preencherSelect);
