import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceitaService } from './receita.service';
import { ReceitaController } from './receita.controller';
import { Receita } from 'src/entities/receita.entity';
import { UsuarioService } from 'src/usuario/usuario.service';
import { Usuario } from 'src/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Receita, Usuario])],
  controllers: [ReceitaController],
  providers: [ReceitaService, UsuarioService],
})
export class ReceitaModule {}
