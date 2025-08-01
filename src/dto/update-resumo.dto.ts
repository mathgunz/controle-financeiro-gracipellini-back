import { PartialType } from '@nestjs/swagger';
import { CreateResumoDto } from './create-resumo.dto';

export class UpdateResumoDto extends PartialType(CreateResumoDto) {}
