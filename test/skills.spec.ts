import request from 'supertest';
import app from '../src/app';
import { prisma } from '../prisma/prismaClient';

const sampleSkills = {
  name: 'MongoDb',
};

let skillId: string;

describe('SKILLS ROUTES', () => {
  it('should create a new skill 🧪 /api/skills', async () => {
    const res = await request(app)
      .post('/api/skills')
      .send(sampleSkills)
      .expect(201)
      .expect('Content-Type', /json/);

    skillId = res.body.id;

    expect(res.body).toHaveProperty('name', sampleSkills.name);
  });

  it('should get the SKILLS list 🧪 /api/skills', async () => {
    const res = await request(app)
      .get('/api/skills')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(Array.isArray(res.body)).toBe(true);
  });

  it(`should update the created skills title 🧪 /api/skills/:id`, async () => {
    await request(app)
      .put(`/api/skills/${skillId}`)
      .send({
        name: 'modifyName',
      })
      .expect(204);

    const res = await request(app).get(`/api/skills/${skillId}`);

    expect(res.body).toHaveProperty('name', 'modifyName');
  });

  it(`should delete the created skill🧪 /api/skills/id`, async () => {
    await request(app).delete(`/api/skills/${skillId}`).expect(204);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
