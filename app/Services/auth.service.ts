import { RegistrationDTO } from "App/dto/Auth/auth.dto";
import User from "App/Models/User";
export default class AuthService {
    public static async registerUser(payload: RegistrationDTO): Promise<RegistrationDTO> {
        return await User.create(payload);
    }
}