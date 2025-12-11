import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Grupo } from './grupo.entity';

@Entity({ name: 'pessoa', schema: process.env.DB_SCHEMA || 'controle_financeiro' })
export class Pessoa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  sobrenome: string;

  @Column()
  email: string;

  @Column()
  senha: string;

  @Column({ default: true })
  ativo: boolean;

  // Uma pessoa pertence a um grupo
  @ManyToOne(() => Grupo, (grupo) => grupo.pessoas, { nullable: true, onDelete: 'SET NULL' })
  grupo?: Grupo;
}