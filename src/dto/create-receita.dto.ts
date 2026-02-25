import { ApiProperty } from '@nestjs/swagger';


export enum Repeticao {
  DIARIAMENTE = 'DIARIAMENTE',
  SEMANALMENTE = 'SEMANALMENTE',
  MENSALMENTE = 'MENSALMENTE',
  ANUALMENTE = 'ANUALMENTE',
}

export class CreateReceitaDto {
  @ApiProperty({
    description: 'Nome da receita',
    example: 'Salário'
  })
  nome: string;

  @ApiProperty({
    description: 'Valor da receita',
    example: 3000.00,
    type: Number
  })
  valor: number;

  @ApiProperty({
    description: 'Data da receita',
    example: '2025-02-24',
    type: String,
    format: 'date'
  })
  dataRecebimento: Date;

  @ApiProperty({
    description: 'Quantidade de vezes no mês',
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

