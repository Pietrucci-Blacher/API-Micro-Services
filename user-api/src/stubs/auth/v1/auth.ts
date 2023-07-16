/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "auth.v1";

export interface Token {
  id: string;
  accessToken: string;
  refreshToken: string;
  userId: string;
}

export interface AuthServiceLoginRequest {
  email: string;
  password: string;
}

export interface AuthServiceLoginResponse {
  accessToken?: string | undefined;
  refreshToken?: string | undefined;
  success?: boolean | undefined;
  message?: string | undefined;
}

export interface AuthServiceRegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthServiceRegisterResponse {
  success: boolean;
  message?: string | undefined;
}

export interface AuthServiceLogoutRequest {
  token: string;
}

export interface AuthServiceLogoutResponse {
  success: boolean;
  message?: string | undefined;
}

export interface IsAuthenticatedRequest {
  accessToken: string;
}

export interface IsAuthenticatedResponse {
  userId?: string | undefined;
  success?: boolean | undefined;
  message?: string | undefined;
}

export const AUTH_V1_PACKAGE_NAME = "auth.v1";

export interface AuthServiceClient {
  login(request: AuthServiceLoginRequest, metadata?: Metadata): Observable<AuthServiceLoginResponse>;

  register(request: AuthServiceRegisterRequest, metadata?: Metadata): Observable<AuthServiceRegisterResponse>;

  logout(request: AuthServiceLogoutRequest, metadata?: Metadata): Observable<AuthServiceLogoutResponse>;

  isAuthenticated(request: IsAuthenticatedRequest, metadata?: Metadata): Observable<IsAuthenticatedResponse>;
}

export interface AuthServiceController {
  login(
    request: AuthServiceLoginRequest,
    metadata?: Metadata,
  ): Promise<AuthServiceLoginResponse> | Observable<AuthServiceLoginResponse> | AuthServiceLoginResponse;

  register(
    request: AuthServiceRegisterRequest,
    metadata?: Metadata,
  ): Promise<AuthServiceRegisterResponse> | Observable<AuthServiceRegisterResponse> | AuthServiceRegisterResponse;

  logout(
    request: AuthServiceLogoutRequest,
    metadata?: Metadata,
  ): Promise<AuthServiceLogoutResponse> | Observable<AuthServiceLogoutResponse> | AuthServiceLogoutResponse;

  isAuthenticated(
    request: IsAuthenticatedRequest,
    metadata?: Metadata,
  ): Promise<IsAuthenticatedResponse> | Observable<IsAuthenticatedResponse> | IsAuthenticatedResponse;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["login", "register", "logout", "isAuthenticated"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const AUTH_SERVICE_NAME = "AuthService";
