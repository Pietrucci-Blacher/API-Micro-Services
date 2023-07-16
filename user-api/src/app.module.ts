import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { GrpcReflectionModule } from 'nestjs-grpc-reflection';
import { grpcConfig } from './grpc.config';
import { WeatherModule } from './weather/weather.module';

@Module({
    imports: [GrpcReflectionModule.register(grpcConfig), WeatherModule],
    controllers: [AppController],
    providers: [AppService, PrismaService],
})
export class AppModule {}
