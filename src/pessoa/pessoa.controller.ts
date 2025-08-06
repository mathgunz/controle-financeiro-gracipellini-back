import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { CreatePessoaDto } from '../dto/create-pessoa.dto';
import { UpdatePessoaDto } from '../dto/update-pessoa.dto';
import { Pessoa } from 'src/entities/pessoa.entity';

@Controller('pessoa')
export class PessoaController {
  constructor(private readonly pessoaService: PessoaService) {}

  private pessoas: Pessoa[] = [
    {
      id: 1,
      nome: 'Matheus',
      sobrenome: 'Graciano',
      email: 'math@gmail.com',
      senha: 'abcx',
      ativo: true
    }
  ];

  @Get()
  findAll(): Pessoa[] {
    return this.pessoas;
  }

  @Get(':id')
  findOne(@Param('id') id: string): Pessoa | { message: string } {
    const pessoa = this.pessoas.find(p => p.id === Number(id));
    return pessoa || { message: 'Pessoa não encontrada' };
  }

  @Post()
  async create(@Body() dto: CreatePessoaDto): Promise<Pessoa> {
    return await this.pessoaService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePessoaDto): Pessoa | { message: string } {
    const index = this.pessoas.findIndex(p => p.id === Number(id));
    if (index === -1) return { message: 'Pessoa não encontrada' };

    this.pessoas[index] = { ...this.pessoas[index], ...dto };
    return this.pessoas[index];
  }

  @Delete(':id')
  remove(@Param('id') id: string): { message: string } {
    const index = this.pessoas.findIndex(p => p.id === Number(id));
    if (index === -1) return { message: 'Pessoa não encontrada' };

    this.pessoas.splice(index, 1);
    return { message: 'Pessoa removida com sucesso' };
  }
}
