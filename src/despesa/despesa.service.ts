import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDespesaDto } from '../dto/create-despesa.dto';
import { UpdateDespesaDto } from '../dto/update-despesa.dto';
import { Despesa } from 'src/entities/despesa.entity';

@Injectable()
export class DespesaService {
  constructor(
    @InjectRepository(Despesa)
    private readonly despesaRepository: Repository<Despesa>,
  ) {}

  async create(createDespesaDto: CreateDespesaDto): Promise<Despesa> {
    const despesa = this.despesaRepository.create(createDespesaDto);
    return await this.despesaRepository.save(despesa);
  }

  async findAll(): Promise<Despesa[]> {
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
