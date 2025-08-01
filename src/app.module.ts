import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContaModule } from './conta/conta.module';
import { PessoaModule } from './pessoa/pessoa.module';
import { ReceitaModule } from './receita/receita.module';
import { ResumoModule } from './resumo/resumo.module';
import { DespesaModule } from './despesa/despesa.module';

@Module({
  imports: [ContaModule, PessoaModule, ReceitaModule, ResumoModule, DespesaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
