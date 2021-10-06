import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/apiV2`

interface User {
  name: string
  email: string
  password?: string
  is_tourist: boolean
}

test.group('User', (group) => {
  const user: User = {
    name: 'John Doe',
    email: 'JohnDoe@email.com',
    password: 'password123',
    is_tourist: false,
  }

  test('should return created user', async (assert) => {
    const response = await supertest(BASE_URL).post('/users').send(user)

    delete user.password;

    assert.containsAllDeepKeys(response.body, user)
    assert.equal(response.statusCode, 201)   
  })

  test('should return an error if the email is already registered', async (assert) => {
    await supertest(BASE_URL).post('/users').send(user)
    const response = await supertest(BASE_URL).post('/users').send(user)

    assert.equal(response.statusCode, 400)
    assert.equal(
      JSON.stringify(response.body), 
      JSON.stringify({ error: 'This user is not valid' })
    )
  })
})
