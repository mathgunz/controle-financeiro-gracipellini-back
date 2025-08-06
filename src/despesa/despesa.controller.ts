import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { DespesaService } from './despesa.service';
import { CreateDespesaDto, TipoDespesa } from '../dto/create-despesa.dto';
import { UpdateDespesaDto } from '../dto/update-despesa.dto';
import { Despesa } from 'src/entities/despesa.entity';

@Controller('despesa')
export class DespesaController {
  constructor(private readonly despesaService: DespesaService) {}

  @Get()
  async findAll(): Promise<Despesa[]> {
    return await this.despesaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Despesa> {
    return await this.despesaService.findOne(Number(id));
  }

  @Post()
  async create(@Body() createDespesaDto: CreateDespesaDto): Promise<Despesa> {
    return await this.despesaService.create(createDespesaDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDespesaDto: UpdateDespesaDto): Promise<Despesa> {
    return await this.despesaService.update(Number(id), updateDespesaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.despesaService.remove(Number(id));
    return { message: 'Despesa removida com sucesso' };
  }
}