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
  Likes,
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
  put: RequestHandler<{ id: string }, IFormation>;
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
  post: RequestHandler<
    Record<string, never>,
    IUserSkillsPost | APIError,
    IUserSkillsPost
  >;
  getUserSkills: RequestHandler<Record<string, never>, IUserSkillsResponse[]>;
  getOne: RequestHandler<Record<string, never>, IUserResponse | null>;
  update: RequestHandler<{ id: string }, null, IUserSkillsPut>;
  delete: RequestHandler<{ id: string }, null | APIError, null>;
}

type ICreatePost = Omit<Post, 'id', 'comments', 'likes', 'user'>;
type IUserPosts = Omit<Post, 'id', 'userId'>;
interface PostHandlers {
  getAll: RequestHandler<Record<string, never>, Post[] | string>;
  getOne: RequestHandler<Record<string, never>, Post | null>;
  post: RequestHandler<Record<string, never>, ICreatePost>;
  update: RequestHandler<Record<string, never>, IUserPosts>;
  delete: RequestHandler<Record<string, never>, APIError, Post>;
  getComments: RequestHandler<{ id: string }, Comment[]>;
  getLikes: RequestHandler<{ id: string }, Likes[] | null>;
}

interface UserPostHandlers {
  getUserPost: RequestHandler<Record<string, never>, IUserPosts[]>;
}

interface CommentsHandlers {
  getAll: RequestHandler<Record<string, never>, Comment[]>;
  post: RequestHandler<Record<string, never>, Comment | APIError, Comment>;
  delete: RequestHandler<Record<string, never>, APIError, Comment>;
  deleteMany: RequestHandler<Record<string, never>, Comment[]>;
}

interface MediaIconHandlers {
  getAll: RequestHandler<Record<string, never>, MediaIcon[]>;
  getOne: RequestHandler<Record<string, never>, MediaIcon | null>;
  post: RequestHandler<Record<string, never>, MediaIcon>;
  update: RequestHandler<Record<string, never>, MediaIcon>;
  delete: RequestHandler<Record<string, never>, MediaIcon>;
}

type IUserMediaLinkPost = Omit<MediaLink, 'id'>;
interface MediaLinkHandlers {
  getUserMediaLinks: RequestHandler<Record<string, never>, MediaLink[]>;
  post: RequestHandler<
    Record<string, never>,
    IUserMediaLinkPost | APIError,
    IUserMediaLinkPost
  >;
  update: RequestHandler<
    Record<string, never>,
    MediaLink | APIError,
    MediaLink
  >;
  delete: RequestHandler<Record<string, never>, APIError, MediaLink>;
}

interface LikesHandlers {
  post: RequestHandler<Record<string, never>, Likes | APIError, Likes>;
  update: RequestHandler<Record<string, never>, Likes | APIError, Likes>;
  delete: RequestHandler<Record<string, never>, APIError, Likes>;
  deleteMany: RequestHandler<Record<string, never>, Likes[]>;
}

interface TopicsHandlers {
  getAll: RequestHandler<Record<string, never>, Topics[]>;
  getOne: RequestHandler<Record<string, never>, Topics | null>;
  getPosts: RequestHandler<Record<string, never>, Post[]>;
  post: RequestHandler<Record<string, never>, Topics>;
  update: RequestHandler<Record<string, never>, Topics>;
  delete: RequestHandler<Record<string, never>, APIError, Topics>;
}

interface postRegisterHandler {
  post: RequestHandler<
    Record<string, never>,
    PostRegister | APIError,
    PostRegister
  >;
  getUsersPostSaved: RequestHandler<Record<string, never>, PostRegister[]>;
  delete: RequestHandler<Record<string, never>, APIError, PostRegister>;
}

interface followsHandler {
  post: RequestHandler<Record<string, never>, Follows | APIError, Follows>;
  getUserFollowers: RequestHandler<Record<string, never>, Follows[]>;
  getUserFollowing: RequestHandler<Record<string, never>, Follows[]>;
  delete: RequestHandler<Record<string, never>, APIError>;
}

interface ConversationHandler {
  post: RequestHandler<
    Record<string, never>,
    Conversation | APIError,
    Conversation
  >;
  getUserConversations: RequestHandler<Record<string, never>, Conversation[]>;
}

interface IAuthBoby {
  username: string;
  password: string;
}

interface APIError {
  type: string;
  message: string;
}
