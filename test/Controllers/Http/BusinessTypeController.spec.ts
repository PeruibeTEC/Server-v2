import BusinessType from 'App/Models/BusinessType';

import { v4 as uuid } from 'uuid';
import test from 'japa';
import supertest from 'supertest';

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/apiV2`;

interface BusinessTypeInterface {
  id?: string;
  name: string;
}

test.group('BusinessType', group => {
  const businessType: BusinessTypeInterface = {
    name: 'Restaurante',
  };

  const businessType2: BusinessTypeInterface = {
    name: 'Igreja',
  };

  group.beforeEach(async () => {
    await BusinessType.query().where('name', 'Restaurante').delete();
    await BusinessType.query().where('name', 'Igreja').delete();
  });

  test('should return created business type', async assert => {
    const response = await supertest(BASE_URL)
      .post('/business_type')
      .send(businessType);

    assert.containsAllDeepKeys(response.body, businessType);
    assert.equal(response.statusCode, 201);
  });

  test('should return an error if the name is already registered', async assert => {
    await supertest(BASE_URL).post('/business_type').send(businessType);
    const response = await supertest(BASE_URL)
      .post('/business_type')
      .send(businessType);

    assert.equal(response.statusCode, 400);
    assert.equal(
      JSON.stringify(response.body),
      JSON.stringify({ error: 'This name is not valid' }),
    );
  });

  test('should return the searched business type data', async assert => {
    const businessTypeCreated = await supertest(BASE_URL)
      .post('/business_type')
      .send(businessType);
    const response = await supertest(BASE_URL).get(
      `/business_type/${businessTypeCreated.body.id}`,
    );

    assert.containsAllDeepKeys(response.body, businessTypeCreated.body);
    assert.equal(response.statusCode, 200);
  });

  test('should return the error if business type name not exist', async assert => {
    const response = await supertest(BASE_URL).get(`/business_type/${uuid()}`);

    assert.equal(
      JSON.stringify(response.body),
      JSON.stringify({ error: 'This business type id is not valid' }),
    );
    assert.equal(response.statusCode, 404);
  });

  test('should return the business type registered', async assert => {
    await supertest(BASE_URL).post('/business_type').send(businessType);
    await supertest(BASE_URL).post('/business_type').send(businessType2);

    const response = await supertest(BASE_URL).get('/business_type');

    assert.deepInclude(response.body[0], businessType);
    assert.deepInclude(response.body[1], businessType2);
    assert.equal(response.statusCode, 200);

    businessType.name = 'Restaurante';
    businessType2.name = 'Igreja';
  });

  test('should deleted business type', async assert => {
    const businessTypeCreated = await supertest(BASE_URL)
      .post('/business_type')
      .send(businessType2);

    const deleteResponse = await supertest(BASE_URL)
      .delete('/business_type')
      .send({ id: businessTypeCreated.body.id });

    const getResponse = await supertest(BASE_URL).get(
      `/business_type/${businessTypeCreated.body.id}`,
    );

    assert.equal(
      JSON.stringify(deleteResponse.body),
      JSON.stringify({ success: 'Business Type deleted' }),
    );
    assert.equal(deleteResponse.statusCode, 200);
    assert.equal(
      JSON.stringify(getResponse.body),
      JSON.stringify({ error: 'This business type id is not valid' }),
    );
  });

  test('should updated business type', async assert => {
    const businessTypeCreated = await supertest(BASE_URL)
      .post('/business_type')
      .send(businessType);

    const updateResponse = await supertest(BASE_URL)
      .put('/business_type')
      .send({ id: businessTypeCreated.body.id, name: 'Super mercado' });

    assert.equal(
      JSON.stringify(updateResponse.body),
      JSON.stringify({ success: 'Business Type updated' }),
    );
    assert.equal(updateResponse.statusCode, 200);
  });

  test('should return errors when business type updated is invalid', async assert => {
    const businessTypeCreated = await supertest(BASE_URL)
      .post('/business_type')
      .send(businessType);

    const businessTypeCreated2 = await supertest(BASE_URL)
      .post('/business_type')
      .send(businessType2);

    const updateResponse = await supertest(BASE_URL)
      .put('/business_type')
      .send({
        id: businessTypeCreated.body.id,
        name: businessTypeCreated2.body.name,
      });

    const updateResponse2 = await supertest(BASE_URL)
      .put('/business_type')
      .send({
        id: uuid(),
        name: 'Super mercado',
      });

    assert.equal(
      JSON.stringify(updateResponse.body),
      JSON.stringify({ error: 'This business type name is not valid' }),
    );
    assert.equal(updateResponse.statusCode, 404);
    assert.equal(
      JSON.stringify(updateResponse2.body),
      JSON.stringify({ error: 'This business type id is not valid' }),
    );
    assert.equal(updateResponse2.statusCode, 404);
  });
});
