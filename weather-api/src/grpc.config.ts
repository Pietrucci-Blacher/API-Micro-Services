import { GrpcOptions, Transport } from '@nestjs/microservices';
import { HERO_V1ALPHA_PACKAGE_NAME } from './stubs/weather/v1/weather';
import { join } from 'path';
import { addReflectionToGrpcConfig } from 'nestjs-grpc-reflection';
export const grpcConfig = addReflectionToGrpcConfig({
    transport: Transport.GRPC,
    options: {
        url: '0.0.0.0:6000',
        package: HERO_V1ALPHA_PACKAGE_NAME,
        protoPath: join(__dirname, 'proto/weather/v1/weather.proto'),
    },
}) as GrpcOptions;
