export class ReceitaResumo {
  totalRecebida: number;
  totalReceber: number;
  membrosTotal: MembroTotal[];
}

export class DespesaResumo {
  totalPagar: number;
  totalPaga: number;
  totalPagoEmily: number;
  totalPagoMatheus: number;
}

export class SaldoResumo {
  total: number;
  atual: number;
}

export class Resumo {
  receita: ReceitaResumo;
  despesa: DespesaResumo;
  saldo: SaldoResumo;
}


export class MembroTotal {
  nome: string;
  total: number;
}