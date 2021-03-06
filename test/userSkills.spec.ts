import request from 'supertest';
import app from '../src/app';
import { prisma } from '../prisma/prismaClient';

let userSkillId: string;
let userId: string;
let skillId: string;
let note: number;
let idFormation: string;

describe('USERSKILLS ROUTES', () => {
  it('should create a new formations🧪 /api/formations', async () => {
    const sampleFormation = {
      formationName: 'Formationskillstest',
    };
    const res = await request(app)
      .post('/api/formations')
      .send(sampleFormation)
      .expect(201)
      .expect('Content-Type', /json/);

    idFormation = res.body.id;

    expect(res.body).toHaveProperty(
      'formationName',
      sampleFormation.formationName
    );
  });

  it('should create a new user 🧪 /api/users', async () => {
    const sampleUser = {
      username: 'UserTest2',
      profilTitle: 'Dev & Figmal',
      email: 'UserTest2@gmail.com',
      password: '12345',
      city: 'Londre',
      birthDate: '06/10/95',
      avatarUrl:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
      landimageUrl:
        'https://images.unsplash.com/photo-1599725055007-b33b6755ef6f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1329&q=80',
      idFormation,
    };
    const res = await request(app)
      .post('/api/users')
      .send(sampleUser)
      .expect(201)
      .expect('Content-Type', /json/);

    userId = res.body.id;

    expect(res.body).toHaveProperty('username', sampleUser.username);
    expect(res.body).toHaveProperty('email', sampleUser.email);
  });
  it('should create a new skill 🧪 /api/skills', async () => {
    const sampleSkills = {
      name: 'testSkill',
    };
    const res = await request(app)
      .post('/api/skills')
      .send(sampleSkills)
      .expect(201)
      .expect('Content-Type', /json/);

    skillId = res.body.id;

    expect(res.body).toHaveProperty('name', sampleSkills.name);
  });
  it('should create a new user Skill 🧪 /api/skills', async () => {
    const sampleUserSkills = {
      skillId,
      userId,
      note: 3,
    };

    const res = await request(app)
      .post('/api/userskills')
      .send(sampleUserSkills)
      .expect(201)
      .expect('Content-Type', /json/);

    userSkillId = res.body.id;
    note = res.body.note;

    expect(res.body).toHaveProperty('skillId', sampleUserSkills.skillId);
    expect(res.body).toHaveProperty('userId', sampleUserSkills.userId);
    expect(res.body).toHaveProperty('note', sampleUserSkills.note);
  });

  it('should get the skills list of a user 🧪 /api/skills/userId', async () => {
    const res = await request(app)
      .get(`/api/userskills/${userId}`)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get the userSkill with id 🧪 /api//skills/oneskill/:id', async () => {
    const res = await request(app)
      .get(`/api/userskills/oneskill/${userSkillId}`)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(res.body).toHaveProperty('note', note);
  });

  it(`should update the created userSkill title 🧪 /api/skills/:id`, async () => {
    await request(app)
      .put(`/api/userskills/${userSkillId}`)
      .send({
        note: 5,
      })
      .expect(204);

    const res = await request(app).get(
      `/api/userskills/oneskill/${userSkillId}`
    );

    expect(res.body).toHaveProperty('note', 5);
  });

  it(`should delete the created formation🧪 /api/formations/id`, async () => {
    await request(app).delete(`/api/formations/${idFormation}`).expect(204);
  });

  it(`should delete the created userSkill🧪 /api/usersskills/:id`, async () => {
    await request(app).delete(`/api/userskills/${userSkillId}`).expect(204);
  });

  it(`should delete the created user🧪 /api/users/id`, async () => {
    await request(app).delete(`/api/users/${userId}`).expect(204);
  });
  it(`should delete the created skill🧪 /api//skills/id`, async () => {
    await request(app).delete(`/api//skills/${skillId}`).expect(204);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
