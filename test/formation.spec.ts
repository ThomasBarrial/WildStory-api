import request from 'supertest';
import app from '../src/app';
import { prisma } from '../prisma/prismaClient';

const sampleFormation = {
  formationName: 'Devellopeur Web et Mobile',
};

describe('FORMATIONS ROUTES', () => {
  it('should get the formations list 🧪 /formations', async () => {
    const res = await request(app)
      .get('/formations')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get the formation with id 🧪 /formation/:id', async () => {
    const { id } = await prisma.formation.create({
      data: sampleFormation,
    });
    const res = await request(app)
      .get(`/formations/${id}`)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(res.body).toHaveProperty(
      'formationName',
      sampleFormation.formationName
    );
  });

  it('should create a new formations🧪 /formations', async () => {
    const res = await request(app)
      .post('/formations')
      .send(sampleFormation)
      .expect(201)
      .expect('Content-Type', /json/);

    expect(res.body).toHaveProperty(
      'formationName',
      sampleFormation.formationName
    );
  });

  it(`should update the created formation title 🧪 /formations/:id`, async () => {
    const { id } = await prisma.formation.create({
      data: sampleFormation,
    });

    await request(app)
      .put(`/formations/${id}`)
      .send({
        formationName: 'modifyName',
      })
      .expect(204);

    const res = await request(app).get(`/formations/${id}`);

    expect(res.body).toHaveProperty('formationName', 'modifyName');
  });

  it(`should delete the created formation🧪 /formations/id`, async () => {
    const { id } = await prisma.formation.create({
      data: sampleFormation,
    });

    await request(app).delete(`/formations/${id}`).expect(204);
  });
});
