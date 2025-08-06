import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { CreatePessoaDto } from '../dto/create-pessoa.dto';
import { UpdatePessoaDto } from '../dto/update-pessoa.dto';
import { Pessoa } from 'src/entities/pessoa.entity';

@Controller('pessoa')
export class PessoaController {
  constructor(private readonly pessoaService: PessoaService) {}

  @Get()
  async findAll(): Promise<Pessoa[]> {
    return await this.pessoaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Pessoa> {
    return await this.pessoaService.findOne(Number(id));
  }

  @Post()
  async create(@Body() dto: CreatePessoaDto): Promise<Pessoa> {
    return await this.pessoaService.create(dto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdatePessoaDto): Promise<Pessoa> {
    return await this.pessoaService.update(Number(id), dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.pessoaService.remove(Number(id));
    return { message: 'Pessoa removida com sucesso' };
  }
}
