import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { Usuario } from 'src/entities/usuario.entity';

@ApiTags('Usuários')
@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly pessoaService: UsuarioService) {}

  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários retornada com sucesso',
    type: [Usuario]
  })
  @Get()
  async findAll(): Promise<Usuario[]> {
    return await this.pessoaService.findAll();
  }

  @ApiOperation({ summary: 'Buscar usuário por ID' })
  @ApiParam({ name: 'id', description: 'ID do usuário', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Usuário encontrado',
    type: Usuario
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Usuario> {
    return await this.pessoaService.findOne(Number(id));
  }

  @ApiOperation({ summary: 'Criar novo usuário' })
  @ApiBody({ type: CreateUsuarioDto })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso',
    type: Usuario
  })
  @Post()
  async create(@Body() dto: CreateUsuarioDto): Promise<Usuario> {
    return await this.pessoaService.create(dto);
  }

  @ApiOperation({ summary: 'Atualizar usuário' })
  @ApiParam({ name: 'id', description: 'ID do usuário', type: Number })
  @ApiBody({ type: UpdateUsuarioDto })
  @ApiResponse({
    status: 200,
    description: 'Usuário atualizado com sucesso',
    type: Usuario
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateUsuarioDto): Promise<Usuario> {
    return await this.pessoaService.update(Number(id), dto);
  }

  @ApiOperation({ summary: 'Deletar usuário' })
  @ApiParam({ name: 'id', description: 'ID do usuário', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Usuário removido com sucesso'
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.pessoaService.remove(Number(id));
    return { message: 'Pessoa removida com sucesso' };
  }
}
