import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { DespesaService } from './despesa.service';
import { CreateDespesaDto, TipoDespesa } from '../dto/create-despesa.dto';
import { UpdateDespesaDto } from '../dto/update-despesa.dto';
import { Categoria, Despesa, TipoPagamento } from 'src/entities/despesa.entity';

@Controller('despesa')
export class DespesaController {
  constructor(private readonly despesaService: DespesaService) {}

 private despesas: Despesa[] = [
    {
      id: 1,
      tipo: TipoDespesa.DESPESA,
      nome: 'Banho Pets',
      valor: 300,
      data: '16/08/1992',
      tipoPagamento: TipoPagamento.FIXA,
      categoria: Categoria.CASA,
      titular: 'Emily',
      contaPaga: true,
      quantidadeMes: 5,
    }
  ];

  @Get()
  findAll() {
    return this.despesas;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.despesas.find(d => d.id === Number(id)) || { message: 'Não encontrado' };
  }

  @Post()
  create(@Body() createDespesaDto: CreateDespesaDto) {
    const nova = { id: Date.now(), ...createDespesaDto };
    this.despesas.push(nova);
    return nova;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDespesaDto: UpdateDespesaDto) {
    const index = this.despesas.findIndex(d => d.id === Number(id));
    if (index === -1) return { message: 'Não encontrado' };

    this.despesas[index] = { ...this.despesas[index], ...updateDespesaDto };
    return this.despesas[index];
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const index = this.despesas.findIndex(d => d.id === Number(id));
    if (index === -1) return { message: 'Não encontrado' };

    const deletada = this.despesas.splice(index, 1);
    return { message: 'Removida com sucesso', item: deletada[0] };
  }
}
