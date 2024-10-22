import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as Sentry from '@sentry/nestjs';
import { nodeProfilingIntegration } from '@sentry/profiling-node';
import {AuthenticationGuard} from "./@guards/authentication.guard";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [nodeProfilingIntegration()],
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
});

const setUpSwagger = (app: INestApplication): void => {
  const config = new DocumentBuilder()
    .setTitle('Sample API')
    .setDescription('This is a sample API')
    .setVersion('1.0')
    .build();
  const documentFactory = (): OpenAPIObject =>
    SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);
};

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());
  app.disable('x-powered-by');
  app.useBodyParser('json', { limit: '10mb' });
  // app.useGlobalGuards(new AuthenticationGuard());
  // => pour une utilisation sur toutes les routes !

  setUpSwagger(app);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
