import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { Metadata } from '@grpc/grpc-js';
import {
    AuthServiceLoginRequest,
    AuthServiceLoginResponse,
    AuthServiceRegisterRequest,
    AuthServiceRegisterResponse,
    AuthServiceLogoutRequest,
    AuthServiceLogoutResponse,
    AuthServiceController,
    AuthServiceControllerMethods,
    IsAuthenticatedRequest,
    IsAuthenticatedResponse,
} from './stubs/auth/v1/auth';

@Controller()
@AuthServiceControllerMethods()
export class AppController implements AuthServiceController {
    constructor(private readonly appService: AppService) {}

    async login(
        data: AuthServiceLoginRequest,
        metadata: Metadata,
    ): Promise<AuthServiceLoginResponse> {
        try {
            const { accessToken, refreshToken } = await this.appService.login(
                data,
            );
            return { accessToken, refreshToken };
        } catch (err) {
            console.error(err.message);
            return {
                success: false,
                message: err.message,
            };
        }
    }

    async register(
        data: AuthServiceRegisterRequest,
        metadata: Metadata,
    ): Promise<AuthServiceRegisterResponse> {
        try {
            await this.appService.register(data);
        } catch (err) {
            console.error(err.message);
            return {
                success: false,
                message: err.message,
            };
        }

        return { success: true };
    }

    async logout(
        data: AuthServiceLogoutRequest,
        metadata: Metadata,
    ): Promise<AuthServiceLogoutResponse> {
        try {
            await this.appService.logout(data);
        } catch (err) {
            console.error(err.message);
            return {
                success: false,
                message: err.message,
            };
        }
        return { success: true };
    }

    async isAuthenticated(
        data: IsAuthenticatedRequest,
        metadata: Metadata,
    ): Promise<IsAuthenticatedResponse> {
        try {
            const userId = await this.appService.isAuthenticated(
                data.accessToken,
            );

            return { userId: userId.id };
        } catch (err) {
            console.error(err.message);
            return {
                success: false,
                message: err.message,
            };
        }
    }
}
