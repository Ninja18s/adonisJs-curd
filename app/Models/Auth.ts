import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column({ meta: { unique: true } })
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column({ meta: { type: 'enum', enum: ['male', 'female'] } })
  public gender: string

  @column()
  name: string

  @column({ meta: { unique: true } })
  mobile: string

  @column()
  dob: DateTime

  @column()
  remember_me_token: string

  @column()
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(auth: User) {

    if (auth.$dirty.password) {
      auth.password = await Hash.make(auth.password)
    }
  }
  @beforeSave()
  public static async idGenerator(auth: User) {
    auth.id = await uuidv4()
  }
}
