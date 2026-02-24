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

  async findAll(queryParams?: { date?: string | Date }): Promise<Resumo[]> {

    const toDecimal = (n: number | string) => {
      const num = typeof n === 'string' ? parseFloat(n) : n;
      return Number(num.toFixed(2));
    };
    // Busca todas as despesas usando o service (podendo filtrar por data)
    const despesas = await this.despesaService.findAll(queryParams);
    // Busca todas as receitas usando o service (podendo filtrar por data)
    const receitas = await this.receitaService.findAll(queryParams);

    // Calcula os campos do resumo a partir das despesas
    const totalPagar = toDecimal(despesas.filter((d) => !d.contaPaga).reduce((sum, d) => sum + d.valor, 0));
    const totalPaga =  toDecimal(despesas.filter((d) => d.contaPaga).reduce((sum, d) => sum + d.valor, 0));

    // Soma o valor total das receitas
    const totalReceitas = toDecimal(receitas.reduce((sum, r) => sum + toDecimal(r.valor), 0));
    const totalDespesas = toDecimal(despesas.reduce((sum, d) => sum + toDecimal(d.valor), 0));

    // Saldo total e atual
    const saldoMesAtual = totalReceitas - totalDespesas;

    // Calcula receitas recebidas e a receber
    const totalRecebida = toDecimal(receitas.filter((r) => r.recebida).reduce((sum, r) => sum + r.valor, 0));
    const totalReceber = toDecimal(receitas.filter((r) => !r.recebida).reduce((sum, r) => sum + r.valor, 0));

    const saldoAtual = totalRecebida - totalPaga;

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
        saldoMesAtual: saldoMesAtual,
        saldoAtual: saldoAtual,
      },
    };

    return [resumo];
  }
}
