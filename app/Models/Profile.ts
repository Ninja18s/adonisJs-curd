import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'
import User from './User'
export default class Profile extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column({ meta: { type: 'enum', enum: ['male', 'female'] } })
  public gender: string

  @column()
  public name: string

  @column({ meta: { unique: true } })
  public mobile: string

  @column()
  userId: string

  @hasOne(() => User, {
    foreignKey: 'id',
    localKey: 'userId',
  })
  public user: HasOne<typeof User>

  @column()
  public dob: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async idGenerator(profile: Profile) {
    profile.id = await uuidv4()
  }
}
