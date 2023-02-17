// import { LoginDTO, LoginReponseBodyDTO } from '../../common/dto/login/login.dto';
import { API_URL } from "common/config";
import { Adto } from "common/dto/base.dto";
import { PayLoadLoginBodyDTO } from "common/dto/login/login.dto";
import { AUTH_CONFIG_API } from "common/enum";
import { HttpService } from "services/base.service";
import { LoginDTO, LoginReponseDto } from "shared/dto/user/user.dto";
import { Service } from "typedi";
// import { LoginDTO, LoginReponseDto } from "@shared/dto/user/user.dto";

@Service()
export class LoginService extends HttpService {
    public BaseDto: Adto = undefined
    constructor() {
        super(API_URL, AUTH_CONFIG_API.NOT_REQUIRED)
    }
    public login(body: PayLoadLoginBodyDTO) {
        this.BaseDto = new LoginDTO(body)
        return this.runApi<LoginReponseDto>()
    }
  
}
