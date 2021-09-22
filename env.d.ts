import { Formation, User } from '.prisma/client';
import { RequestHandler } from 'express';

type IUserPost = Omit<User, 'id'>;
type IUserPut = Omit<User, 'id' | 'password'>;
type IUserResponse = Omit<User, 'password', 'createdAt', 'updatedAt'>;

interface UserHandlers {
  getAll: RequestHandler<Record<string, never>, IUserResponse[], null>;
  getOne: RequestHandler<{ id: string }, IUserResponse, null>;
  post: RequestHandler<Record<string, never>, IUserResponse | Error, IUserPost>;
  put: RequestHandler<{ id: string }, null, IUserPut>;
  delete: RequestHandler<{ id: string }, null, null>;
}

type IFormation = Omit<Formation, 'id', 'createdAt', 'updatedAt'>;

type IFormationPut = Omit<Formation, 'id', 'createdAt', 'updatedAt', 'name'>;

interface FormationHandlers {
  getAll: RequestHandler<Record<string, never>, Formation[], null>;
  post: RequestHandler<
    Record<string, never>,
    Formation | Error,
    IFormationPost
  >;
  put: RequestHandler<{ id: string }, null, IFormationPut>;
  getOne: RequestHandler<{ id: string }, null, IFormation>;
  delete: RequestHandler<{ id: string }, null, null>;
}
