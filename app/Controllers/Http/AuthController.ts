import { OpaqueTokenContract } from '@ioc:Adonis/Addons/Auth';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import Hash from '@ioc:Adonis/Core/Hash';

import User from 'App/Models/User';

export default class AuthController {
  public async login({
    auth,
    response,
    request,
  }: HttpContextContract): Promise<void | OpaqueTokenContract<User>> {
    const { email, password } = request.only(['email', 'password']);

    try {
      const user = await User.query().where('email', email).firstOrFail();

      if (!(await Hash.verify(user.password, password))) {
        return response.status(401).send({ error: 'Invalid credentials' });
      }

      const token = await auth.use('api').generate(user, {
        expiresIn: '1day',
      });

      return token;
    } catch (err) {
      return response.status(400).send({ error: 'Invalid credentials' });
    }
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.use('api').revoke();

    return {
      revoked: true,
    };
  }
}
