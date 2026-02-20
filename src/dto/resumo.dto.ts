export class ReceitaResumo {
  totalRecebida: number;
  totalReceber: number;
  membrosTotal: MembroTotal[];
}

export class DespesaResumo {
  totalPagar: number;
  totalPaga: number;
  membrosTotal: MembroTotal[];
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