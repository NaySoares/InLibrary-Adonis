import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Book from 'App/Models/Book';

export default class BooksController {
  public async index() {
    const books = await Book.all();
    return books;
  }

  // ! Deprecated method, do not use
  public async create() {}

  public async store({ request, response }: HttpContextContract) {
    const {
      title,
      author,
      description,
      isbn,
      isbn13,
      publisher,
      publishedDate,
      pages,
    } = request.body();

    const bookExists = await Book.findBy('isbn', isbn);

    // * Not allowed duplicate books
    if (bookExists) {
      return response.status(401).json({ message: 'Book already exists' });
    }

    const book = await Book.create({
      title,
      author,
      description,
      isbn,
      isbn13,
      publisher,
      published_date: publishedDate,
      pages,
    });

    return book;
  }

  public async show({ request, response }: HttpContextContract) {
    const { id } = request.params();
    const book = await Book.findBy('id', id);
    // todo - [] fix exception when no-uuid is send as parameter;
    if (!book) {
      return response.status(204).json({ error: 'User not found' });
    }

    return book;
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
