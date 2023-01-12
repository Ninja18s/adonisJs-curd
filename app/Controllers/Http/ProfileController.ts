import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProfileService from 'App/Services/profile.service';
import CreateProfileValidator from 'App/Validators/CreateProfileValidator';
import EditUserValidator from 'App/Validators/EditUserValidator';

export default class UsersController {
    public async editUserProfileDetails({ auth, request, response }: HttpContextContract): Promise<any> {
        const userId = auth.user?.id;
        const payload = await request.validate(EditUserValidator)
        const user = await ProfileService.editUserProfile(userId, payload);
        return response.status(200).json({
            data: user
        })
    }
    public async getUserProfileById({ auth, response }: HttpContextContract): Promise<any> {
        const userId = auth.user?.id;
        const user = await ProfileService.getUserByIdProfile(userId);
        return response.status(200).json({
            data: user
        })
    }
    public async createProfile({ auth, request, response }: HttpContextContract): Promise<any> {
        const userId = auth.user?.id;
        const payload = await request.validate(CreateProfileValidator);
        const user = await ProfileService.createProfile(userId, payload);
        return response.status(200).json({
            data: user
        })
    }


    public async deleteProfile({ auth, response }: HttpContextContract): Promise<any> {
        const userId = auth.user?.id;
        const user = await ProfileService.deleteProfile(userId);
        return response.status(200).json({
            data: user
        })
    }


}
