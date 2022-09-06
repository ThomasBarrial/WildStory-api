import request from 'supertest';
import app from '../src/app';
import { prisma } from '../prisma/prismaClient';

describe('SKILLS ROUTES', () => {
  it('should get the SKILLS list 🧪 /api/skills', async () => {
    const res = await request(app)
      .get('/api/skills')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(Array.isArray(res.body)).toBe(true);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
