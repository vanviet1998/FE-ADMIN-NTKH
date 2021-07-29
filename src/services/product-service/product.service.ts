import { GetProductQueryDTO } from './../../common/dto/products/product.dto';
import { API_URL } from "common/config";
import { Adto } from "common/dto/base.dto";
import { AUTH_CONFIG_API } from "common/enum";
import { HttpService } from "services/base.service";
import { Service } from "typedi";
import { GetProductDTO, GetProductReponseBodyDTO } from 'common/dto/products/product.dto';

@Service()
export class ProductService extends HttpService {
    public BaseDto: Adto = undefined
    constructor() {
        super(API_URL, AUTH_CONFIG_API.REQUIRED)
    }
    public getProducts(body: GetProductQueryDTO) {
        this.BaseDto = new GetProductDTO(body)
        return this.runApi<GetProductReponseBodyDTO>()
    }

}
