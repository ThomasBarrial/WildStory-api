import request from 'supertest';
import app from '../src/app';
import { prisma } from '../prisma/prismaClient';

describe('MEDIA ICON ROUTES', () => {
  it('should get the mediaicons list 🧪 /mediaicons', async () => {
    const res = await request(app)
      .get('/api/mediaicons')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(Array.isArray(res.body)).toBe(true);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
