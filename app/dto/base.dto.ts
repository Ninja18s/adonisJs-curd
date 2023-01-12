import { DateTime } from "luxon";

export class BaseDto {
    public id?: string;
    public createdAt?: DateTime;
    public updatedAt?: DateTime
}

export enum GenderEnum {
    MALE = 'male',
    FEMALE = 'female'
}
export const GenderEnumType = [
    'male',
    'female'
]