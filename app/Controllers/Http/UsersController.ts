import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {
  // *list user
  public async index({}: HttpContextContract) {
    return 'user index'
  }
  // !create user in front, don't use 
  public async create({ request }: HttpContextContract) {}
  // *create a new user
  public async store({}: HttpContextContract) {}
  
  public async show({}: HttpContextContract) {}
  // !use update method, instead.
  public async edit({}: HttpContextContract) {}
  
  public async update({}: HttpContextContract) {}
  
  public async destroy({}: HttpContextContract) {}
}
