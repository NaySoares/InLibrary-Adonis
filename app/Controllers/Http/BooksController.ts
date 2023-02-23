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

    // * Not allowed duplicate books.
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

  // ! Deprecated method, use update method instead
  public async edit() {}

  public async update({ request, response }: HttpContextContract) {
    const { id } = request.params();
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

    const bookData = await Book.findOrFail(id);

    bookData.title = title || bookData.title;
    bookData.author = author || bookData.author;
    bookData.description = description || bookData.description;
    bookData.isbn = isbn || bookData.isbn;
    bookData.isbn13 = isbn13 || bookData.isbn13;
    bookData.publisher = publisher || bookData.publisher;
    bookData.published_date = publishedDate || bookData.published_date;
    bookData.pages = pages || bookData.pages;

    await bookData.save();

    return response.status(201).json(bookData);
  }

  // todo - [] this method deletes a book from the database, but it should only delete from the user's collection
  // ! user's collection not implemented yet
  public async destroy({ request, response }: HttpContextContract) {
    const { id } = request.params();

    const book = await Book.findOrFail(id);
    await book.delete();

    return response.status(200).json({ message: 'Book deleted' });
  }
}
