import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePessoaDto } from '../dto/create-pessoa.dto';
import { UpdatePessoaDto } from '../dto/update-pessoa.dto';
import { Pessoa } from 'src/entities/pessoa.entity';

@Injectable()
export class PessoaService {
  constructor(
    @InjectRepository(Pessoa)
    private readonly pessoaRepository: Repository<Pessoa>,
  ) {}

  async create(createPessoaDto: CreatePessoaDto): Promise<Pessoa> {
    const pessoa = this.pessoaRepository.create(createPessoaDto);
    return await this.pessoaRepository.save(pessoa);
  }

  async findAll(): Promise<Pessoa[]> {
    return await this.pessoaRepository.find();
  }

  async findOne(id: number): Promise<Pessoa> {
    const pessoa = await this.pessoaRepository.findOneBy({ id });
    if (!pessoa) throw new NotFoundException('Pessoa não encontrada');
    return pessoa;
  }

  async update(id: number, updatePessoaDto: UpdatePessoaDto): Promise<Pessoa> {
    const pessoa = await this.pessoaRepository.preload({
      id,
      ...updatePessoaDto,
    });
    if (!pessoa) throw new NotFoundException('Pessoa não encontrada');
    return await this.pessoaRepository.save(pessoa);
  }

  async remove(id: number): Promise<void> {
    const pessoa = await this.pessoaRepository.findOneBy({ id });
    if (!pessoa) throw new NotFoundException('Pessoa não encontrada');
    await this.pessoaRepository.remove(pessoa);
  }
}
