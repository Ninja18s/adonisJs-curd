import { BaseDto } from "../base.dto";

export class RegistrationDTO extends BaseDto {
    email: string;
    password?: string;
}

export class UserDTO extends BaseDto {
    email: string;
}