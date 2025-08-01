import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContaService } from './conta.service';
import { CreateContaDto } from './dto/create-conta.dto';
import { UpdateContaDto } from './dto/update-conta.dto';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Contas')
@Controller('contas')
export class ContaController {
  @Get()
  @ApiOperation({ summary: 'Listar todas as contas mockadas' })
  findAll() {
    return [
      { id: 1, nome: 'Banho Cachorras', valor: 120.50, tipo: 'despesa', data: '2025-07-12' },
      { id: 2, nome: 'Recebimento Cliente X', valor: 5000.00, tipo: 'receita', data: '2025-07-10' },
    ];
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter uma conta pelo ID' })
  @ApiParam({ name: 'id', type: 'string' })
  findOne(@Param('id') id: string) {
    return { id, nome: 'Conta Mock', valor: 292.88, tipo: 'despesa', data: '2025-07-10' };
  }

  @Post()
  @ApiOperation({ summary: 'Criar uma conta mock' })
  @ApiBody({ description: 'Dados da conta', schema: {
    example: {
      nome: 'Conta Luz',
      valor: 350.00,
      tipo: 'despesa',
      data: '2025-07-20'
    }
  }})
  create(@Body() body: any) {
    return { message: 'Conta criada com sucesso (mock)', conta: body };
  }
}
