import { Injectable } from '@nestjs/common';
import { Resumo } from 'src/dto/resumo.dto';
import { DespesaService } from 'src/despesa/despesa.service';
import { ReceitaService } from 'src/receita/receita.service';

@Injectable()
export class ResumoService {
  constructor(
    private readonly despesaService: DespesaService,
    private readonly receitaService: ReceitaService,
  ) {}

  async findAll(): Promise<Resumo[]> {
    // Busca todas as despesas usando o service
    const despesas = await this.despesaService.findAll();
    // Busca todas as receitas usando o service
    const receitas = await this.receitaService.findAll();

    // Calcula os campos do resumo a partir das despesas
    const totalPagar = despesas.filter((d) => !d.contaPaga).reduce((sum, d) => sum + d.valor, 0);
    const totalPaga = despesas.filter((d) => d.contaPaga).reduce((sum, d) => sum + d.valor, 0);

    // Soma o valor total das receitas
    const totalReceitas = receitas.reduce((sum, r) => sum + r.valor, 0);

    // Soma o valor total das despesas
    const totalDespesas = despesas.reduce((sum, d) => sum + d.valor, 0);

    // Saldo total e atual
    const saldoTotal = totalReceitas;
    const saldoAtual = totalReceitas - totalDespesas;

    // Calcula receitas recebidas e a receber
    const totalRecebida = receitas.reduce((sum, r) => sum + r.valor, 0);
    const totalReceber = receitas.reduce((sum, r) => sum + r.valor, 0);

    const resumo: Resumo = {
      receita: {
        totalRecebida,
        totalReceber,
        membrosTotal: [
          {
            nome: 'Emily',
            total: 100,
          },
          {
            nome: 'Matheus',
            total: 300,
          },
        ],
      },
      despesa: {
        totalPagar,
        totalPaga,
        membrosTotal: [
          {
            nome: 'Emily',
            total: 100,
          },
          {
            nome: 'Matheus',
            total: 300,
          },
        ]
      },
      saldo: {
        total: saldoTotal,
        atual: saldoAtual,
      },
    };

    return [resumo];
  }
}
