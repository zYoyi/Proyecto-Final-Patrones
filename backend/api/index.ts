/**
 * Punto de entrada serverless para Vercel.
 *
 * Vercel ejecuta este archivo como una función serverless.
 * NestJS se inicializa una sola vez (patrón cache) y reutiliza
 * la instancia en peticiones subsecuentes dentro del mismo contenedor.
 */
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';
import express, { Request, Response } from 'express';

let cachedApp: express.Express | null = null;

async function createApp(): Promise<express.Express> {
  const expressApp = express();

  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
    { logger: false },
  );

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.init();
  return expressApp;
}

export default async (req: Request, res: Response) => {
  if (!cachedApp) {
    cachedApp = await createApp();
  }
  cachedApp(req, res);
};
