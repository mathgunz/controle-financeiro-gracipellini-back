import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResumoService } from './resumo.service';
import { CreateResumoDto } from '../dto/create-resumo.dto';
import { UpdateResumoDto } from '../dto/update-resumo.dto';

@Controller('resumo')
export class ResumoController {
  constructor(private readonly resumoService: ResumoService) {}

  @Post()
  create(@Body() createResumoDto: CreateResumoDto) {
    return this.resumoService.create(createResumoDto);
  }

  @Get()
  findAll() {
    return this.resumoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resumoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResumoDto: UpdateResumoDto) {
    return this.resumoService.update(+id, updateResumoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resumoService.remove(+id);
  }
}
