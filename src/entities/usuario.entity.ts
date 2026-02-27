import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'usuario', schema: process.env.DB_SCHEMA || 'controle_financeiro' })
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  sobrenome: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  senha: string;

  @Column({ default: true })
  ativo: boolean;

  @Column({ type: 'text', nullable: true, select: false })
  refreshTokenHash?: string | null;
}
