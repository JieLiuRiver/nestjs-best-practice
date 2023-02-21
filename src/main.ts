import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { express as voyagerMiddleware } from 'graphql-voyager/middleware';
import { AppModule } from './app.module';
import { ValidationPipe } from './common/pipes/validation/validation.pipe';

dotenv.config();
const port = process.env.PORT || 3000;
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use('/voyager', voyagerMiddleware({ endpointUrl: '/graphql' }));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
  
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  Logger.log(`🚀 Server running on http://localhost:${port} `, 'Bootstrap');
}
bootstrap();
