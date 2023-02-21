import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  // *list user
  public async index({}: HttpContextContract) {
    const users = await User.all();
    return users;
  }
  // ! Deprecated method, do not use 
  public async create({}: HttpContextContract) {}
  
  // *create a new user
  public async store({ request }: HttpContextContract) {
    const { name, lastName, email, password, avatar, nickname } = request.body();
    const user = await User.create({
      name,
      last_name: lastName,
      email,
      password,
      avatar: avatar ? avatar : null,
      nickname: nickname ? nickname : null,
    });

    return user;
  }
  
  public async show({ request, response }: HttpContextContract) {
    const { id } = request.params();
    const user = await User.findBy('id', id);
    // todo - [] fix exception when no-uuid is send as parameter;
    if (!user) {
      return response.status(204).json({error: 'User not found'});
    }
  
    return user;  
  }

  // ! Deprecated method, use update method instead.
  public async edit({}: HttpContextContract) {}
  
  public async update({}: HttpContextContract) {}
  
  public async destroy({}: HttpContextContract) {}
}
