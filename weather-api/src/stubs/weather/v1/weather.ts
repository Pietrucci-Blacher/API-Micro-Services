/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "weather.v1";

export interface Weather {
  temperature: number;
  humidity: number;
  pressure: number;
}

export interface WeatherServiceGetRequest {
  location: string;
}

export interface WeatherServiceGetResponse {
  weather: Weather | undefined;
}

export const WEATHER_V1_PACKAGE_NAME = "weather.v1";

export interface WeatherServiceClient {
  get(request: WeatherServiceGetRequest, metadata?: Metadata): Observable<WeatherServiceGetResponse>;
}

export interface WeatherServiceController {
  get(
    request: WeatherServiceGetRequest,
    metadata?: Metadata,
  ): Promise<WeatherServiceGetResponse> | Observable<WeatherServiceGetResponse> | WeatherServiceGetResponse;
}

export function WeatherServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["get"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("WeatherService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("WeatherService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const WEATHER_SERVICE_NAME = "WeatherService";
