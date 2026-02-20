import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Pessoa } from './pessoa.entity';

@Entity({ name: 'grupo', schema: process.env.DB_SCHEMA || 'controle_financeiro' })
export class Grupo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nome: string;

  @Column({ type: 'text', nullable: true })
  descricao?: string;

  @CreateDateColumn()
  criadoEm: Date;

  @UpdateDateColumn()
  atualizadoEm: Date;

  // Um grupo tem muitas pessoas
  @OneToMany(() => Pessoa, (pessoa) => pessoa.grupo)
  pessoas?: Pessoa[];
}
