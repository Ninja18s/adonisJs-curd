import { DateTime } from "luxon";
import { BaseDto, GenderEnum } from "../base.dto";

export class ProfileDTO extends BaseDto {
    gender?: GenderEnum | undefined;
    mobile?: string | undefined;
    dob?: DateTime | undefined;
    name?: string | undefined;
    user_id?: string | undefined;
}