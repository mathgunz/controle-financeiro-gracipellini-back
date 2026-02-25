import { ApiProperty } from '@nestjs/swagger';

export enum TipoPagamento {
  FIXA = 'FIXA',
  VARIAVEL = 'VARIAVEL',
  CARTAO_CREDITO = 'CARTAO_CREDITO',
}

export enum Categoria {
  ALIMENTACAO = 'ALIMENTACAO',
  EDUCACAO = 'EDUCACAO',
  LAZER = 'LAZER',
  MORADIA = 'MORADIA',
  SAÚDE = 'SAÚDE',
  TRANSPORTE = 'TRANSPORTE',
  VESTUARIO = 'VESTUARIO',
  OUTROS = 'OUTROS',
}

export enum Repeticao {
  DIARIAMENTE = 'DIARIAMENTE',
  SEMANALMENTE = 'SEMANALMENTE',
  MENSALMENTE = 'MENSALMENTE',
  ANUALMENTE = 'ANUALMENTE',
}

export class CreateDespesaDto {
  @ApiProperty({
    description: 'Nome da despesa',
    example: 'Aluguel'
  })
  nome: string;

  @ApiProperty({
    description: 'Valor da despesa',
    example: 1500.99,
    type: Number
  })
  valor: number;

  @ApiProperty({
    description: 'Data de pagamento',
    example: '2025-02-24',
    type: String,
    format: 'date'
  })
  dataPagamento: Date;

  @ApiProperty({
    description: 'Tipo de pagamento',
    enum: TipoPagamento,
    example: TipoPagamento.FIXA
  })
  tipoPagamento: TipoPagamento;

  @ApiProperty({
    description: 'Categoria da despesa',
    enum: Categoria,
    example: Categoria.MORADIA
  })
  categoria: Categoria;

  @ApiProperty({
    description: 'Indica se a conta foi paga',
    example: false,
    type: Boolean
  })
  hasContaPaga: boolean;

  @ApiProperty({
    description: 'Quantidade de vezes que se repete',
    example: 1,
    type: Number
  })
  quantidade: number;

  @ApiProperty({
    description: 'Frequência de repetição',
    enum: Repeticao,
    example: Repeticao.MENSALMENTE
  })
  repeticao: Repeticao;
}