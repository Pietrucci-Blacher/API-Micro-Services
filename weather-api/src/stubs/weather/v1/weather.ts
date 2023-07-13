/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "weather.v1";

export interface Weather {
  id: string;
  location: string;
  temperature: number;
  humidity: number;
  pressure: number;
}

export interface WeatherServiceGetRequest {
  id: string;
  location: string;
}

export interface WeatherServiceGetResponse {
  weathers: Weather[];
}

export interface WeatherServiceAddRequest {
  location: string;
  temperature: number;
  humidity: number;
  pressure: number;
}

export interface WeatherServiceAddResponse {
  weather: Weather | undefined;
}

export interface WeatherServiceUpdateRequest {
  location: string;
  temperature: number;
  humidity: number;
  pressure: number;
}

export interface WeatherServiceUpdateResponse {
  weather: Weather | undefined;
}

export interface WeatherServiceDeleteRequest {
  id: string;
  location: string;
}

export interface WeatherServiceDeleteResponse {
  weather: Weather | undefined;
}

export const WEATHER_V1_PACKAGE_NAME = "weather.v1";

export interface WeatherServiceClient {
  get(request: WeatherServiceGetRequest, metadata?: Metadata): Observable<WeatherServiceGetResponse>;

  add(request: WeatherServiceAddRequest, metadata?: Metadata): Observable<WeatherServiceAddResponse>;

  update(request: WeatherServiceUpdateRequest, metadata?: Metadata): Observable<WeatherServiceUpdateResponse>;

  delete(request: WeatherServiceDeleteRequest, metadata?: Metadata): Observable<WeatherServiceDeleteResponse>;
}

export interface WeatherServiceController {
  get(
    request: WeatherServiceGetRequest,
    metadata?: Metadata,
  ): Promise<WeatherServiceGetResponse> | Observable<WeatherServiceGetResponse> | WeatherServiceGetResponse;

  add(
    request: WeatherServiceAddRequest,
    metadata?: Metadata,
  ): Promise<WeatherServiceAddResponse> | Observable<WeatherServiceAddResponse> | WeatherServiceAddResponse;

  update(
    request: WeatherServiceUpdateRequest,
    metadata?: Metadata,
  ): Promise<WeatherServiceUpdateResponse> | Observable<WeatherServiceUpdateResponse> | WeatherServiceUpdateResponse;

  delete(
    request: WeatherServiceDeleteRequest,
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
