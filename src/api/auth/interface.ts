import { NextFunction, RequestHandler } from 'express';
import { IAuthBoby, IUserResponse } from '../../../env';

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
