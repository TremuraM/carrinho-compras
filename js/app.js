// Seleciona os elementos principais do HTML
const listaProdutos = document.getElementById('lista-produtos');
const valorTotal = document.getElementById('valor-total');
const botaoLimpar = document.querySelector('.botao-limpar');

// Inicializa o valor total do carrinho e lista de produtos e total
let totalCarrinho = 0;
document.getElementById('lista-produtos').innerHTML = '';
document.getElementById('valor-total').textContent = 'R$0';

/**
 * Função que extrai o nome e o preço do produto selecionado no dropdown
 */
function obterProdutoSelecionado() {
  const produtoSelecionado = document.getElementById('produto').value;
  const [nome, precoTexto] = produtoSelecionado.split(' - R$'); // separa pelo hífen
  const preco = parseFloat(precoTexto); // converte para número
  return { nome, preco };
}

/**
 * Função que adiciona o produto ao carrinho
 */
function adicionar() {
  const quantidade = parseInt(document.getElementById('quantidade').value);

  // Validação da quantidade
  if (isNaN(quantidade) || quantidade <= 0) {
    alert('Digite uma quantidade válida!');
    return;
  }

  // Obtém o produto e seu valor
  const { nome, preco } = obterProdutoSelecionado();

  // Calcula subtotal (preço x quantidade) e atualiza o total geral
  const subtotal = preco * quantidade;
  totalCarrinho += subtotal;

  // Cria o novo item e adiciona ao HTML do carrinho
  const novoItem = document.createElement('section');
  novoItem.classList.add('carrinho__produtos__produto');
  novoItem.innerHTML = `<span class="texto-azul">${quantidade}x</span> ${nome} <span class="texto-azul">R$${subtotal}</span>`;
  listaProdutos.appendChild(novoItem);

  // Atualiza o valor total na tela
  valorTotal.textContent = `R$${totalCarrinho}`;

  // Limpa o campo de quantidade para facilitar novo uso
  document.getElementById('quantidade').value = '';

  // Ativa o botão "Limpar", caso estivesse desativado
  botaoLimpar.disabled = false;
  botaoLimpar.classList.remove('botao-desativado');
}

/**
 * Função que limpa todos os produtos do carrinho e zera o total
 */
function limpar() {
  // Remove todos os itens da lista de produtos
  listaProdutos.innerHTML = '';

  // Zera o total e atualiza a tela
  totalCarrinho = 0;
  valorTotal.textContent = 'R$0';

  // Desativa o botão "Limpar" novamente
  botaoLimpar.disabled = true;
  botaoLimpar.classList.add('botao-desativado');
}

