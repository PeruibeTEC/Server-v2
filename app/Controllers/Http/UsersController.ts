import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'

interface UserInterface {
  name: string
  email: string
  password?: string
  is_tourist: boolean
}

export default class UsersController {
  public async create({ request, response }: HttpContextContract) {
    const { name, email, password, is_tourist } = request.only([
      'name',
      'email',
      'password',
      'is_tourist',
    ])

    const userVerify = await User.findBy('email', email)
    if (userVerify) {
      return response.status(400).send({ error: 'This user is not valid' })
    }

    const user: UserInterface = await User.create({
      name,
      email,
      password,
      is_tourist,
    })

    delete user.password

    return response.status(201).send(user)
  }
}
