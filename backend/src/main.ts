import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS — permite peticiones desde el frontend (configurable por env)
  app.enableCors({
    origin: process.env.FRONTEND_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Validación global de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,         // elimina campos no declarados en el DTO
      forbidNonWhitelisted: true, // error si llegan campos desconocidos
      transform: true,         // convierte automáticamente tipos primitivos
    }),
  );

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Backend corriendo en: http://localhost:${port}`);
}

bootstrap();
