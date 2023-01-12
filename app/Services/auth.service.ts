import User from "App/Models/User";
export default class AuthService {
    public static async registerUser(payload: Object) {
        return await User.create(payload);
    }
}