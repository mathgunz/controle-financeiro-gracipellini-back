import { PartialType } from '@nestjs/swagger';
import { CreateDespesaDto } from './create-despesa.dto';

export class UpdateDespesaDto extends PartialType(CreateDespesaDto) {

    tipoEdicao: TipoEdicao;    

}

export enum TipoEdicao {
  CONTA_SELECIONADA = 'CONTA_SELECIONADA',
  PROXIMAS_CONTAS = 'PROXIMAS_CONTAS',
  TODAS_CONTAS = 'TODAS_CONTAS',
}
