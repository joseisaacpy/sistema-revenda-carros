const clientes = document.getElementById("clientes-cadastrados");
async function listarClientes() {
  const response = await fetch("/api/clientes");
  const data = await response.json();
  data.forEach((cliente) => {
    const itemCliente = document.createElement("div");
    itemCliente.innerHTML = `
            <p>Nome: ${cliente.nome}</p>
            <p>CPF: ${cliente.cpf}</p>
            <p>Email: ${cliente.email}</p>
            <p>Telefone: ${cliente.telefone}</p>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Editar</button>
            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Excluir</button>
      `;
    clientes.appendChild(itemCliente);
  });
}

listarClientes();
