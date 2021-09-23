import request from 'supertest';
import app from '../src/app';
import { prisma } from '../prisma/prismaClient';

const sampleUserSkills = {
  skillId: '0aa26e2a-63de-4502-8377-c8840596f236',
  userId: '78cbcaf6-8969-45e8-884a-1d3fadac30a0',
  note: 3,
};

describe('USERSKILLS ROUTES', () => {
  it('should get the skills list of a user 🧪 /skills/userId', async () => {
    const id = sampleUserSkills.userId;

    const res = await request(app)
      .get(`/userskills/${id}`)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get the userSkill with id 🧪 /skills/oneskill/:id', async () => {
    const { id } = await prisma.userSkill.create({
      data: sampleUserSkills,
    });
    const res = await request(app)
      .get(`/userskills/oneskill/${id}`)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(res.body).toHaveProperty('note', sampleUserSkills.note);
  });

  it('should create a new user 🧪 /skills', async () => {
    const res = await request(app)
      .post('/userskills')
      .send(sampleUserSkills)
      .expect(201)
      .expect('Content-Type', /json/);

    expect(res.body).toHaveProperty('skillId', sampleUserSkills.skillId);
    expect(res.body).toHaveProperty('userId', sampleUserSkills.userId);
    expect(res.body).toHaveProperty('note', sampleUserSkills.note);
  });

  it(`should update the created userSkill title 🧪 /skills/:id`, async () => {
    const { id } = await prisma.userSkill.create({
      data: sampleUserSkills,
    });

    await request(app)
      .put(`/userskills/${id}`)
      .send({
        note: 5,
      })
      .expect(204);

    const res = await request(app).get(`/userskills/oneskill/${id}`);

    expect(res.body).toHaveProperty('note', 5);
  });

  it(`should delete the created skill🧪 /skills/id`, async () => {
    const { id } = await prisma.userSkill.create({
      data: sampleUserSkills,
    });

    await request(app).delete(`/userskills/${id}`).expect(204);
  });
});
