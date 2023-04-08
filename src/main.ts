import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationError } from 'class-validator';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './app.module';
import { DtoValidationPipe } from './common/validation/dto-validation-pipe';
import { ValidationErrorException } from './common/validation/validation-error.exception';

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

  // set url prefix
  app.setGlobalPrefix('api');

  attachSwaggerModule(app);

  // enable request validation
  app.useGlobalPipes(
    new DtoValidationPipe({
      // keep validation of missing properties
      skipMissingProperties: false,

      // remove properties that do not have any validation decorators
      whitelist: true,

      // attempts to validate unknown objects fail immediately
      forbidUnknownValues: true,

      // validation errors will be returned to the client
      disableErrorMessages: false,

      // transform plain JavaScript objects to class object
      transform: true,

      // transform validation error to error detail
      exceptionFactory: (errors: ValidationError[]): never => {
        throw new ValidationErrorException(errors);
      },
    }),
  );

  await app.listen(3000);
}
bootstrap();
