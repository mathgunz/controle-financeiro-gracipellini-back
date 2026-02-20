import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Pessoa } from './pessoa.entity';

export enum TipoDespesa {
  RECEITA = 'RECEITA',
  DESPESA = 'DESPESA',
  APLICACAO = 'APLICACAO',
}

export enum TipoPagamento {
  FIXA = 'FIXA',
  VARIAVEL = 'VARIAVEL',
  CARTAO_CREDITO = 'CARTAO_CREDITO',
}

export enum Categoria {
  CASA = 'CASA',
  PESSOAL = 'PESSOAL',
}

@Entity({ name: 'despesa', schema: process.env.DB_SCHEMA || 'controle_financeiro' })
export class Despesa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: TipoDespesa })
  tipo: TipoDespesa;

  @Column()
  nome: string;

  @Column('decimal')
  valor: number;

  @Column()
  data: string;

  @Column({ type: 'enum', enum: TipoPagamento })
  tipoPagamento: TipoPagamento;

  @Column({ type: 'enum', enum: Categoria })
  categoria: Categoria;

  @Column()
  titular: string;

  @Column()
  contaPaga: boolean;

  @Column()
  quantidadeMes: number;

  @ManyToOne(() => Pessoa)
  pessoa: Pessoa;

  @Column()
  dataPagamento: string;
}