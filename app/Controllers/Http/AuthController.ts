import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AuthService from 'App/Services/auth.service';
import ProfileService from "App/Services/profile.service";
import LoginValidator from 'App/Validators/LoginValidator';
import RegisterUserValidator from "App/Validators/RegisterUserValidator";
export default class AuthController {
    public async registerUser({ auth, request, response }: HttpContextContract): Promise<any> {
        const payload = await request.validate(RegisterUserValidator);
        const data = await AuthService.registerUser(payload)
        const token = await auth.use('api').attempt(payload.email, payload.password, {
            expiresIn: "1 day"
        });
        return response.json({
            data,
            token
        });
    }

    public async loginUser({ auth, request, response }: HttpContextContract): Promise<any> {


        const payload = await request.validate(LoginValidator);
        const token = await auth.use("api").attempt(payload.email, payload.password, {
            expiresIn: "10 days",
        });
        const userDetails = await ProfileService.getUserByEmail(payload.email)




        return response.json({
            data: {
                ...userDetails,
                token
            }
        });


    }
    public async logoutUser({ auth, response }: HttpContextContract): Promise<any> {
        await auth.use('api').logout();
        return response.json({
            message: "successfully logged out",
            data: null
        })
    }
}
