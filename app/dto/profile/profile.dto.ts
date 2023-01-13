import { DateTime } from "luxon";
import { UserDTO } from "../Auth/auth.dto";
import { BaseDto, GenderEnum } from "../base.dto";

export class ProfileDTO extends BaseDto {
    gender?: GenderEnum;
    mobile?: string;
    dob?: DateTime;
    name?: string;
    user_id?: string;
    user: UserDTO
}