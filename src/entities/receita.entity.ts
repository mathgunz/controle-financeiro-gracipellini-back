export class Receita {
  id: number;
  nome: string;
  valor: number;
  data: string; // ou Date se preferir
  categoria: 'CASA' | 'PESSOAL';
  titular: string;
  quantidadeMes: number;
}