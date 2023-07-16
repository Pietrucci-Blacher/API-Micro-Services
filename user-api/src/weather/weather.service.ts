import { OnModuleInit } from '@nestjs/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { FindRequest, FindResponse, User } from '../stubs/user/v1alpha/message';
import {
    WEATHER_SERVICE_NAME,
    WeatherServiceClient,
} from '../stubs/weather/v1/weather'
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
    async findUser(req: FindRequest, md: Record<string, any>): Promise<User> {
        const meta = new Metadata();
        Object.entries(md).map(([k, v]) => meta.add(k, v));
        const res: FindResponse = await firstValueFrom(
            this.WeatherService.find(req, meta) as any,
        );
        return res.user?.[0];
    }
}
