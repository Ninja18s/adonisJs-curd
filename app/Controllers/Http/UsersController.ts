import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UsersService from 'App/Services/user.service';
import CreateProfileValidator from 'App/Validators/CreateProfileValidator';
import EditUserValidator from 'App/Validators/EditUserValidator';

export default class UsersController {

    public async editUserDetails({ auth, request, response }: HttpContextContract): Promise<any> {

        const userId = auth.use('api').user?.id;
        if (!userId) {
            throw new Error('Id not Found');
        }
        const payload = await request.validate(EditUserValidator)
        const user = await UsersService.editUser(userId, payload);
        return response.status(200).json({
            data: user
        })
    }

    public async getUserById({ auth, response }: HttpContextContract): Promise<any> {

        const userId = auth.use('api').user?.id;
        if (!userId) {
            throw new Error('Id not Found');
        }
        const user = await UsersService.getUserById(userId);
        return response.status(200).json({
            data: user
        })
    }

    public async createProfile({ auth, request, response }: HttpContextContract): Promise<any> {
        const userId = auth.use('api').user?.id;
        if (!userId) {
            throw new Error('Id not Found');
        }
        const payload = await request.validate(CreateProfileValidator);
        const user = await UsersService.createProfile(userId, payload);
        return response.status(200).json({
            data: user
        })
    }


    public async deleteProfile({ auth, response }: HttpContextContract): Promise<any> {
        const userId = auth.use('api').user?.id;
        if (!userId) {
            throw new Error('Id not Found');
        }
        const user = await UsersService.deleteProfile(userId);
        return response.status(200).json({
            data: user
        })
    }


}
