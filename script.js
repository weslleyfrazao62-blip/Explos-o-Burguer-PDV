let pedidos = [];
let vendas = [];

const precos = {
  "Solo Smash": 25,
  "Break da Guitarra": 28,
  "Refrão de Bacon": 30,
  "Chamas do Louvor": 26
};

function adicionarPedido() {
  const produto = document.getElementById("produto").value;
  const quantidade = parseInt(document.getElementById("quantidade").value);

  pedidos.push({
    produto,
    quantidade,
    total: precos[produto] * quantidade
  });

  atualizarResumo();
}

function atualizarResumo() {
  const lista = document.getElementById("lista-pedidos");
  lista.innerHTML = "";
  let total = 0;

  pedidos.forEach(p => {
    total += p.total;
    const item = document.createElement("li");
    item.innerText = `${p.quantidade}x ${p.produto} - R$${p.total.toFixed(2)}`;
    lista.appendChild(item);
  });

  document.getElementById("total").innerText = `Total: R$${total.toFixed(2)}`;
}

function finalizarPedido() {
  const venda = {
    itens: [...pedidos],
    total: pedidos.reduce((acc, p) => acc + p.total, 0)
  };

  vendas.push(venda);
  pedidos = [];
  atualizarResumo();
  atualizarRelatorio();
  document.getElementById("qrcodePix").innerHTML = "";
}

function atualizarRelatorio() {
  const historico = document.getElementById("historico-vendas");
  historico.innerHTML = "";

  vendas.forEach((v, i) => {
    const item = document.createElement("li");
    item.innerText = `Pedido #${i + 1} - R$${v.total.toFixed(2)}`;
    historico.appendChild(item);
  });
}

function gerarPixQR() {
  const valor = pedidos.reduce((acc, p) => acc + p.total, 0);
  const chavePix = "seuemail@dominio.com"; // ← substitua com sua chave Pix

  const payload = `Pagamento Explosão Burguer 🔥\nChave: ${chavePix}\nValor: R$${valor.toFixed(2)}`;

  document.getElementById("qrcodePix").innerHTML = "";

  new QRCode(document.getElementById("qrcodePix"), {
    text: payload,
    width: 220,
    height: 220,
    colorDark: "#000",
    colorLight: "#fff",
    correctLevel: QRCode.CorrectLevel.H
  });
}

function enviarWhatsApp() {
  const numeroDestino = "5581985463493"; // ← coloque aqui o número que vai receber os pedidos
  let texto = `🔥 Pedido Explosão Burguer:\n`;

  pedidos.forEach(p => {
    texto += `• ${p.quantidade}x ${p.produto} - R$${p.total.toFixed(2)}\n`;
  });

  const valorTotal = pedidos.reduce((acc, p) => acc + p.total, 0);
  texto += `\n💰 Total: R$${valorTotal.toFixed(2)}\n\nQue o sabor do louvor te acompanhe! 🍔🔥`;

  const mensagemEncoded = encodeURIComponent(texto);
  const linkWhatsApp = `https://wa.me/${numeroDestino}?text=${mensagemEncoded}`;

  window.open(linkWhatsApp, "_blank");
}
