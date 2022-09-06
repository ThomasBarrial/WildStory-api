import request from 'supertest';
import app from '../src/app';
import { prisma } from '../prisma/prismaClient';

describe('FORMATIONS ROUTES', () => {
  it('should get the formations list 🧪 /formations', async () => {
    const res = await request(app)
      .get('/api/formations')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(Array.isArray(res.body)).toBe(true);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
