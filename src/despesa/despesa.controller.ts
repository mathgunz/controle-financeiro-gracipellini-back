import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { DespesaService } from './despesa.service';
import { CreateDespesaDto } from '../dto/create-despesa.dto';
import { UpdateDespesaDto } from '../dto/update-despesa.dto';
import { Despesa } from 'src/entities/despesa.entity';

@Controller('despesa')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class DespesaController {
  constructor(private readonly despesaService: DespesaService) {}

  @Get()
  @ApiQuery({ name: 'dataPagamento', required: false, type: String, example: '2026-02-18' })
  async findAll(@Query('dataPagamento') dataPagamento?: string): Promise<Despesa[]> {
    return await this.despesaService.findAll(dataPagamento ? { dataPagamento } : undefined);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Despesa> {
    return await this.despesaService.findOne(Number(id));
  }

  @Post()
  async create(@Body() createDespesaDto: CreateDespesaDto): Promise<Despesa[]> {
    return await this.despesaService.create(createDespesaDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDespesaDto: UpdateDespesaDto): Promise<Despesa[]> {
    return await this.despesaService.update(Number(id), updateDespesaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.despesaService.remove(Number(id));
    return { message: 'Despesa removida com sucesso' };
  }
}
