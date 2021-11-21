import { IAuthBoby, IUserResponse } from 'env';
import { NextFunction, RequestHandler } from 'express';

export interface AuthHandler {
  login: RequestHandler<
    Record<string, never>,
    IUserResponse | Error,
    IAuthBoby
  >;
  logout: RequestHandler<
    Record<string, never>,
    { message: string } | Error,
    null
  >;
  me: RequestHandler<Record<string, never>, IUserResponse, null>;
  checkToken: RequestHandler<Record<string, never>, NextFunction, null>;
}
