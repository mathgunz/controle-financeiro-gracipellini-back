import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsuarioService } from 'src/usuario/usuario.service';
import { JwtPayload } from '../types/jwt-payload.type';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    configService: ConfigService,
    private readonly usuarioService: UsuarioService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_REFRESH_SECRET', 'dev-refresh-secret'),
      passReqToCallback: true,
    });
  }

  async validate(
    req: { body: { refreshToken?: string } },
    payload: JwtPayload,
  ) {
    if (!req.body?.refreshToken) {
      throw new UnauthorizedException('Refresh token não informado');
    }

    const usuario = await this.usuarioService.findOne(payload.sub);
    if (!usuario || !usuario.ativo) {
      throw new UnauthorizedException('Usuário inválido');
    }

    return {
      sub: usuario.id,
      email: usuario.email,
      refreshToken: req.body.refreshToken,
    };
  }
}
