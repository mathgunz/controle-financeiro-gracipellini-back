import { Controller, Get, Query } from '@nestjs/common';
import { ResumoService } from './resumo.service';
import { Resumo } from 'src/dto/resumo.dto';

@Controller('resumo')
export class ResumoController {
  constructor(private readonly resumoService: ResumoService) {}

  @Get()
  public async findAll(@Query('data') data?: string): Promise<Resumo[]> {
    return await this.resumoService.findAll(data ? { date: data } : undefined);
  }
}