import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ReceitaService } from './receita.service';
import { CreateReceitaDto } from '../dto/create-receita.dto';
import { UpdateReceitaDto } from '../dto/update-receita.dto';
import { Receita } from 'src/entities/receita.entity';

@Controller('receita')
export class ReceitaController {
  constructor(private readonly receitaService: ReceitaService) { }

  private receitas: Receita[] = [
    {
      id: 1,
      nome: 'Banho Pets',
      valor: 300,
      data: '16/08/1992',
      categoria: 'CASA',
      titular: 'Emily',
      quantidadeMes: 5
    }
  ];

  @Get()
  findAll(): Receita[] {
    return this.receitas;
  }

  @Get(':id')
  findOne(@Param('id') id: string): Receita | { message: string } {
    const receita = this.receitas.find(r => r.id === Number(id));
    return receita || { message: 'Receita não encontrada' };
  }

  @Post()
  create(@Body() dto: CreateReceitaDto): Receita {
    const nova: Receita = {
      id: Date.now(),
      ...dto
    };
    this.receitas.push(nova);
    return nova;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateReceitaDto): Receita | { message: string } {
    const index = this.receitas.findIndex(r => r.id === Number(id));
    if (index === -1) return { message: 'Receita não encontrada' };

    this.receitas[index] = { ...this.receitas[index], ...dto };
    return this.receitas[index];
  }

  @Delete(':id')
  remove(@Param('id') id: string): { message: string } {
    const index = this.receitas.findIndex(r => r.id === Number(id));
    if (index === -1) return { message: 'Receita não encontrada' };

    this.receitas.splice(index, 1);
    return { message: 'Receita removida com sucesso' };
  }
}
