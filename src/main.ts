import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  // Swagger API Documentation
  const config = new DocumentBuilder()
    .setTitle('Technical Assessment: Fullstack Developer Position at Wizybot')
    .setDescription(
      `This API provides functionalities for a chatbot to assist users in product searches and currency conversions. The API integrates with OpenAI's Chat Completion API, enabling natural language queries and the execution of predefined functions.`
    )
    .setVersion('1.0')
    .addTag('chatbot')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
