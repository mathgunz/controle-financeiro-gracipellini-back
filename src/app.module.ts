import { Module, OnModuleInit } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { ReceitaModule } from './receita/receita.module';
import { ResumoModule } from './resumo/resumo.module';
import { DespesaModule } from './despesa/despesa.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { Usuario } from './entities/usuario.entity';
import { Receita } from './entities/receita.entity';
import { Despesa } from './entities/despesa.entity';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Module({
  imports: [
    UsuarioModule,
    AuthModule,
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
      entities: [Usuario, Receita, Despesa],
      ssl: false, // SSL disabled for local development
    }),],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private dataSource: DataSource) { }

  async onModuleInit() {
    const schema = process.env.DB_SCHEMA || 'controle_financeiro';
    await this.dataSource.query(`CREATE SCHEMA IF NOT EXISTS "${schema}"`);
  }
}
