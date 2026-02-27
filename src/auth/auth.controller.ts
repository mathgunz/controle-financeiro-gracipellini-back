import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from './public.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { CurrentUser } from './decorators/current-user.decorator';

type CurrentUserData = {
  sub: number;
  email: string;
  nome?: string;
  refreshToken?: string;
};

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @ApiOperation({ summary: 'Registrar usuário' })
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Public()
  @ApiOperation({ summary: 'Login do usuário' })
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto.email, dto.senha);
  }

  @Public()
  @UseGuards(JwtRefreshGuard)
  @ApiOperation({ summary: 'Gerar novo access token com refresh token' })
  @Post('refresh')
  async refresh(
    @Body() _dto: RefreshTokenDto,
    @CurrentUser() user: CurrentUserData,
  ) {
    if (!user?.refreshToken) {
      throw new UnauthorizedException('Refresh token inválido');
    }

    return this.authService.refresh(user.sub, user.refreshToken);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Dados do usuário autenticado' })
  @Get('me')
  async me(@CurrentUser() user: CurrentUserData) {
    return user;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Logout do usuário atual' })
  @Post('logout')
  async logout(@Req() req: { user?: { sub?: number } }) {
    const userId = req.user?.sub;
    if (!userId) {
      throw new UnauthorizedException('Usuário não autenticado');
    }

    await this.authService.logout(userId);
    return { message: 'Logout realizado com sucesso' };
  }
}
