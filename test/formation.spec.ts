import request from 'supertest';
import app from '../src/app';
import { prisma } from '../prisma/prismaClient';

const sampleFormation = {
  formationName: 'Formation Test',
};
let idFormation: string;

describe('FORMATIONS ROUTES', () => {
  it('should create a new formations🧪 /formations', async () => {
    const res = await request(app)
      .post('/formations')
      .send(sampleFormation)
      .expect(201)
      .expect('Content-Type', /json/);

    idFormation = res.body.id;

    expect(res.body).toHaveProperty(
      'formationName',
      sampleFormation.formationName
    );
  });

  it('should get the formations list 🧪 /formations', async () => {
    const res = await request(app)
      .get('/formations')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get the formation with id 🧪 /formation/:id', async () => {
    const res = await request(app)
      .get(`/formations/${idFormation}`)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(res.body).toHaveProperty(
      'formationName',
      sampleFormation.formationName
    );
  });

  it(`should update the created formation title 🧪 /formations/:id`, async () => {
    await request(app)
      .put(`/formations/${idFormation}`)
      .send({
        formationName: 'modifyName',
      })
      .expect(204);

    const res = await request(app).get(`/formations/${idFormation}`);

    expect(res.body).toHaveProperty('formationName', 'modifyName');
  });

  it(`should delete the created formation🧪 /formations/id`, async () => {
    await request(app).delete(`/formations/${idFormation}`).expect(204);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
