import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const loggerInstance = app.get(ConfigService);
  const config = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(config.get('port') as number);
  console.debug(`server started at port ${config.get('port') as number}`);
}
bootstrap();
