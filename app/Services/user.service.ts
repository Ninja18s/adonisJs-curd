import Profile from "App/Models/Profile";

export default class UsersService {

    public static async editUser(userId: String, payload: any) {
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
    public static async getUserByEmail(email: string) {
        return await Profile.findBy('email', email);
    }
    public static async getUserById(userId: string) {
        return await Profile.findBy('userId', userId);
    }
    public static async createProfile(userId: String, payload: any) {
        const isUserExist = await Profile.findBy('userId', userId);
        if (isUserExist) {
            throw new Error(`User  already exists`);
        }
        return await Profile.create({ userId, ...payload });


    }

    public static async deleteProfile(userId: String) {
        const user = await Profile.findBy('userId', userId);
        await user.delete();
        return null;
    }
    // public static async 
}