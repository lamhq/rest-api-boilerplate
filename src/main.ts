import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './app.module';

function attachSwaggerModule(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('RESTful Boilerplate API')
    .setDescription('API of a RESTful Boilerplate App')
    .setVersion(process.env.npm_package_version || '')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/doc', app, document);
}

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  attachSwaggerModule(app);

  await app.listen(3000);
}
bootstrap();
