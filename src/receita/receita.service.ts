import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReceitaDto } from '../dto/create-receita.dto';
import { UpdateReceitaDto } from '../dto/update-receita.dto';
import { Receita } from 'src/entities/receita.entity';
import { calcularRepeticoes } from 'src/utils/repeticoes.utils';

@Injectable()
export class ReceitaService {
  constructor(
    @InjectRepository(Receita)
    private receitaRepository: Repository<Receita>,
  ) {}

  async create(createReceitaDto: CreateReceitaDto): Promise<Receita> {
    const receita = this.receitaRepository.create(createReceitaDto);
    receita.dataCriacao = new Date();

    if ((receita.quantidade == 0 || receita.quantidade == 1)) {
      const receitaSalva = await this.receitaRepository.save(receita);
      return receitaSalva;
    } else if (receita.quantidade > 1) {
      
      const repeticoes: Date[] = calcularRepeticoes(receita.dataRecebimento, receita.repeticao, receita.quantidade);
      const receitasCriadas: Receita[] = [];
      
      for (const data of repeticoes) {
        const receita = this.receitaRepository.create(createReceitaDto);
        receita.dataRecebimento = data;
        receita.dataCriacao = new Date();
        receitasCriadas.push(receita);
      }

      const receitasSalvas = await this.receitaRepository.save(receitasCriadas);
      return receitasSalvas[0]; // Retorna a primeira receita criada, ou você pode escolher outra lógica
    };

    return await this.receitaRepository.save(receita);
  }

  async findAll(query?: { date?: string | Date }): Promise<Receita[]> {
      if (query?.date) {
        let d: Date;
      
        if (typeof query.date === 'string') {
          // Parse manual para garantir yyyy-mm-dd
          const [year, month, day] = query.date.split('-').map(Number);
          d = new Date(year, month - 1, day);
        } else {
          d = new Date(query.date);
        }
      const year = d.getFullYear();
      const month = d.getMonth() + 1; // 1-12
      const start = `${year}-${String(month).padStart(2, '0')}-01`;
      const lastDay = new Date(year, month, 0).getDate();
      const end = `${year}-${String(month).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;
      
      return await this.receitaRepository
        .createQueryBuilder('d')
        .where('d.dataRecebimento BETWEEN :start AND :end', { start, end })
        .getMany();
    }

    return await this.receitaRepository.find();
  }

  async findOne(id: number): Promise<Receita | { message: string }> {
    const receita = await this.receitaRepository.findOne({ where: { id } });
    return receita || { message: 'Receita não encontrada' };
  }

  async update(id: number, updateReceitaDto: UpdateReceitaDto): Promise<Receita | { message: string }> {
    const receita = await this.receitaRepository.findOne({ where: { id } });
    if (!receita) return { message: 'Receita não encontrada' };
    
    Object.assign(receita, updateReceitaDto);
    return await this.receitaRepository.save(receita);
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.receitaRepository.delete(id);
    if (result.affected === 0) return { message: 'Receita não encontrada' };
    return { message: 'Receita removida com sucesso' };
  }
}
