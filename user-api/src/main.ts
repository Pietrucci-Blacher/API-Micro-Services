import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { grpcConfig } from './grpc.config';

async function bootstrap() {
    const app = await NestFactory.createMicroservice(AppModule, grpcConfig);
    await app.listen();
}
bootstrap();
