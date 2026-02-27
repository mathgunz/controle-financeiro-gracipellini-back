import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ description: 'Nome do usuário', example: 'João' })
  nome: string;

  @ApiProperty({ description: 'Sobrenome do usuário', example: 'Silva' })
  sobrenome: string;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'joao.silva@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'senha123',
  })
  senha: string;
}
