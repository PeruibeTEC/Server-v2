import { DateTime } from 'luxon';
import { v4 as uuid } from 'uuid';

import {
  BaseModel,
  column,
  beforeCreate,
  beforeSave,
} from '@ioc:Adonis/Lucid/Orm';
import Hash from '@ioc:Adonis/Core/Hash';

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @beforeCreate()
  public static async createUUID(model: User): Promise<void> {
    model.id = uuid();
  }

  @column({ isPrimary: true })
  public name: string;

  @column()
  public email: string;

  @column({ serializeAs: null })
  public password: string;

  @column()
  public small_biography: string;

  @column()
  public photo: string;

  @column()
  public background_photo: string;

  @column()
  public is_tourist: boolean;

  @beforeSave()
  public static async hashPassword(user: User): Promise<void> {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
