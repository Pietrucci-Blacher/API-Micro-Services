import {
    ClientProviderOptions,
    GrpcOptions,
    Transport,
} from '@nestjs/microservices';
import { USER_SERVICE_NAME, USER_V1_PACKAGE_NAME } from '../stubs/user/v1/user';
import { ChannelCredentials } from '@grpc/grpc-js';
import { join } from 'path';

export const userGrpcOptions: ClientProviderOptions = {
    name: USER_SERVICE_NAME,
    transport: Transport.GRPC,
    options: {
        url: 'localhost:6000',
        package: USER_V1_PACKAGE_NAME,
        loader: {
            includeDirs: [join(__dirname, '../proto')],
        },
        protoPath: [join(__dirname, '../proto/user/v1/user.proto')],
        credentials: ChannelCredentials.createInsecure(),
    },
};
