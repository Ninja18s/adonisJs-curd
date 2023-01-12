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
        return await user?.merge(payload).save();
    }
    public static async getUserByEmail(email: string): Promise<ProfileDTO> {
        return await Profile.findBy('email', email);
    }
    public static async getUserProfileById(userId: string): Promise<ProfileDTO> {
        return await Profile.findBy('userId', userId);
    }
    public static async createProfile(userId: String, payload: ProfileDTO): Promise<ProfileDTO> {
        const isUserProfileExist = await Profile.findBy('userId', userId);
        if (isUserProfileExist) {
            throw new Error(`User profile already exists`);
        }
        return await Profile.create({ userId, ...payload });
    }

    public static async deleteProfile(userId: String): Promise<void> {
        const user = await Profile.findBy('userId', userId);
        await user.delete();
    }
}