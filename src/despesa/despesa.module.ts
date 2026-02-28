import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Despesa } from 'src/entities/despesa.entity';
import { DespesaService } from './despesa.service';
import { DespesaController } from './despesa.controller';
import { UsuarioService } from 'src/usuario/usuario.service';
import { Usuario } from 'src/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Despesa, Usuario])],
  controllers: [DespesaController],
  providers: [DespesaService, UsuarioService],
})
export class DespesaModule {}
