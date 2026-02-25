import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDespesaDto } from '../dto/create-despesa.dto';
import { UpdateDespesaDto } from '../dto/update-despesa.dto';
import { Despesa, Repeticao } from 'src/entities/despesa.entity';
import { calcularRepeticoes } from 'src/utils/repeticoes.utils';

@Injectable()
export class DespesaService {
  constructor(
    @InjectRepository(Despesa)
    private readonly despesaRepository: Repository<Despesa>,
  ) { }

  async create(createDespesaDto: CreateDespesaDto): Promise<Despesa> {
    const despesa = this.despesaRepository.create(createDespesaDto);
    despesa.dataCriacao = new Date();

    if ((despesa.quantidade == 0 || despesa.quantidade == 1)) {
      const despesaSalva = await this.despesaRepository.save(despesa);
      return despesaSalva;
    } else if (despesa.quantidade > 1) {
      
      const repeticoes: Date[] = calcularRepeticoes(despesa.dataPagamento, despesa.repeticao, despesa.quantidade);
      const despesasCriadas: Despesa[] = [];
      
      let qtd = 1;
      for (const data of repeticoes) {
        const despesa = this.despesaRepository.create(createDespesaDto);
        despesa.dataPagamento = data;
        despesa.dataCriacao = new Date();
        despesa.numeroParcela = qtd++;
        despesasCriadas.push(despesa);
      }

      const despesasSalvas = await this.despesaRepository.save(despesasCriadas);
      return despesasSalvas[0]; // Retorna a primeira despesa criada, ou você pode escolher outra lógica
    };

    return await this.despesaRepository.save(despesa);
  }
  async findAll(query?: { date?: string | Date }): Promise<Despesa[]> {
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

      return await this.despesaRepository
        .createQueryBuilder('d')
        .where('d.dataPagamento BETWEEN :start AND :end', { start, end })
        .getMany();
    }

    return await this.despesaRepository.find();
  }

  async findOne(id: number): Promise<Despesa> {
    const despesa = await this.despesaRepository.findOneBy({ id });
    if (!despesa) throw new NotFoundException('Despesa não encontrada');
    return despesa;
  }

  async update(id: number, updateDespesaDto: UpdateDespesaDto): Promise<Despesa> {
    const despesa = await this.despesaRepository.preload({
      id,
      ...updateDespesaDto,
    });
    if (!despesa) throw new NotFoundException('Despesa não encontrada');
    return await this.despesaRepository.save(despesa);
  }

  async remove(id: number): Promise<void> {
    const despesa = await this.despesaRepository.findOneBy({ id });
    if (!despesa) throw new NotFoundException('Despesa não encontrada');
    await this.despesaRepository.remove(despesa);
  }
}