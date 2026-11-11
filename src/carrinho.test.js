import { describe, it, expect, beforeEach } from 'vitest';
import { Carrinho } from './carrinho.js';

describe('Carrinho de compras', () => {
  let carrinho;

  // Roda antes de CADA teste: todos começam com um carrinho vazio
  beforeEach(() => {
    carrinho = new Carrinho();
  });

  it('começa vazio', () => {
    expect(carrinho.itens).toEqual([]);
    expect(carrinho.total).toBe(0);
  });

  it('adiciona itens e calcula o total', () => {
    carrinho.adicionarItem('Caderno', 25.5, 2);
    carrinho.adicionarItem('Caneta', 3);

    expect(carrinho.quantidadeTotal).toBe(3);
    expect(carrinho.total).toBe(54);
  });

  it('soma a quantidade quando o mesmo item é adicionado de novo', () => {
    carrinho.adicionarItem('Caneta', 3);
    carrinho.adicionarItem('Caneta', 3, 4);

    expect(carrinho.itens).toHaveLength(1);
    expect(carrinho.itens[0]).toEqual({ nome: 'Caneta', preco: 3, quantidade: 5 });
  });

  it('remove um item', () => {
    carrinho.adicionarItem('Caderno', 25.5);
    carrinho.removerItem('Caderno');

    expect(carrinho.itens).toHaveLength(0);
  });

  it('não aceita preço zero ou negativo', () => {
    expect(() => carrinho.adicionarItem('Brinde', 0))
      .toThrow('Preço deve ser maior que zero');
  });

  // Teste parametrizado: o mesmo teste roda para cada linha
  it.each([
    { cupom: 'CEUB10', esperado: 90 },
    { cupom: 'BLACK25', esperado: 75 },
  ])('aplica o cupom $cupom corretamente', ({ cupom, esperado }) => {
    carrinho.adicionarItem('Mochila', 100);
    carrinho.aplicarCupom(cupom);

    expect(carrinho.total).toBe(esperado);
  });

  it('rejeita cupom inexistente', () => {
    expect(() => carrinho.aplicarCupom('FALSO')).toThrow('Cupom inválido');
  });
});