import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { WeatherService } from './weather.service';
import { WeatherGrpcOptions } from './grpc.config';

@Module({
    imports: [ClientsModule.register([WeatherGrpcOptions])],
    providers: [WeatherService],
    exports: [WeatherService],
})
export class WeatherModule {}
