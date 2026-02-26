import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { ReceitaService } from './receita.service';
import { CreateReceitaDto } from '../dto/create-receita.dto';
import { UpdateReceitaDto } from '../dto/update-receita.dto';
import { ApiQuery } from '@nestjs/swagger';


@Controller('receita')
export class ReceitaController {
  constructor(private readonly receitaService: ReceitaService) {}

  @Get()
  @ApiQuery({ name: 'dataRecebimento', required: false, type: String, example: '2026-02-18' })
  findAll(@Query('dataRecebimento') dataRecebimento?: string) {
    return this.receitaService.findAll(dataRecebimento ? { dataRecebimento } : undefined);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.receitaService.findOne(Number(id));
  }

  @Post()
  create(@Body() dto: CreateReceitaDto) {
    return this.receitaService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateReceitaDto) {
    return this.receitaService.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.receitaService.remove(Number(id));
  }
}
