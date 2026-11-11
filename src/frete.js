const FRETE_POR_REGIAO = { DF: 10, GO: 15, SP: 20, RJ: 20 };
const FRETE_PADRAO = 35;

export async function calcularFrete(cep, servicoCep) {
  if (!/^\d{8}$/.test(cep)) {
    throw new Error('CEP inválido');
  }

  const endereco = await servicoCep.buscar(cep);
  return FRETE_POR_REGIAO[endereco.uf] ?? FRETE_PADRAO;
}