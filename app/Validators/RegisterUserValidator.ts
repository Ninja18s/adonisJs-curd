import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterUserValidator {
  constructor(protected ctx: HttpContextContract) { }
  public schema = schema.create({
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.required(),
      rules.unique({ table: 'users', column: 'email' }),

    ]),
    password: schema.string({}, [
      rules.notIn(['password']),
      rules.maxLength(16),
      rules.minLength(8),
      rules.required(),
      rules.alphaNum()
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
