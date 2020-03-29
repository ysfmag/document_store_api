import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import * as helmet from 'helmet';
import { configService } from './config/config.service';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(compression());
  app.use(helmet());
  const options = new DocumentBuilder()
    .setTitle('Speiro Api')
    .setVersion('1.0')
    .addTag('Speiro')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/', app, document);
  app.enableCors();
  await app.listen(configService.getPort());
}

bootstrap();
