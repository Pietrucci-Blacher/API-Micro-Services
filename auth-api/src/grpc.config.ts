import { GrpcOptions, Transport } from '@nestjs/microservices';
import { AUTH_V1_PACKAGE_NAME } from './stubs/auth/v1/auth';
import { join } from 'path';
import { addReflectionToGrpcConfig } from 'nestjs-grpc-reflection';

export const grpcConfig = addReflectionToGrpcConfig({
    transport: Transport.GRPC,
    options: {
        url: '0.0.0.0:6001',
        package: AUTH_V1_PACKAGE_NAME,
        protoPath: join(__dirname, 'proto/auth/v1/auth.proto'),
    },
}) as GrpcOptions;
