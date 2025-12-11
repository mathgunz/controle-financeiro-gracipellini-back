import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Pessoa } from './pessoa.entity';

@Entity({ name: 'receita', schema: process.env.DB_SCHEMA || 'controle_financeiro' })
export class Receita {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column('decimal')
  valor: number;

  @Column()
  data: string; // ou Date

  @Column()
  categoria: 'CASA' | 'PESSOAL';

  @Column()
  titular: string;

  @Column()
  quantidadeMes: number;

  @ManyToOne(() => Pessoa)
  pessoa: Pessoa;
}