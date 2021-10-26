import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class BusinessTypes extends BaseSchema {
  protected tableName = 'business_types';

  public async up(): Promise<void> {
    this.schema.createTable(this.tableName, table => {
      table.uuid('id').primary();

      table.string('name', 150).notNullable();

      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down(): Promise<void> {
    this.schema.dropTable(this.tableName);
  }
}
