import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateDespesaDto } from './create-despesa.dto';

export class UpdateDespesaDto extends PartialType(CreateDespesaDto) {

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
