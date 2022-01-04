import {
  Comment,
  Formation,
  Post,
  Skills,
  User,
  UserSkill,
  MediaIcon,
  MediaLink,
  Topics,
  PostRegister,
} from '.prisma/client';
import { RequestHandler } from 'express';

type IUserPost = Omit<User, 'id'>;
type IUserPut = Omit<User, 'id' | 'password', 'createdAt', 'updatedAt'>;
type IUserResponse = Omit<User, 'password', 'createdAt', 'updatedAt'>;
type IUserFormation = Omit<
  User,
  'password',
  'createdAt',
  'updatedAt',
  'email',
  'role'
>;
interface IPassword {
  oldPassword?: string;
  password?: string;
}

interface UserHandlers {
  getAll: RequestHandler<Record<string, never>, IUserResponse[], null>;
  getOne: RequestHandler<{ id: string }, IUserResponse, null>;
  post: RequestHandler<Record<string, never>, IUserResponse | Error, IUserPost>;
  put: RequestHandler<{ id: string }, IUserPut | APIError, IUserPut>;
  delete: RequestHandler<{ id: string }, null, null>;
  editePassword: RequestHandler<
    { id: string },
    IPassword | APIError,
    IUserResponse
  >;
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
  getUsers: RequestHandler<Record<string, never>, { id: string }[]>;
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

type ICreatePost = Omit<Post, 'id', 'comments', 'likes', 'user'>;
type IUserPosts = Omit<Post, 'id', 'userId'>;
interface PostHandlers {
  getAll: RequestHandler<Record<string, never>, Post[]>;
  getOne: RequestHandler<Record<string, never>, Post | null>;
  post: RequestHandler<Record<string, never>, ICreatePost>;
  update: RequestHandler<Record<string, never>, IUserPosts>;
  delete: RequestHandler<Record<string, never>, Post>;
  getComments: RequestHandler<{ id: string }, Comment[]>;
  getLikes: RequestHandler<{ id: string }, Likes[]>;
}

interface UserPostHandlers {
  getUserPost: RequestHandler<Record<string, never>, IUserPosts[]>;
}

interface CommentsHandlers {
  getAll: RequestHandler<Record<string, never>, Comment[]>;
  post: RequestHandler<Record<string, never>, Comment | null>;
  delete: RequestHandler<Record<string, never>, Comment>;
  deleteMany: RequestHandler<Record<string, never>, Comment[]>;
}

interface MediaIconHandlers {
  getAll: RequestHandler<Record<string, never>, MediaIcon[]>;
  getOne: RequestHandler<Record<string, never>, MediaIcon | null>;
  post: RequestHandler<Record<string, never>, MediaIcon>;
  update: RequestHandler<Record<string, never>, MediaIcon>;
  delete: RequestHandler<Record<string, never>, MediaIcon>;
}

interface MediaLinkHandlers {
  getUserMediaLinks: RequestHandler<Record<string, never>, MediaLink[]>;
  post: RequestHandler<Record<string, never>, MediaLink>;
  update: RequestHandler<Record<string, never>, MediaLink>;
  delete: RequestHandler<Record<string, never>, MediaLink>;
}

interface LikesHandlers {
  post: RequestHandler<Record<string, never>, Likes>;
  update: RequestHandler<Record<string, never>, Likes>;
  delete: RequestHandler<Record<string, never>, Likes>;
  deleteMany: RequestHandler<Record<string, never>, Likes[]>;
}

interface TopicsHandlers {
  getAll: RequestHandler<Record<string, never>, Topics[]>;
  getOne: RequestHandler<Record<string, never>, Topics | null>;
  getPosts: RequestHandler<Record<string, never>, Post[]>;
  post: RequestHandler<Record<string, never>, Topics>;
}

interface postRegisterHandler {
  post: RequestHandler<Record<string, never>, PostRegister>;
  getUsersPostSaved: RequestHandler<Record<string, never>, PostRegister[]>;
  delete: RequestHandler<Record<string, never>, PostRegister>;
}

interface IAuthBoby {
  username: string;
  password: string;
}

interface APIError {
  type: string;
  message: string;
}
