import request from 'supertest';
import app from '../src/app';

let idMediaLink: string;
let idMediaIcon: string;
let userId: string;

describe('MEDIALINK ROUTES', () => {
  it('should create a new user 🧪 /api/users', async () => {
    const sampleUser = {
      username: 'UserTest5',
      profilTitle: 'Dev & Figmalqsdqs',
      email: 'UserTest@gmail.comqsdqsd',
      password: '12345qsd',
      city: 'Londreqsd',
      birthDate: '06/10/95qsd',
      avatarUrl:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
      landimageUrl:
        'https://images.unsplash.com/photo-1599725055007-b33b6755ef6f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1329&q=80',
      idFormation: null,
    };
    const res = await request(app)
      .post('/api/users')
      .send(sampleUser)
      .expect(201)
      .expect('Content-Type', /json/);

    userId = res.body.id;
  });
  it('should create a new mediaIcon 🧪 /mediaicons', async () => {
    const sampleMediaIcon = {
      name: 'Discord',
      iconUrl: 'https://svgshare.com/i/btZ.svg',
    };
    const res = await request(app)
      .post('/api/mediaicons')
      .send(sampleMediaIcon)
      .expect(201)
      .expect('Content-Type', /json/);

    idMediaIcon = res.body.id;
  });
  it('should create a new mediaLink 🧪 /medialinks', async () => {
    const sampleMediaIcon = {
      link: 'https://www.discord.com/',
      iconId: idMediaIcon,
      userId: userId,
    };
    const res = await request(app)
      .post('/api/medialinks')
      .send(sampleMediaIcon)
      .expect(201)
      .expect('Content-Type', /json/);

    idMediaLink = res.body.id;
  });
  it('should get the mediaLinks list of a user 🧪 /api/medialinks/user/userId', async () => {
    const res = await request(app)
      .get(`/api/medialinks/user/${userId}`)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(Array.isArray(res.body)).toBe(true);
  });

  it(`should update the created mediaLink 🧪 /api/medialinks/:id`, async () => {
    await request(app)
      .put(`/api/medialinks/${idMediaLink}`)
      .send({
        link: 'https://www.discord.com/',
      })
      .expect(204);
  });

  it(`should delete the created MediaLinks 🧪 /api/medialinks/:id`, async () => {
    await request(app).delete(`/api/medialinks/${idMediaLink}`).expect(204);
  });
  it(`should delete the created user🧪 /api/users/id`, async () => {
    await request(app).delete(`/api/users/${userId}`).expect(204);
  });
  it(`should delete the created MediaIcon 🧪 /api/mediaicons/:id`, async () => {
    await request(app).delete(`/api/mediaicons/${idMediaIcon}`).expect(204);
  });
});
