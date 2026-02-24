export class ReceitaResumoDTO {
  totalRecebida: number;
  totalReceber: number;
  membrosTotal: MembroTotalDTO[];
}

export class DespesaResumo {
  totalPagar: number;
  totalPaga: number;
  membrosTotal: MembroTotalDTO[];
}

export class SaldoResumoDTO {
  saldoMesAtual: number;
  saldoAtual: number;
}

export class Resumo {
  receita: ReceitaResumoDTO;
  despesa: DespesaResumo;
  saldo: SaldoResumoDTO;
}


export class MembroTotalDTO {
  nome: string;
  total: number;
}