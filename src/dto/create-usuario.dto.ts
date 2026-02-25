import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDto {
  @ApiProperty({
    description: 'Nome da pessoa',
    example: 'João'
  })
  nome: string;

  @ApiProperty({
    description: 'Sobrenome da pessoa',
    example: 'Silva'
  })
  sobrenome: string;

  @ApiProperty({
    description: 'Email da pessoa',
    example: 'joao.silva@example.com',
    format: 'email'
  })
  email: string;

  @ApiProperty({
    description: 'Senha da pessoa',
    example: 'senha123',
    format: 'password'
  })
  senha: string;

  @ApiProperty({
    description: 'Indica se a pessoa está ativa',
    example: true,
    type: Boolean
  })
  ativo: boolean;
}