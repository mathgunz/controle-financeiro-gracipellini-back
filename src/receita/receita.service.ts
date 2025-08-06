import { Injectable } from '@nestjs/common';
import { CreateReceitaDto } from '../dto/create-receita.dto';
import { UpdateReceitaDto } from '../dto/update-receita.dto';
import { Receita } from 'src/entities/receita.entity';
import { Pessoa } from 'src/entities/pessoa.entity';

@Injectable()
export class ReceitaService {
  private receitas: Receita[] = [
    {
      id: 1,
      nome: 'Banho Pets',
      valor: 300,
      data: '16/08/1992',
      categoria: 'CASA',
      titular: 'Emily',
      quantidadeMes: 5,
      pessoa: new Pessoa(),
    }
  ];

  create(createReceitaDto: CreateReceitaDto): Receita {
    const nova: Receita = {
      id: Date.now(),
      ...createReceitaDto,
      pessoa: new Pessoa()
    };
    this.receitas.push(nova);
    return nova;
  }

  findAll(): Receita[] {
    return this.receitas;
  }

  findOne(id: number): Receita | { message: string } {
    const receita = this.receitas.find(r => r.id === id);
    return receita || { message: 'Receita não encontrada' };
  }

  update(id: number, updateReceitaDto: UpdateReceitaDto): Receita | { message: string } {
    const index = this.receitas.findIndex(r => r.id === id);
    if (index === -1) return { message: 'Receita não encontrada' };
    this.receitas[index] = { ...this.receitas[index], ...updateReceitaDto };
    return this.receitas[index];
  }

  remove(id: number): { message: string } {
    const index = this.receitas.findIndex(r => r.id === id);
    if (index === -1) return { message: 'Receita não encontrada' };
    this.receitas.splice(index, 1);
    return { message: 'Receita removida com sucesso' };
  }
}
