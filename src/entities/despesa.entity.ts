import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Usuario } from './usuario.entity';

export enum TipoPagamento {
  FIXA = 'FIXA',
  VARIAVEL = 'VARIAVEL',
  CARTAO_CREDITO = 'CARTAO_CREDITO',
}

export enum Repeticao {
  DIARIAMENTE = 'DIARIAMENTE',
  SEMANALMENTE = 'SEMANALMENTE',
  MENSALMENTE = 'MENSALMENTE',
  ANUALMENTE = 'ANUALMENTE',
}

export enum Categoria {
  ALIMENTACAO = 'ALIMENTACAO',
  EDUCACAO = 'EDUCACAO',
  LAZER = 'LAZER',
  MORADIA = 'MORADIA',
  SAÚDE = 'SAÚDE',
  TRANSPORTE = 'TRANSPORTE',
  VESTUARIO = 'VESTUARIO',
  OUTROS = 'OUTROS',
}

@Entity({ name: 'despesa', schema: process.env.DB_SCHEMA || 'controle_financeiro' })
export class Despesa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column('decimal')
  valor: number;

  @Column({ type: 'date' })
  dataPagamento: Date;

  @Column({ type: 'enum', enum: TipoPagamento })
  tipoPagamento: TipoPagamento;

  @Column({ type: 'enum', enum: Categoria })
  categoria: Categoria;

  @Column()
  hasContaPaga: boolean;

  @Column()
  quantidade: number;

  @Column({ type: 'enum', enum: Repeticao })
  repeticao: Repeticao;

  @ManyToOne(() => Usuario)
  pessoa: Usuario;

  @Column({ type: 'date' })
  dataCriacao: Date;

  @Column({ nullable: true })
  numeroParcela: number;

  @Column({ nullable: true })
  repeticaoUUID: string;
}