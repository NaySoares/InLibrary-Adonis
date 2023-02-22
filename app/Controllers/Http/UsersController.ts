import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';

export default class UsersController {
  // *list user
  public async index() {
    const users = await User.all();
    return users;
  }

  // ! Deprecated method, do not use
  public async create() {}

  // *create a new user
  public async store({ request }: HttpContextContract) {
    const { name, lastName, email, password, avatar, nickname } =
      request.body();
    const user = await User.create({
      name,
      last_name: lastName,
      email,
      password,
      avatar: avatar || null,
      nickname: nickname || null,
    });

    return user;
  }

  public async show({ request, response }: HttpContextContract) {
    const { id } = request.params();
    const user = await User.findBy('id', id);
    // todo - [] fix exception when no-uuid is send as parameter;
    if (!user) {
      return response.status(204).json({ error: 'User not found' });
    }

    return user;
  }

  // ! Deprecated method, use update method instead.
  public async edit() {}

  // todo - [] add support to avatar update
  public async update({ request, response }: HttpContextContract) {
    const { id } = request.params();
    const { name, lastName, nickname } = request.body();

    const userData = await User.findOrFail(id);

    userData.name = name || userData.name;
    userData.last_name = lastName || userData.last_name;
    userData.nickname = nickname || userData.nickname;

    await userData.save();

    return response.status(201).json(userData);
  }

  public async destroy({ request, response }: HttpContextContract) {
    const { id } = request.params();
    const user = await User.findOrFail(id);
    await user.delete();

    return response.status(200).json({ message: 'User deleted' });
  }
}
