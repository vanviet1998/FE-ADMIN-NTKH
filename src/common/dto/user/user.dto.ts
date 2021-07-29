import { Exclude, Expose } from "class-transformer";
import { IsEnum, IsString, } from "class-validator";
import { TYPE_USER } from "common/enum";

@Exclude()
export class UserDto {
    @Expose()
    @IsString()
    public avatar!: string

    @Expose()
    @IsString()
    public username!: string

    @Expose()
    @IsEnum(TYPE_USER)
    public type!: string

    @Expose()
    @IsString()
    public _id!: string


}

