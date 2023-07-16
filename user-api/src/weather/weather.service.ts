import { OnModuleInit } from '@nestjs/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
    WEATHER_SERVICE_NAME,
    WeatherServiceClient,
    WeatherServiceGetRequest,
    WeatherServiceGetResponse,
    WeatherServiceAddRequest,
    WeatherServiceAddResponse,
    Weather,
} from '../stubs/weather/v1/weather';
import { firstValueFrom } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

@Injectable()
export class WeatherService implements OnModuleInit {
    private WeatherService: WeatherServiceClient;

    constructor(@Inject(WEATHER_SERVICE_NAME) private client: ClientGrpc) {}

    onModuleInit() {
        this.WeatherService =
            this.client.getService<WeatherServiceClient>(WEATHER_SERVICE_NAME);
    }

    async get(
        req: WeatherServiceGetRequest,
        md?: Record<string, any>,
    ): Promise<Weather> {
        const meta = new Metadata();
        if (md) Object.entries(md).map(([k, v]) => meta.add(k, v));

        const res: WeatherServiceGetResponse = await firstValueFrom(
            this.WeatherService.get(req, meta) as any,
        );

        return res.weathers?.[0];
    }

    async add(
        req: WeatherServiceAddRequest,
        md?: Record<string, any>,
    ): Promise<Weather> {
        const meta = new Metadata();
        if (md) Object.entries(md).map(([k, v]) => meta.add(k, v));

        const res: WeatherServiceAddResponse = await firstValueFrom(
            this.WeatherService.add(req, meta) as any,
        );

        return res.weather?.[0];
    }
}
