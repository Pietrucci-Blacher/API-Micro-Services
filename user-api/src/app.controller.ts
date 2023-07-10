import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata } from '@grpc/grpc-js';
import { HeroCRUDServiceControllerMethods } from './stubs/user/v1/user';

@Controller()
@HeroCRUDServiceControllerMethods()
export class AppController {
    constructor(private readonly appService: AppService) {}
}
