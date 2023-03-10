import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'
import Profile from './Profile'
export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column({ meta: { unique: true } })
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  remember_me_token: string

  @column()
  public rememberMeToken: string | null

  @hasOne(() => Profile, {
    foreignKey: 'userId',
    localKey: 'id',
  })
  public profile: HasOne<typeof Profile>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    user.id = await uuidv4()
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
