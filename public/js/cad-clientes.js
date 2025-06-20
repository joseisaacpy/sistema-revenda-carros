const form = document.getElementById("clienteForm");
const msg = document.getElementById("msg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const cliente = {
    nome: document.getElementById("nome").value,
    cpf: document.getElementById("cpf").value,
    dataNascimento: document.getElementById("data-nasc").value,
    email: document.getElementById("email").value,
    telefone: document.getElementById("telefone").value,
  };

  try {
    const res = await fetch("/api/clientes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cliente),
    });

    const data = await res.json();
    if (res.ok) {
      msg.textContent = data.message;
      msg.classList.remove("text-red-600");
      msg.classList.add("text-green-600"); // Garante classe verde no sucesso
      form.reset();
    } else {
      msg.textContent = data.error;
      msg.classList.remove("text-green-600");
      msg.classList.add("text-red-600");
    }
  } catch (err) {
    msg.textContent = "Erro ao cadastrar cliente.";
  }
});
