import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ReceitaService } from './receita.service';
import { CreateReceitaDto } from '../dto/create-receita.dto';
import { UpdateReceitaDto } from '../dto/update-receita.dto';

@Controller('receita')
export class ReceitaController {
  constructor(private readonly receitaService: ReceitaService) {}

  @Get()
  findAll() {
    return this.receitaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.receitaService.findOne(Number(id));
  }

  @Post()
  create(@Body() dto: CreateReceitaDto) {
    return this.receitaService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateReceitaDto) {
    return this.receitaService.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.receitaService.remove(Number(id));
  }
}
