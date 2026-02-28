import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { DespesaService } from './despesa.service';
import { CreateDespesaDto } from '../dto/create-despesa.dto';
import { UpdateDespesaDto } from '../dto/update-despesa.dto';
import { Despesa } from 'src/entities/despesa.entity';

@Controller('despesa')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class DespesaController {
  constructor(private readonly despesaService: DespesaService) { }

  @Get()
  @ApiQuery({ name: 'dataPagamento', required: false, type: String, example: '2026-02-18' })
  async findAll(@CurrentUser() user: { sub?: number },
    @Query('dataPagamento') dataPagamento?: string
    ,): Promise<Despesa[]> {
    return await this.despesaService.findAll(dataPagamento ? { dataPagamento } : undefined, user.sub);
  }

  @Get(':id')
  async findOne(@CurrentUser() user: { sub?: number }, @Param('id') id: string): Promise<Despesa> {
    return await this.despesaService.findOne(Number(id), user.sub);
  }

  @Post()
  async create(
    @Body() createDespesaDto: CreateDespesaDto,
    @CurrentUser() user: { sub?: number },
  ): Promise<Despesa[]> {
    if (!user?.sub) {
      throw new UnauthorizedException('Usuário não autenticado');
    }

    return await this.despesaService.create(createDespesaDto, user.sub);
  }

  @Put(':id')
  async update(@CurrentUser() user: { sub?: number }, @Param('id') id: string, @Body() updateDespesaDto: UpdateDespesaDto): Promise<Despesa[]> {
    return await this.despesaService.update(Number(id), updateDespesaDto, user.sub);
  }

  @Delete(':id')
  async remove(@CurrentUser() user: { sub?: number }, @Param('id') id: string): Promise<{ message: string }> {
    await this.despesaService.remove(Number(id), user.sub);
    return { message: 'Despesa removida com sucesso' };
  }
}
