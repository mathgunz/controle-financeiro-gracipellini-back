import { Controller, Get } from '@nestjs/common';
import { ResumoService } from './resumo.service';
import { Resumo } from 'src/dto/resumo.dto';

@Controller('resumo')
export class ResumoController {
  constructor(private readonly resumoService: ResumoService) {}

  @Get()
  public async findAll(): Promise<Resumo[]> {
    return await this.resumoService.findAll();
  }
}