import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import type { StringValue } from 'ms';
import { Usuario } from 'src/entities/usuario.entity';
import { UsuarioService } from 'src/usuario/usuario.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(dto: RegisterDto): Promise<{
    id: number;
    nome: string;
    sobrenome: string;
    email: string;
    ativo: boolean;
  }> {
    const senhaHash = await argon2.hash(dto.senha);
    const usuario = await this.usuarioService.create({
      ...dto,
      senha: senhaHash,
      ativo: true,
    });

    return {
      id: usuario.id,
      nome: usuario.nome,
      sobrenome: usuario.sobrenome,
      email: usuario.email,
      ativo: usuario.ativo,
    };
  }

  async login(email: string, senha: string) {
    const usuario = await this.usuarioService.findByEmail(email);
    if (!usuario || !usuario.ativo) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const senhaCorreta = await this.verifyPassword(senha, usuario.senha);
    if (!senhaCorreta) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    return this.createSession(usuario);
  }

  async refresh(userId: number, refreshToken: string) {
    const usuario = await this.usuarioService.findByIdWithAuthFields(userId);
    if (!usuario || !usuario.ativo) {
      throw new UnauthorizedException('Sessão inválida');
    }

    if (!usuario.refreshTokenHash) {
      throw new UnauthorizedException('Sessão inválida');
    }

    const refreshTokenValido = await argon2.verify(
      usuario.refreshTokenHash,
      refreshToken,
    );
    if (!refreshTokenValido) {
      throw new UnauthorizedException('Refresh token inválido');
    }

    return this.createSession(usuario);
  }

  async logout(userId: number): Promise<void> {
    await this.usuarioService.updateRefreshTokenHash(userId, null);
  }

  private async createSession(usuario: Usuario) {
    const payload = { sub: usuario.id, email: usuario.email };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>(
          'JWT_ACCESS_SECRET',
          'dev-access-secret',
        ),
        expiresIn: this.configService.get<StringValue>(
          'JWT_ACCESS_EXPIRES_IN',
          '15m',
        ),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>(
          'JWT_REFRESH_SECRET',
          'dev-refresh-secret',
        ),
        expiresIn: this.configService.get<StringValue>(
          'JWT_REFRESH_EXPIRES_IN',
          '7d',
        ),
      }),
    ]);

    await this.usuarioService.updateRefreshTokenHash(
      usuario.id,
      await argon2.hash(refreshToken),
    );

    return {
      accessToken,
      refreshToken,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        sobrenome: usuario.sobrenome,
        email: usuario.email,
      },
    };
  }

  private async verifyPassword(
    plainPassword: string,
    storedPassword: string,
  ): Promise<boolean> {
    if (!storedPassword) {
      return false;
    }

    if (storedPassword.startsWith('$argon2')) {
      return argon2.verify(storedPassword, plainPassword);
    }

    return storedPassword === plainPassword;
  }
}
