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

test.group('User', group => {
  const user: UserInterface = {
    name: 'John Doe',
    email: 'JohnDoe@email.com',
    password: 'password123',
    is_tourist: true,
    photo: 'https://peruibetec.blob.core.windows.net/user-images/image.png',
  };

  const user2: UserInterface = {
    name: 'Henrique Martins',
    email: 'henrique@email.com',
    password: 'passW0rd',
    is_tourist: false,
  };

  group.after(async () => {
    User.query().where('email', user.email).delete();

    test('should return an error if the email is already registered', async assert => {
      await supertest(BASE_URL).post('/users').send(user);
      const response = await supertest(BASE_URL).post('/users').send(user);

      assert.equal(response.statusCode, 400);
      assert.equal(
        JSON.stringify(response.body),
        JSON.stringify({ error: 'This user is not valid' }),
      );
    });
  });

  test('should assign a default photo if the user doesnt pass any', async assert => {
    const response = await supertest(BASE_URL).post('/users').send(user2);

    assert.equal(
      response.body.photo,
      'https://peruibetec.blob.core.windows.net/user-images/default.jpg',
    );
  });

  test('should return the searched users data', async assert => {
    const userCreated = await supertest(BASE_URL).post('/users').send(user);
    const response = await supertest(BASE_URL).get(
      `/users/${userCreated.body.id}`,
    );

    assert.containsAllDeepKeys(response.body, userCreated.body);
    assert.equal(response.statusCode, 200);
  });

  test('should return the error if user not exist', async assert => {
    const response = await supertest(BASE_URL).get(
      '/users/dc8e2d7b-36c1-4052-ae19-81201bcb6197',
    );

    assert.equal(
      JSON.stringify(response.body),
      JSON.stringify({ error: 'This user is not valid' }),
    );
    assert.equal(response.statusCode, 400);
  });

  test('should return the users registered', async assert => {
    const response = await supertest(BASE_URL).get('/users');

    // @ts-expect-error we are deleting the email because it isn't returned in the method
    delete user2.email;
    delete user2.password;

    assert.deepInclude(response.body[0], user2);
    assert.equal(response.statusCode, 200);
  });
});
