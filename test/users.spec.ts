import request from 'supertest';
import app from '../src/app';
import { prisma } from '../prisma/prismaClient';

const sampleUser = {
  username: 'user4',
  email: 'user2@gmail.com',
  password: '12345',
  city: 'Paris',
  birthDate: 'date de naissance',
  avatarUrl:
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
  landimageUrl:
    'https://images.unsplash.com/photo-1599725055007-b33b6755ef6f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1329&q=80',
  idFormation: '6a7299b3-50fd-41ae-ae0f-ccf8986f9997',
};

describe('USERS ROUTES', () => {
  it('should get the users list 🧪 /users', async () => {
    const res = await request(app)
      .get('/users')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get the user with id 🧪 /users/:id', async () => {
    const { id } = await prisma.user.create({
      data: sampleUser,
    });
    const res = await request(app)
      .get(`/users/${id}`)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(res.body).toHaveProperty('username', sampleUser.username);
    expect(res.body).toHaveProperty('email', sampleUser.email);
  });

  it('should create a new user 🧪 /users', async () => {
    const res = await request(app)
      .post('/users')
      .send(sampleUser)
      .expect(201)
      .expect('Content-Type', /json/);

    expect(res.body).toHaveProperty('username', sampleUser.username);
    expect(res.body).toHaveProperty('email', sampleUser.email);
  });

  it(`should update the created user title 🧪 /users/:id`, async () => {
    const { id } = await prisma.user.create({
      data: sampleUser,
    });

    await request(app)
      .put(`/users/${id}`)
      .send({
        username: 'modifyName',
      })
      .expect(204);

    const res = await request(app).get(`/users/${id}`);

    expect(res.body).toHaveProperty('username', 'modifyName');
  });

  it(`should delete the created user🧪 /users/id`, async () => {
    const { id } = await prisma.user.create({
      data: sampleUser,
    });

    await request(app).delete(`/users/${id}`).expect(204);
  });

  // it('should get the track list of album 1 🧪 /api/albums/1/tracks', async () => {
  //   const res = await supertest(app)
  //     .get('/api/albums/1/tracks')
  //     .expect(200)
  //     .expect('Content-Type', /json/);

  //   expect(Array.isArray(res.body)).toBe(true);

  //   res.body.forEach((track) => {
  //     expect(track).toHaveProperty('id_album', 1);
  //     trackKeys.map((prop) => {
  //       expect(track).toHaveProperty(prop);
  //     });
  //   });
  // });
});
