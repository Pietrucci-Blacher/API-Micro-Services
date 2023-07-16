import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata } from '@grpc/grpc-js';
import {
    AuthServiceLoginRequest,
    AuthServiceLoginResponse,
    AuthServiceRegisterRequest,
    AuthServiceRegisterResponse,
    AuthServiceLogoutRequest,
    AuthServiceLogoutResponse,
    AUTH_SERVICE_NAME,
    Token,
    AuthServiceController,
    AuthServiceControllerMethods,
} from './stubs/auth/v1/auth';

@Controller()
@AuthServiceControllerMethods()
export class AppController implements AuthServiceController {
    constructor(private readonly appService: AppService) {}

    async login(
        data: AuthServiceLoginRequest,
        metadata: Metadata,
    ): Promise<AuthServiceLoginResponse> {
        return {
            accessToken: 'access_token',
            refreshToken: 'refresh_token',
        };
    }

    async register(
        data: AuthServiceRegisterRequest,
        metadata: Metadata,
    ): Promise<AuthServiceRegisterResponse> {
        // this.appService.register(data);
        return { success: true };
    }

    async logout(
        data: AuthServiceLogoutRequest,
        metadata: Metadata,
    ): Promise<AuthServiceLogoutResponse> {
        return {
            success: true,
        };
    }
}
