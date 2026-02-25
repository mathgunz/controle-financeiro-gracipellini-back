import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Usuario } from './usuario.entity';

export enum Repeticao {
  DIARIAMENTE = 'DIARIAMENTE',
  SEMANALMENTE = 'SEMANALMENTE',
  MENSALMENTE = 'MENSALMENTE',
  ANUALMENTE = 'ANUALMENTE',
}

@Entity({ name: 'receita', schema: process.env.DB_SCHEMA || 'controle_financeiro' })
export class Receita {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column('decimal')
  valor: number;


  @Column({ type: 'date' })
  dataRecebimento: Date; // ou Date

  @Column()
  categoria: 'CASA' | 'PESSOAL';

  @Column()
  titular: string;

  @Column({ default: false })
  recebida: boolean;

  @Column()
  quantidade: number;

  @ManyToOne(() => Usuario)
  pessoa: Usuario;
  
  @Column({ type: 'enum', enum: Repeticao })
  repeticao: Repeticao;

  @Column({ type: 'date' })
  dataCriacao: Date; // ou Date
}