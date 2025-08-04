import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
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
}