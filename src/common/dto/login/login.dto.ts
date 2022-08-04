import { UserDto } from './../user/user.dto';
import { METHOD } from "common/enum";
import { Adto } from "../base.dto";
import { Expose, Exclude } from "class-transformer";
import {  IsObject, IsString, MinLength } from "class-validator";
import { Service } from "typedi";

@Exclude()
export class LoginReponseBodyDTO {
    @Expose()
    @IsString()
    public token!: string

    @Expose()
    @IsObject()
    public user!: UserDto
}

@Exclude()
export class PayLoadLoginBodyDTO {
    @Expose()
    @IsString()
    @MinLength(1,{
        message:"example error"
    })
    public username!:string;
   
    @Expose()
    @IsString()
    @MinLength(6)
    public password!:string;
}

@Service()
export class LoginDTO extends Adto {
    public url: string = "/user/login"
    public paramsDTO = undefined
    public bodyDTO = undefined
    public queryDTO = undefined
    public method = METHOD.POST
    public responseDTOClass = LoginReponseBodyDTO

    constructor(body: PayLoadLoginBodyDTO) {
        super();
        this.bodyDTO = body;
    }
}

@Service()
export class RegisterDTO extends Adto {
    public url: string = "/register"
    public paramsDTO = undefined
    public bodyDTO = undefined
    public queryDTO = undefined
    public method = METHOD.POST
    public responseDTOClass = LoginReponseBodyDTO

    constructor(body: PayLoadLoginBodyDTO) {
        super();
        this.bodyDTO = body;
    }
}
