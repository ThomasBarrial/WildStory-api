import request from 'supertest';
import app from '../src/app';
import { prisma } from '../prisma/prismaClient';

const sampleUser = {
  username: 'UserTest2',
  email: 'UserTest2@gmail.com',
  password: '12345',
  city: 'Londre',
  birthDate: '06/10/95',
  avatarUrl:
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
  landimageUrl:
    'https://images.unsplash.com/photo-1599725055007-b33b6755ef6f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1329&q=80',
  idFormation: 'a83df665-47dc-4f3e-83d9-254db9dc28c8',
};

let userSkillId: string;
let userId: string;
let skillId: string;
let note: number;

describe('USERSKILLS ROUTES', () => {
  it('should create a new user 🧪 /users', async () => {
    const res = await request(app)
      .post('/users')
      .send(sampleUser)
      .expect(201)
      .expect('Content-Type', /json/);

    userId = res.body.id;

    expect(res.body).toHaveProperty('username', sampleUser.username);
    expect(res.body).toHaveProperty('email', sampleUser.email);
  });
  it('should create a new skill 🧪 /skills', async () => {
    const sampleSkills = {
      name: 'testSkill',
    };
    const res = await request(app)
      .post('/skills')
      .send(sampleSkills)
      .expect(201)
      .expect('Content-Type', /json/);

    skillId = res.body.id;

    expect(res.body).toHaveProperty('name', sampleSkills.name);
  });
  it('should create a new user Skill 🧪 /skills', async () => {
    const sampleUserSkills = {
      skillId,
      userId,
      note: 3,
    };

    const res = await request(app)
      .post('/userskills')
      .send(sampleUserSkills)
      .expect(201)
      .expect('Content-Type', /json/);

    userSkillId = res.body.id;
    note = res.body.note;

    expect(res.body).toHaveProperty('skillId', sampleUserSkills.skillId);
    expect(res.body).toHaveProperty('userId', sampleUserSkills.userId);
    expect(res.body).toHaveProperty('note', sampleUserSkills.note);
  });

  it('should get the skills list of a user 🧪 /skills/userId', async () => {
    const res = await request(app)
      .get(`/userskills/${userId}`)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get the userSkill with id 🧪 /skills/oneskill/:id', async () => {
    const res = await request(app)
      .get(`/userskills/oneskill/${userSkillId}`)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(res.body).toHaveProperty('note', note);
  });

  it(`should update the created userSkill title 🧪 /skills/:id`, async () => {
    await request(app)
      .put(`/userskills/${userSkillId}`)
      .send({
        note: 5,
      })
      .expect(204);

    const res = await request(app).get(`/userskills/oneskill/${userSkillId}`);

    expect(res.body).toHaveProperty('note', 5);
  });

  it(`should delete the created userSkill🧪 /usersskills/:id`, async () => {
    await request(app).delete(`/userskills/${userSkillId}`).expect(204);
  });

  it(`should delete the created user🧪 /users/id`, async () => {
    await request(app).delete(`/users/${userId}`).expect(204);
  });
  it(`should delete the created skill🧪 /skills/id`, async () => {
    await request(app).delete(`/skills/${skillId}`).expect(204);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
