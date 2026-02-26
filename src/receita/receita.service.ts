import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { CreateReceitaDto } from '../dto/create-receita.dto';
import { UpdateReceitaDto } from '../dto/update-receita.dto';
import { Receita } from 'src/entities/receita.entity';
import { calcularRepeticoes } from 'src/utils/repeticoes.utils';
import { randomUUID } from 'crypto';

@Injectable()
export class ReceitaService {
  constructor(
    @InjectRepository(Receita)
    private receitaRepository: Repository<Receita>,
  ) { }

  async create(createReceitaDto: CreateReceitaDto): Promise<Receita[]> {

    const repeticaoUUID = randomUUID().toString();

    const receita = this.receitaRepository.create(createReceitaDto);
    receita.dataCriacao = new Date();

    if ((receita.quantidade == 0 || receita.quantidade == 1)) {
      const receitaSalva = await this.receitaRepository.save(receita);
      return [receitaSalva];
    } else if (receita.quantidade > 1) {

      const repeticoes: Date[] = calcularRepeticoes(receita.dataRecebimento, receita.repeticao, receita.quantidade);
      const receitasCriadas: Receita[] = [];

      for (const data of repeticoes) {
        const receita = this.receitaRepository.create(createReceitaDto);
        receita.dataRecebimento = data;
        receita.dataCriacao = new Date();
        receita.repeticaoUUID = repeticaoUUID;
        receitasCriadas.push(receita);
      }

      const receitasSalvas = await this.receitaRepository.save(receitasCriadas);
      return receitasSalvas; // Retorna a primeira receita criada, ou você pode escolher outra lógica
    };

    return [await this.receitaRepository.save(receita)];
  }

  async findAll(query?: { dataRecebimento?: string | Date; date?: string | Date }): Promise<Receita[]> {
    const dataRecebimento = query?.dataRecebimento ?? query?.date;

    if (dataRecebimento) {
      let d: Date;

      if (typeof dataRecebimento === 'string') {
        const match = dataRecebimento.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        if (!match) {
          throw new BadRequestException('dataRecebimento deve estar no formato yyyy-mm-dd');
        }

        const year = Number(match[1]);
        const month = Number(match[2]);
        const day = Number(match[3]);

        if (month < 1 || month > 12 || day < 1 || day > 31) {
          throw new BadRequestException('dataRecebimento inválida');
        }

        d = new Date(year, month - 1, day);
      } else {
        d = new Date(dataRecebimento);
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

  async update(id: number, updateReceitaDto: UpdateReceitaDto): Promise<Receita[]> {

    const tipoEdicao = updateReceitaDto.tipoEdicao;

    const receita = await this.receitaRepository.preload({
      id,
      nome: updateReceitaDto.nome,
      valor: updateReceitaDto.valor,
      dataRecebimento: updateReceitaDto.dataRecebimento,
      hasRecebida: updateReceitaDto.hasRecebida,
      repeticao: updateReceitaDto.repeticao,
    });
    if (!receita) throw new NotFoundException('Receita não encontrada');


    switch (tipoEdicao) {
      case 'CONTA_SELECIONADA':
        return [await this.receitaRepository.save(receita)];

      case 'PROXIMAS_CONTAS':

        const allReceitas = await this.receitaRepository.findBy({
          repeticaoUUID: receita.repeticaoUUID,
          dataRecebimento: MoreThanOrEqual(receita.dataRecebimento),
        });

        if (allReceitas.length === 0) {
          throw new NotFoundException('Nenhuma receita futura encontrada para esta conta');
        }

        for (const d of allReceitas) {
          d.nome = receita.nome;
          d.hasRecebida = receita.hasRecebida;
          d.valor = receita.valor;
        }

        return await this.receitaRepository.save(allReceitas);

      case 'TODAS_CONTAS':

        const receitasParaAtualizar = await this.receitaRepository.findBy({ repeticaoUUID: receita.repeticaoUUID });

        if (receitasParaAtualizar.length === 0) {
          throw new NotFoundException('Nenhuma receita encontrada para esta conta');
        }

        for (const d of receitasParaAtualizar) {
          d.nome = receita.nome;
          d.hasRecebida = receita.hasRecebida;
          d.valor = receita.valor;
        }

        return await this.receitaRepository.save(receitasParaAtualizar);

      default:
        throw new BadRequestException('Tipo de edição inválida');
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.receitaRepository.delete(id);
    if (result.affected === 0) return { message: 'Receita não encontrada' };
    return { message: 'Receita removida com sucesso' };
  }
}
