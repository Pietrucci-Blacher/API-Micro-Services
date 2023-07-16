import { ClientProviderOptions, Transport } from '@nestjs/microservices';
import {
    WEATHER_SERVICE_NAME,
    WEATHER_V1_PACKAGE_NAME,
} from '../stubs/weather/v1/weather';
import { ChannelCredentials } from '@grpc/grpc-js';
import { join } from 'path';

export const WeatherGrpcOptions: ClientProviderOptions = {
    name: WEATHER_SERVICE_NAME,
    transport: Transport.GRPC,
    options: {
        url: 'localhost:6002',
        package: WEATHER_V1_PACKAGE_NAME,
        loader: {
            includeDirs: [join(__dirname, '../proto')],
        },
        protoPath: [join(__dirname, '../proto/weather/v1/weather.proto')],
        credentials: ChannelCredentials.createInsecure(),
    },
};
