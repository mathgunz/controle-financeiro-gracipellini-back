import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PessoaModule } from './pessoa/pessoa.module';
import { ReceitaModule } from './receita/receita.module';
import { ResumoModule } from './resumo/resumo.module';
import { DespesaModule } from './despesa/despesa.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Pessoa } from './entities/pessoa.entity';
import { Receita } from './entities/receita.entity';
import { Despesa } from './entities/despesa.entity';

@Module({
  imports: [
    PessoaModule,
    ReceitaModule,
    ResumoModule,
    DespesaModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'postgres',
      database: process.env.DB_NAME || 'controle_financeiro',
      // autoLoadEntities: true,
      synchronize: true, // use false em produção!
      entities: [Pessoa, Receita, Despesa]
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
