/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "user.v1";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface UserServiceGetRequest {
  id?: string | undefined;
  name?: string | undefined;
  email?: string | undefined;
}

export interface UserServiceGetResponse {
  users: User[];
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

export const USER_V1_PACKAGE_NAME = "user.v1";

export interface UserServiceClient {
  get(request: UserServiceGetRequest, metadata?: Metadata): Observable<UserServiceGetResponse>;

  add(request: UserServiceAddRequest, metadata?: Metadata): Observable<UserServiceAddResponse>;

  update(request: UserServiceUpdateRequest, metadata?: Metadata): Observable<UserServiceUpdateResponse>;

  delete(request: UserServiceDeleteRequest, metadata?: Metadata): Observable<UserServiceDeleteResponse>;
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
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["get", "add", "update", "delete"];
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
