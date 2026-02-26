import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateReceitaDto } from './create-receita.dto';

export class UpdateReceitaDto extends PartialType(CreateReceitaDto) {
  
    @ApiProperty({
      description: 'Tipo de edição',
      example: 'CONTA_SELECIONADA'
    })
    tipoEdicao: TipoEdicao;    
}

export enum TipoEdicao {
  CONTA_SELECIONADA = 'CONTA_SELECIONADA',
  PROXIMAS_CONTAS = 'PROXIMAS_CONTAS',
  TODAS_CONTAS = 'TODAS_CONTAS',
}