const form = document.getElementById("veiculoForm");
const msg = document.getElementById("msg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const statusInput = document.getElementById("status").value;
  const veiculo = {
    modelo: document.getElementById("modelo").value,
    marca: document.getElementById("marca").value,
    ano: document.getElementById("ano").value,
    preco: document.getElementById("preco").value,
    status: document.getElementById("status").value,
  };

  if (!statusInput) {
    alert("Por favor, selecione um status para o veículo.");
    return;
  }

  try {
    const res = await fetch("/api/veiculos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(veiculo),
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
    msg.textContent = "Erro ao cadastrar veículo.";
  }
});
