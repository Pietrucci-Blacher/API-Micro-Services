import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata } from '@grpc/grpc-js';
import {
    UserServiceAddRequest,
    UserServiceAddResponse,
    UserServiceDeleteRequest,
    UserServiceDeleteResponse,
    UserServiceGetRequest,
    UserServiceGetResponse,
    USER_SERVICE_NAME,
    User,
    UserServiceController,
    UserServiceUpdateRequest,
    UserServiceUpdateResponse,
    UserServiceControllerMethods,
} from './stubs/user/v1/user';

@Controller()
@UserServiceControllerMethods()
export class AppController implements UserServiceController {
    constructor(private readonly appService: AppService) {}
    async get(
        request: UserServiceGetRequest,
        metadata?: Metadata,
    ): Promise<UserServiceGetResponse> {
        let user: User;
        let users: User[] = [];

        if (request.id) {
            user = await this.appService.findById(request.id);
            return { users: [user] };
        } else if (request.name) {
            user = await this.appService.findByName(request.name);
            return { users: [user] };
        } else {
            users = await this.appService.findAll();
            return { users };
        }
    }

    async update(
        request: UserServiceUpdateRequest,
        metadata?: Metadata,
    ): Promise<UserServiceUpdateResponse> {
        const user = await this.appService.update(request.id, {
            name: request.name,
            email: request.email,
            password: request.password,
        });
        return { user };
    }

    async delete(
        request: UserServiceDeleteRequest,
        metadata?: Metadata,
    ): Promise<UserServiceDeleteResponse> {
        const user = await this.appService.delete(request.id);
        return { user };
    }

    async add(
        request: UserServiceAddRequest,
        metadata?: Metadata,
    ): Promise<UserServiceAddResponse> {
        const user = await this.appService.create({
            name: request.name,
            email: request.email,
            password: request.password,
        });
        return { user };
    }
}
