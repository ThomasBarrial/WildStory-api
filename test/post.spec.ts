import request from 'supertest';
import app from '../src/app';
import { prisma } from '../prisma/prismaClient';

let postId: string;
let userId: string;
let idFormation: string;

describe('POST ROUTES', () => {
  const sampleUser = {
    username: 'UserTestPost',
    profilTitle: 'Dev & Figmal',
    email: 'UserTestPost@gmail.com',
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

    expect(res.body).toHaveProperty('username', sampleUser.username);
    expect(res.body).toHaveProperty('email', sampleUser.email);
    userId = res.body.id;
  });

  it('should create a new post 🧪 /api/post', async () => {
    const postPayload = {
      title: 'Posttest',
      text: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eu facilisis sem. Vivamus eu facilisis sem.',
      imageUrl: [
        'https://images.unsplash.com/photo-1599725055007-b33b6755ef6f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1029&q=80',
        'https://images.unsplash.com/photo-1599725055007-b33b6755ef6f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1029&q=80',
      ],
      userId,
    };
    const res = await request(app)
      .post('/api/post')
      .send(postPayload)
      .expect(201)
      .expect('Content-Type', /json/);

    postId = res.body.id;
    expect(res.body).toHaveProperty('title', postPayload.title);
    expect(res.body).toHaveProperty('text', postPayload.text);
    expect(Array.isArray(res.body.imageUrl)).toBe(true);
    expect(res.body).toHaveProperty('userId', postPayload.userId);
  });

  it('should get a post list 🧪 /api/post', async () => {
    const res = await request(app)
      .get('/api/post')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get a user post list 🧪 /api/post/user/:userId', async () => {
    const res = await request(app)
      .get(`/api/post/user/${userId}`)
      .expect(200)
      .expect('Content-Type', /json/);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get one post 🧪 /api/post/:id', async () => {
    await request(app)
      .get(`/api/post/${postId}`)
      .expect(200)
      .expect('Content-Type', /json/);
  });

  it('should update a post 🧪 /api/post/:id', async () => {
    const postPayloadModify = {
      title: 'PosttestModify',
      text: ' Lorem met, consectetur adipiscing elit. Vivamus eu facilisis sem. Vivamus eu facilisis sem.',
      imageUrl: [
        'https://images.unsplash.com/photo-1599725055007-b33b6755ef6f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1029&q=80',
      ],
    };

    await request(app)
      .put(`/api/post/${postId}`)
      .send(postPayloadModify)
      .expect(204);
    const res = await request(app).get(`/api/post/${postId}`);

    expect(res.body).toHaveProperty('title', postPayloadModify.title);
    expect(res.body).toHaveProperty('text', postPayloadModify.text);
    expect(Array.isArray(res.body.imageUrl)).toBe(true);
  });

  it('should delete the created post 🧪 /api/post/:id', async () => {
    await request(app).delete(`/api/post/${postId}`).expect(204);
  });
  it(`should delete the created user🧪 /api/users/id`, async () => {
    await request(app).delete(`/api/users/${userId}`).expect(204);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
