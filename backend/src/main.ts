import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.use('/', express.static('./static'));
    app.setGlobalPrefix('api');
    await app.listen(3000);
}
bootstrap();
