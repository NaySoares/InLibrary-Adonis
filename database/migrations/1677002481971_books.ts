import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'books';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary();
      table.string('title');
      table.string('author');
      table.string('description');
      table.string('isbn').notNullable().unique();
      table.string('isbn13');
      table.string('publisher');
      table.date('published_date');
      table.decimal('pages');
      table.string('cover');
      table.specificType('category', 'string[]');
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
