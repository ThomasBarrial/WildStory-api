import request from 'supertest';
import app from '../src/app';
import { prisma } from '../prisma/prismaClient';

let userId: string;
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
  idFormation: 'a83df665-47dc-4f3e-83d9-254db9dc28c8',
};

describe('USERS ROUTES', () => {
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

  it('should get the users list 🧪 /users', async () => {
    const res = await request(app)
      .get('/users')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get the user with id 🧪 /users/:id', async () => {
    const res = await request(app)
      .get(`/users/${userId}`)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(res.body).toHaveProperty('username', sampleUser.username);
    expect(res.body).toHaveProperty('email', sampleUser.email);
  });

  it(`should update the created user title 🧪 /users/:id`, async () => {
    await request(app)
      .put(`/users/${userId}`)
      .send({
        username: 'modifyName',
      })
      .expect(204);

    const res = await request(app).get(`/users/${userId}`);

    expect(res.body).toHaveProperty('username', 'modifyName');
  });

  it(`should delete the created user🧪 /users/id`, async () => {
    await request(app).delete(`/users/${userId}`).expect(204);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
