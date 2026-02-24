export enum TipoDespesa {
  RECEITA = 'RECEITA',
  DESPESA = 'DESPESA',
  APLICACAO = 'APLICACAO',
}

export enum TipoPagamento {
  FIXA = 'FIXA',
  VARIAVEL = 'VARIAVEL',
  CARTAO_CREDITO = 'CARTAO_CREDITO',
}

export enum Categoria {
  CASA = 'CASA',
  PESSOAL = 'PESSOAL',
}

export class CreateDespesaDto {
  tipo: TipoDespesa;
  nome: string;
  valor: number;
  data: Date; // ISO 8601 ou dd/MM/yyyy (dependendo do front)
  tipoPagamento: TipoPagamento;
  categoria: Categoria;
  titular: string;
  contaPaga: boolean;
  quantidadeMes: number;
}