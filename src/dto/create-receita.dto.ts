import { ApiProperty } from '@nestjs/swagger';

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
  data: Date;

  @ApiProperty({
    description: 'Categoria da receita',
    enum: ['CASA', 'PESSOAL'],
    example: 'PESSOAL'
  })
  categoria: 'CASA' | 'PESSOAL';

  @ApiProperty({
    description: 'Titular da receita',
    example: 'João Silva'
  })
  titular: string;

  @ApiProperty({
    description: 'Quantidade de vezes no mês',
    example: 1,
    type: Number
  })
  quantidadeMes: number;
}