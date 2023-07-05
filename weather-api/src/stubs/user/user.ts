/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "hero.v1alpha";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface UserServiceGetRequest {
  id: string;
}

export interface UserServiceGetResponse {
  user: User[];
}

export interface UserServiceAddRequest {
  name: string;
  email: string;
  password: string;
}

export interface UserServiceAddResponse {
  user: User | undefined;
}

export interface UserServiceUpdateRequest {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface UserServiceUpdateResponse {
  user: User | undefined;
}

export interface UserServiceDeleteRequest {
  id: string;
}

export interface UserServiceDeleteResponse {
  user: User | undefined;
}

export interface UserServiceLoginRequest {
  email: string;
  password: string;
}

export interface UserServiceLoginResponse {
  token: string;
}

export const HERO_V1ALPHA_PACKAGE_NAME = "hero.v1alpha";

export interface UserServiceClient {
  get(request: UserServiceGetRequest, metadata?: Metadata): Observable<UserServiceGetResponse>;

  add(request: UserServiceAddRequest, metadata?: Metadata): Observable<UserServiceAddResponse>;

  update(request: UserServiceUpdateRequest, metadata?: Metadata): Observable<UserServiceUpdateResponse>;

  delete(request: UserServiceDeleteRequest, metadata?: Metadata): Observable<UserServiceDeleteResponse>;

  login(request: UserServiceLoginRequest, metadata?: Metadata): Observable<UserServiceLoginResponse>;
}

export interface UserServiceController {
  get(
    request: UserServiceGetRequest,
    metadata?: Metadata,
  ): Promise<UserServiceGetResponse> | Observable<UserServiceGetResponse> | UserServiceGetResponse;

  add(
    request: UserServiceAddRequest,
    metadata?: Metadata,
  ): Promise<UserServiceAddResponse> | Observable<UserServiceAddResponse> | UserServiceAddResponse;

  update(
    request: UserServiceUpdateRequest,
    metadata?: Metadata,
  ): Promise<UserServiceUpdateResponse> | Observable<UserServiceUpdateResponse> | UserServiceUpdateResponse;

  delete(
    request: UserServiceDeleteRequest,
    metadata?: Metadata,
  ): Promise<UserServiceDeleteResponse> | Observable<UserServiceDeleteResponse> | UserServiceDeleteResponse;

  login(
    request: UserServiceLoginRequest,
    metadata?: Metadata,
  ): Promise<UserServiceLoginResponse> | Observable<UserServiceLoginResponse> | UserServiceLoginResponse;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["get", "add", "update", "delete", "login"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_SERVICE_NAME = "UserService";
