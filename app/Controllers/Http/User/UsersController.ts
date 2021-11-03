import { inject } from '@adonisjs/core/build/standalone';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import User from 'App/Models/User';

import path from 'path';
import MailProvider from '../../../../providers/Mail/AmazonSES/Model/MailProvider';

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
@inject(['Providers/AmazonSES'])
export default class UsersController {
  constructor(private mailProvider: MailProvider) {}

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

    const welcomeTemplate = path.resolve(__dirname, 'view', 'welcome.hbs');

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[PeruibeTec]: Seja Bem-vindo',
      templateData: {
        file: welcomeTemplate,
        variables: {
          name: user.name,
        },
      },
    });

    delete user.password;
    return response.status(201).send(user);
  }

  public async show({
    request,
    response,
  }: HttpContextContract): Promise<Response | void> {
    const { id } = request.params();
    const user = await User.findBy('id', id);
    if (!user) {
      return response.status(404).send({ error: 'This user is not valid' });
    }
    return response.status(200).send(user);
  }

  public async index({
    response,
  }: HttpContextContract): Promise<Response | void> {
    const users = await User.query().select(
      'id',
      'is_tourist',
      'name',
      'small_biography',
      'photo',
    );

    return response.status(200).send(users);
  }

  public async delete({
    auth,
    response,
  }: HttpContextContract): Promise<Response | void> {
    const authId = await auth.use('api').authenticate();

    await User.query().where('id', authId.id).delete();

    return response.status(200).send({ success: 'User deleted' });
  }

  public async update({
    auth,
    request,
    response,
  }: HttpContextContract): Promise<Response | void> {
    const authId = await auth.use('api').authenticate();

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

    const userVerifyEmail = await User.findBy('email', email);

    if (userVerifyEmail) {
      return response.status(400).send({ error: 'This user is not valid' });
    }

    await User.query().where('id', authId.id).update({
      name,
      email,
      password,
      is_tourist,
      background_photo,
      small_biography,
    });

    return response.status(200).send({ success: 'User updated' });
  }
}
