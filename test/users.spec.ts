import request from 'supertest';
import app from '../src/app';
import { prisma } from '../prisma/prismaClient';

describe('USERS ROUTES', () => {
  it('should get the users list 🧪 /api/users', async () => {
    const res = await request(app)
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(Array.isArray(res.body)).toBe(true);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
