import { DateTime } from 'luxon';
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm';
import { v4 as uuidV4 } from 'uuid';

export default class Book extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public title: string;

  @column()
  public author: string;

  @column()
  public description: string;

  @column()
  public isbn: string;

  @column()
  public isbn13: string;

  @column()
  public publisher: string;

  @column()
  public published_date: Date;

  @column()
  public pages: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeCreate()
  public static async addUUID(book: Book) {
    book.id = uuidV4();
  }
}
