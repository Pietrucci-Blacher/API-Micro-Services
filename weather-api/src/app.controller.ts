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
    ): Promise<{ weathers: Weather[] }> {
        let weather: Weather;
        let weathers: Weather[] = [];
        if (request.location) {
            weather = await this.appService.findbyLocation(request.location);
            return { weathers: [weather] };
        } else {
            weathers = await this.appService.findAll();
            return { weathers };
        }
    }

    async update(
        request: WeatherServiceUpdateRequest,
        metadata?: Metadata,
    ): Promise<WeatherServiceUpdateResponse> {
        const weather = await this.appService.findbyLocation(request.location);
        return { weather };
    }

    async delete(
        request: WeatherServiceDeleteRequest,
        metadata?: Metadata,
    ): Promise<WeatherServiceDeleteResponse> {
        const weather = await this.appService.delete(request.id);
        return { weather };
    }

    async add(
        request: WeatherServiceAddRequest,
        metadata?: Metadata,
    ): Promise<WeatherServiceAddResponse> {
        const weather = await this.appService.create({
            location: request.location,
            temperature: request.temperature,
            humidity: request.humidity,
            pressure: request.pressure,
        });
        return { weather };
    }
}
