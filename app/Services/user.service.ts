import User from "App/Models/Auth";

export default class UsersService {

    public static async editUser(userId: String, payload: any) {

        const user = await User.findOrFail(userId);

        user.name = payload.name ? payload.name : user.name;
        user.email = payload.email ? payload.email : user.email;
        user.password = payload.password ? payload.password : user.password;
        user.mobile = payload.mobile ? payload.mobile : user.mobile;
        user.gender = payload.gender ? payload.gender : user.gender;
        user.dob = payload.dob ? payload.dob : user.dob;
        await user.save();
        return user;
    }
    public static async getUserByEmail(email: string) {
        const user = await User.findBy('email', email);
        return user;
    }
    public static async getUserById(id: string) {
        const user = await User.findBy('id', id);
        return user;
    }

    // public static async 
}