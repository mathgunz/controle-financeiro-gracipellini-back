import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Despesa } from 'src/entities/despesa.entity';
import { DespesaService } from './despesa.service';
import { DespesaController } from './despesa.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Despesa])],
  controllers: [DespesaController],
  providers: [DespesaService],
})
export class DespesaModule {}
