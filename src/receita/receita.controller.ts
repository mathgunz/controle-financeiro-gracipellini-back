import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseGuards } from '@nestjs/common';
import { ReceitaService } from './receita.service';
import { CreateReceitaDto } from '../dto/create-receita.dto';
import { UpdateReceitaDto } from '../dto/update-receita.dto';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';


@Controller('receita')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ReceitaController {
  constructor(private readonly receitaService: ReceitaService) {}

  @Get()
  @ApiQuery({ name: 'dataRecebimento', required: false, type: String, example: '2026-02-18' })
  findAll(@CurrentUser() user: { sub?: number }, @Query('dataRecebimento') dataRecebimento?: string) {
    return this.receitaService.findAll(dataRecebimento ? { dataRecebimento } : undefined, user.sub);
  }

  @Get(':id')
  findOne(@CurrentUser() user: { sub?: number }, @Param('id') id: string) {
    return this.receitaService.findOne(Number(id), user.sub);
  }

  @Post()
  create(@CurrentUser() user: { sub?: number },@Body() dto: CreateReceitaDto) {
    return this.receitaService.create(dto, Number(user.sub));
  }

  @Put(':id')
  update(@CurrentUser() user: { sub?: number },  @Param('id') id: string, @Body() dto: UpdateReceitaDto) {
    return this.receitaService.update(Number(id), dto, user.sub);
  }

  @Delete(':id')
  remove(@CurrentUser() user: { sub?: number }, @Param('id') id: string) {
    return this.receitaService.remove(Number(id), user.sub);
  }
}
