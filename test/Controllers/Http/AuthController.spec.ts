import User from 'App/Models/User';

import test from 'japa';
import supertest from 'supertest';

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/apiV2`;

interface UserInterface {
  id?: string;
  name: string;
  email: string;
  password?: string;
  is_tourist: boolean;

  photo?: string;
  background_photo?: string;
  small_biography?: string;
}

test.group('AuthController', group => {
  const user: UserInterface = {
    name: 'John Doe',
    email: 'JohnDoe@email.com',
    password: 'password123',
    is_tourist: true,
    photo: 'https://peruibetec.blob.core.windows.net/user-images/image.png',
  };

  group.beforeEach(async () => {
    await User.query().where('email', 'JohnDoe@email.com').delete();
  });

  test('should return user token', async assert => {
    await supertest(BASE_URL).post('/users').send(user);
    const response = await supertest(BASE_URL)
      .post('/auth/login')
      .send({ email: user.email, password: user.password });

    assert.include(JSON.stringify(response.body), 'token');
    assert.equal(response.statusCode, 200);
  });

  test('should return an error when the password is invalid', async assert => {
    await supertest(BASE_URL).post('/users').send(user);
    const response = await supertest(BASE_URL)
      .post('/auth/login')
      .send({ email: user.email, password: 'any' });

    assert.equal(
      JSON.stringify(response.body),
      JSON.stringify({ error: 'Invalid credentials' }),
    );
    assert.equal(response.statusCode, 401);
  });

  test('should return an error when an unexpected error occurs', async assert => {
    await supertest(BASE_URL).post('/users').send(user);
    const response = await supertest(BASE_URL)
      .post('/auth/login')
      .send({ email: user.email });

    assert.equal(
      JSON.stringify(response.body),
      JSON.stringify({ error: 'Invalid credentials' }),
    );
    assert.equal(response.statusCode, 400);
  });

  test('should return true for revoked', async assert => {
    await supertest(BASE_URL).post('/users').send(user);
    const response = await supertest(BASE_URL).delete('/auth/logout');

    assert.equal(
      JSON.stringify(response.body),
      JSON.stringify({ revoked: true }),
    );
    assert.equal(response.statusCode, 200);
  });
});
