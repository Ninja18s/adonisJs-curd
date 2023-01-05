import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import UsersService from "App/Services/user.service";
import LoginValidator from 'App/Validators/LoginValidator';
import RegisterUserValidator from "App/Validators/RegisterUserValidator";

export default class AuthController {
    public async registerUser({ auth, request, response }: HttpContextContract): Promise<any> {

        try {
            const payload = await request.validate(RegisterUserValidator);
            const data = await UsersService.registerUser(payload)
            const token = await auth.use('api').attempt(payload.email, payload.password, {
                expiresIn: "1 day"
            });

            data.token = token.toJSON()
            return response.json({

                data: data
            });
        } catch (error) {
            throw error;
        }
    }

    public async loginUser({ auth, request, response }: HttpContextContract): Promise<any> {
        try {

            const payload = await request.validate(LoginValidator);
            const token = await auth.use("api").attempt(payload.email, payload.password, {
                expiresIn: "10 days",
            });
            let userDetails: any;
            if (token) {
                userDetails = await UsersService.getUserByEmail(payload.email)
            }

            userDetails = {
                ...userDetails,
                token: token.toJSON()
            }

            return response.json({
                data: userDetails
            });

        } catch (error) {
            throw error;
        }
    }
}
