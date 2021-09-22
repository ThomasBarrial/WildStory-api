import { RequestHandler } from 'express';

type IUserPost = Omit<User, 'id'>;
type IUserPut = Omit<User, 'id' | 'password'>;
type IUserResponse = Omit<User, 'password'>;

interface UserHandlers {
  getAll: RequestHandler<Record<string, never>, IUserResponse[], null>;
  getOne: RequestHandler<{ id: string }, IUserResponse, null>;
  post: RequestHandler<Record<string, never>, IUserResponse | Error, IUserPost>;
  put: RequestHandler<{ id: string }, null, IUserPut>;
  delete: RequestHandler<{ id: string }, null, null>;
}
