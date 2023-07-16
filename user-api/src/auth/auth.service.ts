import { OnModuleInit } from '@nestjs/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
    AUTH_SERVICE_NAME,
    AuthServiceClient,
    IsAuthenticatedRequest,
    IsAuthenticatedResponse,
    Token,
} from '../stubs/auth/v1/auth';
import { firstValueFrom } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

@Injectable()
export class AuthService implements OnModuleInit {
    private WeatherService: AuthServiceClient;

    constructor(@Inject(AUTH_SERVICE_NAME) private client: ClientGrpc) {}

    onModuleInit() {
        this.WeatherService =
            this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
    }

    async isAuthenticated(
        req: IsAuthenticatedRequest,
        md?: Record<string, any>,
    ): Promise<IsAuthenticatedResponse> {
        const meta = new Metadata();
        if (md) Object.entries(md).map(([k, v]) => meta.add(k, v));

        const res: IsAuthenticatedResponse = await firstValueFrom(
            this.WeatherService.isAuthenticated(req, meta) as any,
        );

        return res;
    }
}
