const CUPONS = {
  CEUB10: 0.1,   // 10% de desconto
  BLACK25: 0.25, // 25% de desconto
};

export class Carrinho {
  constructor() {
    this.itens = [];
    this.desconto = 0;
  }

  adicionarItem(nome, preco, quantidade = 1) {
    if (preco <= 0) throw new Error('Preço deve ser maior que zero');
    if (quantidade <= 0) throw new Error('Quantidade deve ser maior que zero');

    const existente = this.itens.find((item) => item.nome === nome);
    if (existente) {
      existente.quantidade += quantidade;
    } else {
      this.itens.push({ nome, preco, quantidade });
    }
  }

  removerItem(nome) {
    this.itens = this.itens.filter((item) => item.nome !== nome);
  }

  aplicarCupom(codigo) {
    const percentual = CUPONS[codigo];
    if (percentual === undefined) throw new Error('Cupom inválido');
    this.desconto = percentual;
  }

  get quantidadeTotal() {
    return this.itens.reduce((soma, item) => soma + item.quantidade, 0);
  }

  get total() {
    const subtotal = this.itens.reduce(
      (soma, item) => soma + item.preco * item.quantidade, 0);
    return Number((subtotal * (1 - this.desconto)).toFixed(2));
  }
}