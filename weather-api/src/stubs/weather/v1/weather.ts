/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "hero.v1alpha";

export interface Weather {
  temperature: number;
  humidity: number;
  pressure: number;
}

export interface WeatherServiceGetRequest {
  location: string;
}

export interface WeatherServiceGetResponse {
  weather: Weather[];
}

export interface WeatherServiceAddRequest {
  temperature: string;
  humidity: string;
  pressure: string;
}

export interface WeatherServiceAddResponse {
  weather: Weather | undefined;
}

export interface WeatherServiceUpdateRequest {
  temperature: string;
  humidity: string;
  pressure: string;
}

export interface WeatherServiceUpdateResponse {
  weather: Weather | undefined;
}

export interface WeatherServiceDeleteRequest {
  location: string;
}

export interface WeatherServiceDeleteResponse {
  weather: Weather | undefined;
}

export const HERO_V1ALPHA_PACKAGE_NAME = "hero.v1alpha";

export interface WeatherServiceClient {
  get(request: WeatherServiceGetRequest, metadata?: Metadata): Observable<WeatherServiceGetResponse>;

  add(request: Weather, metadata?: Metadata): Observable<WeatherServiceAddResponse>;

  update(request: Weather, metadata?: Metadata): Observable<WeatherServiceUpdateResponse>;

  delete(request: Weather, metadata?: Metadata): Observable<WeatherServiceDeleteResponse>;
}

export interface WeatherServiceController {
  get(
    request: WeatherServiceGetRequest,
    metadata?: Metadata,
  ): Promise<WeatherServiceGetResponse> | Observable<WeatherServiceGetResponse> | WeatherServiceGetResponse;

  add(
    request: Weather,
    metadata?: Metadata,
  ): Promise<WeatherServiceAddResponse> | Observable<WeatherServiceAddResponse> | WeatherServiceAddResponse;

  update(
    request: Weather,
    metadata?: Metadata,
  ): Promise<WeatherServiceUpdateResponse> | Observable<WeatherServiceUpdateResponse> | WeatherServiceUpdateResponse;

  delete(
    request: Weather,
    metadata?: Metadata,
  ): Promise<WeatherServiceDeleteResponse> | Observable<WeatherServiceDeleteResponse> | WeatherServiceDeleteResponse;
}

export function WeatherServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["get", "add", "update", "delete"];
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
