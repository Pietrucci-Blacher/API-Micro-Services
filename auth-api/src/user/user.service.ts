import { OnModuleInit } from '@nestjs/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
    USER_SERVICE_NAME,
    UserServiceClient,
    UserServiceGetRequest,
    UserServiceGetResponse,
    UserServiceAddRequest,
    UserServiceAddResponse,
    User,
} from '../stubs/user/v1/user';
import { firstValueFrom } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

@Injectable()
export class UserService implements OnModuleInit {
    private userService: UserServiceClient;

    constructor(@Inject(USER_SERVICE_NAME) private client: ClientGrpc) {}

    onModuleInit() {
        this.userService =
            this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
    }

    async get(
        req: UserServiceGetRequest,
        md: Record<string, any>,
    ): Promise<User> {
        const meta = new Metadata();
        Object.entries(md).map(([k, v]) => meta.add(k, v));
        const res: UserServiceGetResponse = await firstValueFrom(
            this.userService.get(req, meta) as any,
        );

        return res.users?.[0];
    }

    async add(req: UserServiceAddRequest): Promise<User> {
        const res: UserServiceGetResponse = await firstValueFrom(
            this.userService.add(req) as any,
        );

        return res.users?.[0];
    }
}
