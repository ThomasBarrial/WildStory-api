import request from 'supertest';
import app from '../src/app';
import { prisma } from '../prisma/prismaClient';

let userId: string;
let idFormation: string;

describe('USERS ROUTES', () => {
  it('should create a new formations🧪 /formations', async () => {
    const sampleFormation = {
      formationName: 'Formation',
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
  const sampleUser = {
    username: 'UserTest',
    email: 'UserTest@gmail.com',
    password: '12345',
    city: 'Londre',
    birthDate: '06/10/95',
    avatarUrl:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
    landimageUrl:
      'https://images.unsplash.com/photo-1599725055007-b33b6755ef6f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1329&q=80',
    idFormation,
  };
  it('should create a new user 🧪 /api/users', async () => {
    const res = await request(app)
      .post('/api/users')
      .send(sampleUser)
      .expect(201)
      .expect('Content-Type', /json/);

    userId = res.body.id;

    expect(res.body).toHaveProperty('username', sampleUser.username);
    expect(res.body).toHaveProperty('email', sampleUser.email);
  });

  it('should get the users list 🧪 /api/users', async () => {
    const res = await request(app)
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get the user with id 🧪 /api/users/:id', async () => {
    const res = await request(app)
      .get(`/api/users/${userId}`)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(res.body).toHaveProperty('username', sampleUser.username);
    expect(res.body).toHaveProperty('email', sampleUser.email);
  });

  it(`should update the created user title 🧪 /api/users/:id`, async () => {
    await request(app)
      .put(`/api/users/${userId}`)
      .send({
        username: 'modifyName',
      })
      .expect(204);

    const res = await request(app).get(`/api/users/${userId}`);

    expect(res.body).toHaveProperty('username', 'modifyName');
  });

  it(`should delete the created user🧪 /api/users/id`, async () => {
    await request(app).delete(`/api/users/${userId}`).expect(204);
  });
  it(`should delete the created formation🧪 /api/formations/id`, async () => {
    await request(app).delete(`/api/formations/${idFormation}`).expect(204);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
