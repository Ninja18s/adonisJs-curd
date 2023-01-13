import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProfileService from 'App/Services/profile.service';
import CreateProfileValidator from 'App/Validators/CreateProfileValidator';
import EditUserValidator from 'App/Validators/EditUserValidator';

export default class UsersController {
    public async editUserProfileDetails({ auth, request, response }: HttpContextContract): Promise<void> {
        const payload = await request.validate(EditUserValidator)
        const user = await ProfileService.editUserProfile(auth.user.id, payload);
        return response.status(200).json({
            data: user
        })
    }

    public async getUserProfileById({ auth, response }: HttpContextContract): Promise<void> {
        await auth.user?.load('profile')
        return response.status(200).json({
            data: auth.user
        })
    }

    public async createProfile({ auth, request, response }: HttpContextContract): Promise<any> {
        const payload = await request.validate(CreateProfileValidator);
        const user = await ProfileService.createProfile(auth.user.id, payload);
        return response.status(200).json({
            data: user
        })
    }

    public async deleteProfile({ auth, response }: HttpContextContract): Promise<any> {
        const user = await ProfileService.deleteProfile(auth.user.id);
        return response.status(200).json({
            data: user
        })
    }
}
