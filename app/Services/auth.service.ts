import Event from '@ioc:Adonis/Core/Event'
import { RegistrationDTO } from "App/dto/Auth/auth.dto";
import User from "App/Models/User";

export default class AuthService {

    public static async registerUser(payload: RegistrationDTO): Promise<RegistrationDTO> {

        const data = await User.create(payload);
        Event.emit('new:user', data)
        return data;

    }
}