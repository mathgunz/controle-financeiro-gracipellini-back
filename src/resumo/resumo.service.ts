import { Injectable } from '@nestjs/common';
import { Resumo } from 'src/dto/resumo.dto';
import { DespesaService } from 'src/despesa/despesa.service';

@Injectable()
export class ResumoService {
  constructor(private readonly despesaService: DespesaService) {}

  async findAll(): Promise<Resumo[]> {
    // Busca todas as despesas usando o service
    const despesas = await this.despesaService.findAll();

    // Calcula os campos do resumo a partir das despesas
    const totalPagar = despesas.filter((d) => !d.contaPaga).reduce((sum, d) => sum + d.valor, 0);
    const totalPaga = despesas.filter((d) => d.contaPaga).reduce((sum, d) => sum + d.valor, 0);


    const resumo: Resumo = {
      receita: {
        totalRecebida: 100,
        totalReceber: 200,
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
        total: 100,
        atual: 300,
      },
    };

    return [resumo];
  }
}
