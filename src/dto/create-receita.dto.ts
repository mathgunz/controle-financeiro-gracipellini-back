export class CreateReceitaDto {
  nome: string;
  valor: number;
  data: Date;
  categoria: 'CASA' | 'PESSOAL';
  titular: string;
  quantidadeMes: number;
}