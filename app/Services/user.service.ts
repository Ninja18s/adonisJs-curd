import User from "App/Models/Auth";

export default class UsersService {

    public static async registerUser(payload: Object) {

        const user = await User.create(payload);
        return user.toJSON();
    }
    public static async getUserByEmail(email: string) {
        const user = await User.findBy('email', email);
        return user?.toJSON();
    }
}