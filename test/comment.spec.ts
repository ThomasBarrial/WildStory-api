import request from 'supertest';
import app from '../src/app';
import { prisma } from '../prisma/prismaClient';

let userId: string;
let postId: string;
let commentId: string;

describe('COMMENTS ROUTES', () => {
  const sampleUser = {
    username: 'UserTestcomment',
    profilTitle: 'Dev & Figmal',
    email: 'UserTestComment@gmail.com',
    password: '12345',
    city: 'Londre',
    birthDate: '06/10/95',
    avatarUrl:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
    landimageUrl:
      'https://images.unsplash.com/photo-1599725055007-b33b6755ef6f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1329&q=80',
    idFormation: '',
  };
  it('should create a new user 🧪 /api/users', async () => {
    const res = await request(app)
      .post('/api/users')
      .send(sampleUser)
      .expect(201)
      .expect('Content-Type', /json/);

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
  });

  it('should create a comment 🧪 /api/comments', async () => {
    const commentPayload = {
      text: 'Hello ceci est un commentaire de test',
      userId,
      postId,
    };

    const res = await request(app)
      .post('/api/comments')
      .send(commentPayload)
      .expect(201)
      .expect('Content-Type', /json/);

    commentId = res.body.id;

    expect(res.body).toHaveProperty('text', commentPayload.text);
    expect(res.body).toHaveProperty('userId', commentPayload.userId);
    expect(res.body).toHaveProperty('postId', commentPayload.postId);
  });

  it(`should delete the created comment🧪 /api/users/id`, async () => {
    await request(app).delete(`/api/comments/${commentId}`).expect(204);
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
