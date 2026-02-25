import { Repeticao } from 'src/entities/despesa.entity';

export function calcularRepeticoes(
  dataPagamento: Date,
  repeticao: Repeticao,
  quantidade: number,
): Date[] {
  const datasPagamentos: Date[] = [];

  switch (repeticao) {
    case Repeticao.DIARIAMENTE:
      for (let i = 0; i < quantidade; i++) {
        const novaData = new Date(dataPagamento);
        novaData.setDate(novaData.getDate() + i);
        datasPagamentos.push(novaData);
      }
      break;
    case Repeticao.SEMANALMENTE:
      for (let i = 0; i < quantidade; i++) {
        const novaData = new Date(dataPagamento);
        novaData.setDate(novaData.getDate() + i * 7);
        datasPagamentos.push(novaData);
      }
      break;
    case Repeticao.MENSALMENTE:
      for (let i = 0; i < quantidade; i++) {
        const novaData = new Date(dataPagamento);
        novaData.setMonth(novaData.getMonth() + i);
        datasPagamentos.push(novaData);
      }
      break;
    case Repeticao.ANUALMENTE:
      if (quantidade > 12) {
        quantidade = 12; // Limita a quantidade para 12 anos
      }
      for (let i = 0; i < quantidade; i++) {
        const novaData = new Date(dataPagamento);
        novaData.setFullYear(novaData.getFullYear() + i);
        datasPagamentos.push(novaData);
      }
      break;
    default:
      throw new Error('Repetição inválida');
  }

  return datasPagamentos;
}
