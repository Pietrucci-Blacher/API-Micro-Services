import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { userGrpcOptions } from './grpc.config';
import { ClientsModule } from '@nestjs/microservices';

@Module({
    imports: [ClientsModule.register([userGrpcOptions])],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
