import { Injectable } from '@nestjs/common';
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

  findAll() {
    return `This action returns all pessoa`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pessoa`;
  }

  update(id: number, updatePessoaDto: UpdatePessoaDto) {
    return `This action updates a #${id} pessoa`;
  }

  remove(id: number) {
    return `This action removes a #${id} pessoa`;
  }
}
