import { GrpcOptions, Transport } from '@nestjs/microservices';
import { USER_V1_PACKAGE_NAME } from './stubs/user/v1/user';
import { join } from 'path';
import { addReflectionToGrpcConfig } from 'nestjs-grpc-reflection';

export const grpcConfig = addReflectionToGrpcConfig({
    transport: Transport.GRPC,
    options: {
        url: '0.0.0.0:6000',
        package: USER_V1_PACKAGE_NAME,
        protoPath: join(__dirname, 'proto/user/v1/user.proto'),
    },
}) as GrpcOptions;
