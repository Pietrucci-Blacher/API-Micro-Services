import { ClientProviderOptions, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE_NAME, AUTH_V1_PACKAGE_NAME } from '../stubs/auth/v1/auth';
import { ChannelCredentials } from '@grpc/grpc-js';
import { join } from 'path';

export const AuthGrpcOptions: ClientProviderOptions = {
    name: AUTH_SERVICE_NAME,
    transport: Transport.GRPC,
    options: {
        url: 'localhost:6001',
        package: AUTH_V1_PACKAGE_NAME,
        loader: {
            includeDirs: [join(__dirname, '../proto')],
        },
        protoPath: [join(__dirname, '../proto/auth/v1/auth.proto')],
        credentials: ChannelCredentials.createInsecure(),
    },
};
