import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterUserValidator {
  constructor(protected ctx: HttpContextContract) { }

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
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
    ]),
    name: schema.string({ trim: true }, [
      rules.required(),
      rules.maxLength(30),
      rules.minLength(3),
    ]),
    mobile: schema.string({ trim: true }, [
      rules.required(),
      rules.mobile(),
      rules.unique({ table: 'users', column: 'mobile' }),
      rules.maxLength(10),
      rules.minLength(10),
    ]),
    gender: schema.enum(['male', 'female']),
    dob: schema.date({ format: 'yyyy-mm-dd' }, [
      rules.required(),
    ])
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
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
