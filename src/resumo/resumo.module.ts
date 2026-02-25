import { Module } from '@nestjs/common';
import { ResumoService } from './resumo.service';
import { ResumoController } from './resumo.controller';
import { DespesaService } from 'src/despesa/despesa.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Despesa } from 'src/entities/despesa.entity';
import { ReceitaService } from 'src/receita/receita.service';
import { Usuario } from 'src/entities/usuario.entity';
import { Receita } from 'src/entities/receita.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Despesa, Receita, Usuario])],
  controllers: [ResumoController],
  providers: [ResumoService, DespesaService, ReceitaService],
})
export class ResumoModule {}
