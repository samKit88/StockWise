import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Response, Request } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const loggerInstance = app.get(ConfigService);
  const config = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());
  app.use((req: Request, res: Response, next: NextFunction) => {
    Logger.log(`${req.method} ${req.url}`);
    next();
  });

  await app.listen(config.get('port') as number);
  // console.log(`loggerInstance out put ${loggerInstance}`);
  // console.debug(`server started at port ${config.get('port') as number}`);
}
bootstrap();
