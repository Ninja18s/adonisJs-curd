import Event from '@ioc:Adonis/Core/Event'
import { ProfileDTO } from "App/dto/profile/profile.dto";
import Profile from "App/Models/Profile";

export default class ProfileService {

    public static async editUserProfile(userId: String, payload: ProfileDTO): Promise<ProfileDTO> {
        let user = await Profile.findBy('userId', userId);
        // if (user) {

        //     user.name = payload.name ? payload.name : user.name;
        //     user.mobile = payload.mobile ? payload.mobile : user.mobile;
        //     user.gender = payload.gender ? payload.gender : user.gender;
        //     user.dob = payload.dob ? payload.dob : user.dob;
        //     user = await user.save();
        // }
        const data = await user?.merge(payload).save();
        Event.emit('edit:profile', data);
        return data;
    }

    public static async getUserByEmail(email: string): Promise<ProfileDTO> {
        return await Profile.findBy('email', email);
    }

    public static async getUserProfileById(userId: string): Promise<ProfileDTO> {
        return await Profile.query().where('userId', '=', userId).preload('user').first();
    }

    public static async createProfile(userId: String, payload: ProfileDTO): Promise<ProfileDTO> {
        const isUserProfileExist = await Profile.findBy('userId', userId);
        if (isUserProfileExist) {
            throw new Error(`User profile already exists`);
        }
        const data = await Profile.create({ userId, ...payload });
        Event.emit('new:profile', data);
        return data;
    }

    public static async deleteProfile(userId: String): Promise<void> {
        const user = await Profile.findBy('userId', userId);
        await user.delete();
    }
}