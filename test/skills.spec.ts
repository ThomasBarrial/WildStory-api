import request from 'supertest';
import app from '../src/app';
import { prisma } from '../prisma/prismaClient';

const sampleSkills = {
  name: 'MongoDb',
};

describe('SKILLS ROUTES', () => {
  it('should get the SKILLS list 🧪 /skills', async () => {
    const res = await request(app)
      .get('/skills')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should create a new skill 🧪 /skills', async () => {
    const res = await request(app)
      .post('/skills')
      .send(sampleSkills)
      .expect(201)
      .expect('Content-Type', /json/);

    expect(res.body).toHaveProperty('name', sampleSkills.name);
  });

  it(`should update the created skills title 🧪 /skills/:id`, async () => {
    const { id } = await prisma.skills.create({
      data: sampleSkills,
    });

    await request(app)
      .put(`/skills/${id}`)
      .send({
        name: 'modifyName',
      })
      .expect(204);

    const res = await request(app).get(`/skills/${id}`);

    expect(res.body).toHaveProperty('name', 'modifyName');
  });

  it(`should delete the created skill🧪 /skills/id`, async () => {
    const { id } = await prisma.skills.create({
      data: sampleSkills,
    });

    await request(app).delete(`/skills/${id}`).expect(204);
  });
});
