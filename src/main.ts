import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  
  // 🔧 Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('API Minhas Contas')
    .setDescription('Documentação da API com dados mockados')
    .setVersion('1.0')
    .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document); // http://localhost:3000/swagger
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();