const form = document.getElementById("form");
const lista = document.getElementById("lista");
const totalSpan = document.getElementById("total");

let gastos = [];
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const descricao = document.getElementById("descricao").value;
  const valor = parseFloat(document.getElementById("valor").value);
  const categoria = document.getElementById("categoria").value;

  if (!descricao || !valor) return;
  const gasto = {
    id: Date.now(),
    descricao,
    valor,
    categoria
  };

  gastos.push(gasto);
  atualizarTela();
  form.reset();
});

function atualizarTela() {
  lista.innerHTML = "";
  let total = 0;
  gastos.forEach(gasto => {
    total += gasto.valor;
    const li = document.createElement("li");
    if (gasto.valor > 100) {
      li.classList.add("alto");
    }

    li.innerHTML = `
      ${gasto.descricao} (${gasto.categoria}) - R$ ${gasto.valor.toFixed(2)}
      <button class="delete" onclick="remover(${gasto.id})">X</button>
    `;
    li.addEventListener("click", () => editar(gasto.id));
    lista.appendChild(li);
  });

  totalSpan.textContent = total.toFixed(2);
}

function remover(id) {
  gastos = gastos.filter(g => g.id !== id);
  atualizarTela();
}

function editar(id) {
  const gasto = gastos.find(g => g.id === id);
  const novaDescricao = prompt("Nova descrição:", gasto.descricao);
  const novoValor = prompt("Novo valor:", gasto.valor);
  if (novaDescricao !== null && novoValor !== null) {
    gasto.descricao = novaDescricao;
    gasto.valor = parseFloat(novoValor);
    atualizarTela();
  }
}