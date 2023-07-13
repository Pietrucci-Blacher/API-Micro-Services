import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import {
    WeatherServiceAddRequest,
    WeatherServiceAddResponse,
    WeatherServiceDeleteRequest,
    WeatherServiceDeleteResponse,
    WeatherServiceGetRequest,
    WeatherServiceGetResponse,
    Weather,
    WeatherServiceController,
    WeatherServiceUpdateRequest,
    WeatherServiceUpdateResponse,
    WeatherServiceControllerMethods,
} from './stubs/weather/v1/weather';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata } from '@grpc/grpc-js';
@Controller()
@WeatherServiceControllerMethods()
export class AppController implements WeatherServiceController {
    constructor(private readonly appService: AppService) {}
    async get(
        request: WeatherServiceGetRequest,
        metadata?: Metadata,
    ): Promise<WeatherServiceGetResponse> {
        let weather: Weather;
        const weathers: Weather[] = [];
        if (request.id) {
            weather = await this.appService.findById(request.id);
            return { weathers: [weather] };
        } else if (request.pressure) {
            weather = await this.appService.findByName(request.pressure);
            return { weathers: [weather] };
        } else {
            weathers = await this.appService.findAll();
            return { weather };
        }
    }
    async update(
        request: WeatherServiceUpdateRequest,
        metadata?: Metadata,
    ): Promise<WeatherServiceUpdateResponse> {}
    async delete(
        request: WeatherServiceDeleteRequest,
        metadata?: Metadata,
    ): Promise<WeatherServiceDeleteResponse> {}
    async add(
        request: WeatherServiceAddRequest,
    ): Promise<WeatherServiceAddResponse> {}
}
