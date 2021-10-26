import {
  Comment,
  Formation,
  Post,
  Skills,
  User,
  UserSkill,
} from '.prisma/client';
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

type IFormation = Omit<Formation, 'id'>;

interface FormationHandlers {
  getAll: RequestHandler<Record<string, never>, Formation[], null>;
  post: RequestHandler<
    Record<string, never>,
    Formation | Error,
    IFormationPost
  >;
  put: RequestHandler<{ id: string }, null, IFormation>;
  getOne: RequestHandler<{ id: string }, null, IFormation>;
  delete: RequestHandler<{ id: string }, null, null>;
}

type ISkills = Omit<Skills, 'id'>;

interface SkillsHandlers {
  getAll: RequestHandler<Record<string, never>, Skills[]>;
  getOne: RequestHandler<Record<string, never>, Skills | null>;
  post: RequestHandler<Record<string, never>, ISkills>;
  put: RequestHandler<{ id: string }, null, ISkills>;
  delete: RequestHandler<{ id: string }, null, null>;
}

type IUserSkillsPost = Omit<UserSkill, 'id'>;
type IUserSkillsPut = Omit<UserSkill, 'id', 'userId'>;
type IUserSkillsResponse = Omit<
  UserSkill,
  'userId',
  'id',
  'createdAt',
  'updatedAt'
>;

interface UserSkillsHandlers {
  post: RequestHandler<Record<string, never>, IUserSkillsPost>;
  getUserSkills: RequestHandler<Record<string, never>, IUserSkillsResponse[]>;
  getOne: RequestHandler<Record<string, never>, IUserResponse | null>;
  update: RequestHandler<{ id: string }, null, IUserSkillsPut>;
  delete: RequestHandler<{ id: string }, null, null>;
}

type ICreatePost = Omit<Post, 'id', 'comments', 'likes'>;
type IUserPosts = Omit<Post, 'id', 'userId'>;
interface PostHandlers {
  getAll: RequestHandler<Record<string, never>, Post[]>;
  getOne: RequestHandler<Record<string, never>, Post | null>;
  post: RequestHandler<Record<string, never>, ICreatePost>;
  update: RequestHandler<Record<string, never>, IUserPosts>;
  delete: RequestHandler<Record<string, never>, Post>;
}

interface UserPostHandlers {
  getUserPost: RequestHandler<Record<string, never>, IUserPosts[]>;
}

interface CommentsHandlers {
  getAll: RequestHandler<Record<string, never>, Comment[]>;
  post: RequestHandler<Record<String, never>, Comment | null>;
  delete: RequestHandler<Record<string, never>, Comment>;
}

interface IAuthBoby {
  username: string;
  password: string;
}
