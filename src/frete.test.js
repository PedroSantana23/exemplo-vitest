import { describe, it, expect, vi } from 'vitest';
import { calcularFrete } from './frete.js';

describe('Cálculo de frete (com mock)', () => {
  it('cobra R$ 10 para o DF', async () => {
    // vi.fn() cria uma função falsa: a API de verdade não é chamada
    const servicoCep = {
      buscar: vi.fn().mockResolvedValue({ uf: 'DF', localidade: 'Brasília' }),
    };

    const frete = await calcularFrete('72000000', servicoCep);

    expect(frete).toBe(10);
    expect(servicoCep.buscar).toHaveBeenCalledWith('72000000');
    expect(servicoCep.buscar).toHaveBeenCalledTimes(1);
  });

  it('usa o frete padrão para estados fora da tabela', async () => {
    const servicoCep = { buscar: vi.fn().mockResolvedValue({ uf: 'AM' }) };

    await expect(calcularFrete('69000000', servicoCep)).resolves.toBe(35);
  });

  it('rejeita CEP inválido sem chamar a API', async () => {
    const servicoCep = { buscar: vi.fn() };

    await expect(calcularFrete('123', servicoCep)).rejects.toThrow('CEP inválido');
    expect(servicoCep.buscar).not.toHaveBeenCalled();
  });

  // Novidade do Vitest 5: vi.when define uma resposta para cada argumento
  it('responde diferente para cada CEP com vi.when', async () => {
    const buscar = vi.fn();
    vi.when(buscar)
      .calledWith('72000000').thenResolve({ uf: 'DF' })
      .calledWith('01000000').thenResolve({ uf: 'SP' });

    const servicoCep = { buscar };

    await expect(calcularFrete('72000000', servicoCep)).resolves.toBe(10);
    await expect(calcularFrete('01000000', servicoCep)).resolves.toBe(20);
  });
});