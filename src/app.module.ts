import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContaModule } from './conta/conta.module';
import { PessoaModule } from './pessoa/pessoa.module';
import { ReceitaModule } from './receita/receita.module';
import { ResumoModule } from './resumo/resumo.module';

@Module({
  imports: [ContaModule, PessoaModule, ReceitaModule, ResumoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
