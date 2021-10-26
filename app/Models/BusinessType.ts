import { DateTime } from 'luxon';
import { v4 as uuid } from 'uuid';

import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm';

export default class BusinessType extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @beforeCreate()
  public static async createUUID(model: BusinessType): Promise<void> {
    model.id = uuid();
  }

  @column()
  public name: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
function uuid(): number {
  throw new Error('Function not implemented.');
}
