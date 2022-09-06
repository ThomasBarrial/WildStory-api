import request from 'supertest';
import app from '../src/app';
import { prisma } from '../prisma/prismaClient';

let postId: string;

describe('POST ROUTES', () => {
  it('should get a post list 🧪 api/post/?limit=5&offset=0', async () => {
    const res = await request(app)
      .get('/api/post')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get one post 🧪 /api/post/:id', async () => {
    await request(app)
      .get(`/api/post/${postId}`)
      .expect(200)
      .expect('Content-Type', /json/);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
