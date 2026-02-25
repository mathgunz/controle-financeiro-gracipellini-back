import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity({ name: 'usuario', schema: process.env.DB_SCHEMA || 'controle_financeiro' })
export class Usuario {
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
}