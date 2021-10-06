import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import User from 'App/Models/User';

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

export default class UsersController {
  public async create({
    request,
    response,
  }: HttpContextContract): Promise<Response | void> {
    const {
      name,
      email,
      password,
      is_tourist,
      background_photo,
      small_biography,
    } = request.only([
      'name',
      'email',
      'password',
      'is_tourist',
      'background_photo',
      'small_biography',
    ]);
    let { photo } = request.only(['photo']);

    const userVerify = await User.findBy('email', email);
    if (userVerify) {
      return response.status(400).send({ error: 'This user is not valid' });
    }

    if (photo === undefined) {
      photo =
        'https://peruibetec.blob.core.windows.net/user-images/default.jpg';
    }

    const user: UserInterface = await User.create({
      name,
      email,
      password,
      is_tourist,
      photo,
      background_photo,
      small_biography,
    });

    delete user.password;

    return response.status(201).send(user);
  }

  public async get({
    request,
    response,
  }: HttpContextContract): Promise<Response | void> {
    const { id } = request.params();

    const user = await User.findBy('id', id);
    if (!user) {
      return response.status(400).send({ error: 'This user is not valid' });
    }

    return response.status(200).send(user);
  }
}
