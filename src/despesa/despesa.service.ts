import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { CreateDespesaDto } from '../dto/create-despesa.dto';
import { UpdateDespesaDto } from '../dto/update-despesa.dto';
import { Despesa, Repeticao } from 'src/entities/despesa.entity';
import { calcularRepeticoes } from 'src/utils/repeticoes.utils';
import { randomUUID } from 'crypto';
import { UsuarioService } from 'src/usuario/usuario.service';


@Injectable()
export class DespesaService {
  constructor(
    @InjectRepository(Despesa)
    private readonly despesaRepository: Repository<Despesa>,
    private readonly usuarioService: UsuarioService,
  ) { }

  async create(createDespesaDto: CreateDespesaDto, usuarioId: number): Promise<Despesa[]> {

    const repeticaoUUID = randomUUID().toString();

    const despesa = this.despesaRepository.create(createDespesaDto);

    const usuario = await this.usuarioService.findOne(usuarioId);
    despesa.pessoa = usuario;

    despesa.dataCriacao = new Date();

    if ((despesa.quantidade == 0 || despesa.quantidade == 1)) {
      // despesa.repeticaoUUID = repeticaoUUID;
      despesa.numeroParcela = 1;
      const despesaSalva = await this.despesaRepository.save(despesa);
      return [despesaSalva];
    } else if (despesa.quantidade > 1) {

      const repeticoes: Date[] = calcularRepeticoes(despesa.dataPagamento, despesa.repeticao, despesa.quantidade);
      const despesasCriadas: Despesa[] = [];

      let qtd = 1;
      for (const data of repeticoes) {
        const despesa = this.despesaRepository.create(createDespesaDto);
        despesa.repeticaoUUID = repeticaoUUID;
        despesa.dataPagamento = data;
        despesa.dataCriacao = new Date();
        despesa.numeroParcela = qtd++;
        despesa.pessoa = usuario;
        despesasCriadas.push(despesa);
      }

      const despesasSalvas = await this.despesaRepository.save(despesasCriadas);
      return despesasSalvas; // Retorna a primeira despesa criada, ou você pode escolher outra lógica
    };

    return [await this.despesaRepository.save(despesa)];
  }
  async findAll(query?: { dataPagamento?: string | Date; date?: string | Date; }, usuarioId?: number | undefined): Promise<Despesa[]> {
    const dataPagamentoRaw = query?.dataPagamento ?? query?.date;
    const dataPagamento =
      typeof dataPagamentoRaw === 'string' ? dataPagamentoRaw.trim() : dataPagamentoRaw;

    if (
      dataPagamento &&
      dataPagamento !== 'null' &&
      dataPagamento !== 'undefined'
    ) {
      let d: Date;

      if (typeof dataPagamento === 'string') {
        const match = dataPagamento.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        if (!match) {
          throw new BadRequestException('dataPagamento deve estar no formato yyyy-mm-dd');
        }

        const year = Number(match[1]);
        const month = Number(match[2]);
        const day = Number(match[3]);

        if (month < 1 || month > 12 || day < 1 || day > 31) {
          throw new BadRequestException('dataPagamento inválida');
        }

        d = new Date(year, month - 1, day);
      } else {
        d = new Date(dataPagamento);
      }
      const year = d.getFullYear();
      const month = d.getMonth() + 1; // 1-12
      const start = `${year}-${String(month).padStart(2, '0')}-01`;
      const lastDay = new Date(year, month, 0).getDate();
      const end = `${year}-${String(month).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;

      return await this.despesaRepository
        .createQueryBuilder('d')
        .where('d.dataPagamento BETWEEN :start AND :end', { start, end })
        .andWhere('d.pessoaId = :usuarioId', { usuarioId })
        .getMany();
    }

    return await this.despesaRepository.find();
  }

  async findOne(id: number, usuarioId: number | undefined): Promise<Despesa> {
    const despesa = await this.despesaRepository.findOneBy({ id, pessoa: { id: usuarioId } });
    if (!despesa) throw new NotFoundException('Despesa não encontrada');
    return despesa;
  }

  async update(id: number, updateDespesaDto: UpdateDespesaDto, usuarioId: number | undefined): Promise<Despesa[]> {

    const tipoEdicao = updateDespesaDto.tipoEdicao;

    const despesa = await this.despesaRepository.preload({
      id,
      categoria: updateDespesaDto.categoria,
      nome: updateDespesaDto.nome,
      tipoPagamento: updateDespesaDto.tipoPagamento,
      hasContaPaga: updateDespesaDto.hasContaPaga,
      valor: updateDespesaDto.valor,
      dataPagamento: updateDespesaDto.dataPagamento,
    });
    if (!despesa) throw new NotFoundException('Despesa não encontrada');


    switch (tipoEdicao) {
      case 'CONTA_SELECIONADA':
        return [await this.despesaRepository.save(despesa)];

      case 'PROXIMAS_CONTAS':

        const allDespesas = await this.despesaRepository.findBy({
          repeticaoUUID: despesa.repeticaoUUID,
          dataPagamento: MoreThanOrEqual(despesa.dataPagamento),
          pessoa: { id: usuarioId },
        });

        if (allDespesas.length === 0) {
          throw new NotFoundException('Nenhuma despesa futura encontrada para esta conta');
        }

        for (const d of allDespesas) {
          d.categoria = despesa.categoria;
          d.nome = despesa.nome;
          d.tipoPagamento = despesa.tipoPagamento;
          d.hasContaPaga = despesa.hasContaPaga;
          d.valor = despesa.valor;
        }

        return await this.despesaRepository.save(allDespesas);

      case 'TODAS_CONTAS':

        const despesasParaAtualizar = await this.despesaRepository.findBy({ repeticaoUUID: despesa.repeticaoUUID, pessoa: { id: usuarioId } });

        if (despesasParaAtualizar.length === 0) {
          throw new NotFoundException('Nenhuma despesa encontrada para esta conta');
        }

        for (const d of despesasParaAtualizar) {
          d.categoria = despesa.categoria;
          d.nome = despesa.nome;
          d.tipoPagamento = despesa.tipoPagamento;
          d.hasContaPaga = despesa.hasContaPaga;
          d.valor = despesa.valor;
        }

        return await this.despesaRepository.save(despesasParaAtualizar);

      default:
        throw new BadRequestException('Tipo de edição inválida');
    }
  }

  async remove(id: number, usuarioId: number | undefined): Promise<void> {
    const despesa = await this.despesaRepository.findOneBy({ id, pessoa: { id: usuarioId } });
    if (!despesa) throw new NotFoundException('Despesa não encontrada');
    await this.despesaRepository.remove(despesa);
  }
}
