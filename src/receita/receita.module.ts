import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceitaService } from './receita.service';
import { ReceitaController } from './receita.controller';
import { Receita } from 'src/entities/receita.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Receita])],
  controllers: [ReceitaController],
  providers: [ReceitaService],
})
export class ReceitaModule {}
