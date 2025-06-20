const clientes = document.getElementById("clientes-cadastrados");
async function listarClientes() {
  const response = await fetch("/api/clientes");
  const data = await response.json();
  data.forEach((cliente) => {
    const li = document.createElement("li");
    li.innerHTML = `
          <div class="bg-white shadow-md p-4 rounded-md border border-gray-200">
            <p class="text-lg font-semibold">Nome: ${cliente.nome}</p>
            <p class="text-lg font-semibold">CPF: ${cliente.cpf}</p>
            <p class="text-lg font-semibold">Data de Nascimento: ${cliente.dataNascimento}</p>
            <p class="text-lg font-semibold">E-mail: ${cliente.email}</p>
            <p class="text-lg font-semibold">Telefone: ${cliente.telefone}</p>
            <div class="mt-4 space-x-2">
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Editar</button>
              <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Excluir</button>
            </div>
          </div>
        `;
    clientes.appendChild(li);
  });
}

listarClientes();
