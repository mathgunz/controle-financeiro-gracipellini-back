export class CreateReceitaDto {
  nome: string;
  valor: number;
  data: string;
  categoria: 'CASA' | 'PESSOAL';
  titular: string;
  quantidadeMes: number;
}