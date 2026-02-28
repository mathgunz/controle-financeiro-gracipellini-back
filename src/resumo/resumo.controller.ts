import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ResumoService } from './resumo.service';
import { Resumo } from 'src/dto/resumo.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('resumo')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ResumoController {
  constructor(private readonly resumoService: ResumoService) {}

  @Get()
  public async findAll(@CurrentUser() user: { sub?: number }, @Query('data') data?: string): Promise<Resumo[]> {
    return await this.resumoService.findAll(data ? { date: data } : undefined, user.sub);
  }
}