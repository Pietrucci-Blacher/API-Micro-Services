import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { AuthGrpcOptions } from './grpc.config';

@Module({
    imports: [ClientsModule.register([AuthGrpcOptions])],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule {}
