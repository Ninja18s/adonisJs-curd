import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { GenderEnumType } from 'App/dto/base.dto'

export default class CreateProfileValidator {
  constructor(protected ctx: HttpContextContract) { }
  public schema = schema.create({
    name: schema.string({ trim: true }, [
      rules.required(),
      rules.maxLength(30),
      rules.minLength(3),
    ]),
    mobile: schema.string({ trim: true }, [
      rules.required(),
      rules.mobile(),
      rules.unique({ table: 'profiles', column: 'mobile' }),
      rules.maxLength(10),
      rules.minLength(10),
    ]),
    gender: schema.enum(GenderEnumType),
    dob: schema.date({ format: 'yyyy-mm-dd' }, [
      rules.required(),
    ])
  })
  public messages: CustomMessages = {
    required: '{{ field }} is required to registeration',
    enum: 'The value of {{ field }} must be in {{ options.choices }}',
    unique: '{{ field }} must be unique',
    minLength: '{{ field }} must be at least {{ options.minLength}}',
    maxLength: '{{ field }} must be less than {{ options.maxLength }} ',
    alphaNum: '{{ field }} must be contain only alpha Numeric characters',
    mobile: '{{ field }} must be contain only valid mobile number',
    notIn: '{{ field }} should not be contain with password'

  }
}
