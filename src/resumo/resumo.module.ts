import { Module } from '@nestjs/common';
import { ResumoService } from './resumo.service';
import { ResumoController } from './resumo.controller';
import { DespesaService } from 'src/despesa/despesa.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Despesa } from 'src/entities/despesa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Despesa])],
  controllers: [ResumoController],
  providers: [ResumoService, DespesaService],
})
export class ResumoModule {}
