import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReceitaDto } from '../dto/create-receita.dto';
import { UpdateReceitaDto } from '../dto/update-receita.dto';
import { Receita } from 'src/entities/receita.entity';

@Injectable()
export class ReceitaService {
  constructor(
    @InjectRepository(Receita)
    private receitaRepository: Repository<Receita>,
  ) {}

  async create(createReceitaDto: CreateReceitaDto): Promise<Receita> {
    const nova = this.receitaRepository.create(createReceitaDto);
    return await this.receitaRepository.save(nova);
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
        .where('d.data BETWEEN :start AND :end', { start, end })
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
