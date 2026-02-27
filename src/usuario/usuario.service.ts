import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { Usuario } from 'src/entities/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const usuarioExistente = await this.usuarioRepository.findOne({
      where: { email: createUsuarioDto.email },
    });
    if (usuarioExistente) {
      throw new ConflictException('Email já cadastrado');
    }

    const usuario = this.usuarioRepository.create(createUsuarioDto);
    return await this.usuarioRepository.save(usuario);
  }

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find();
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOneBy({ id });
    if (!usuario) throw new NotFoundException('Usuário não encontrado');
    return usuario;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    const usuario = await this.usuarioRepository.preload({
      id,
      ...updateUsuarioDto,
    });
    if (!usuario) throw new NotFoundException('Usuário não encontrado');
    return await this.usuarioRepository.save(usuario);
  }

  async remove(id: number): Promise<void> {
    const usuario = await this.usuarioRepository.findOneBy({ id });
    if (!usuario) throw new NotFoundException('Usuário não encontrado');
    await this.usuarioRepository.remove(usuario);
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    return await this.usuarioRepository
      .createQueryBuilder('usuario')
      .addSelect('usuario.senha')
      .addSelect('usuario.refreshTokenHash')
      .where('usuario.email = :email', { email })
      .getOne();
  }

  async updateRefreshTokenHash(
    userId: number,
    refreshTokenHash: string | null,
  ): Promise<void> {
    await this.usuarioRepository.update({ id: userId }, { refreshTokenHash });
  }

  async findByIdWithAuthFields(id: number): Promise<Usuario | null> {
    return await this.usuarioRepository
      .createQueryBuilder('usuario')
      .addSelect('usuario.senha')
      .addSelect('usuario.refreshTokenHash')
      .where('usuario.id = :id', { id })
      .getOne();
  }
}
