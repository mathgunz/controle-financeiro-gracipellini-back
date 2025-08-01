import { Module } from '@nestjs/common';
import { ResumoService } from './resumo.service';
import { ResumoController } from './resumo.controller';

@Module({
  controllers: [ResumoController],
  providers: [ResumoService],
})
export class ResumoModule {}
