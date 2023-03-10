import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { GenderEnum } from 'App/dto/base.dto'

export default class EditUserValidator {
  constructor(protected ctx: HttpContextContract) { }
  public schema = schema.create({

    name: schema.string.optional({ trim: true }, [
      rules.maxLength(30),
      rules.minLength(3),
    ]),
    mobile: schema.string.optional({ trim: true }, [
      rules.mobile(),
      rules.unique({ table: 'profiles', column: 'mobile' }),
      rules.maxLength(10),
      rules.minLength(10),
    ]),
    gender: schema.enum.optional(Object.values(GenderEnum)),
    dob: schema.date.optional({ format: 'yyyy-mm-dd' }, [
    ])
  })
  public messages: CustomMessages = {
    enum: 'The value of {{ field }} must be in {{ options.choices }}',
    unique: '{{ field }} must be unique',
    minLength: '{{ field }} must be at least {{ options.minLength}}',
    maxLength: '{{ field }} must be less than {{ options.maxLength }} ',
    alphaNum: '{{ field }} must be contain only alpha Numeric characters',
    mobile: '{{ field }} must be contain only valid mobile number',
    notIn: '{{ field }} should not be contain with password'
  }
}
