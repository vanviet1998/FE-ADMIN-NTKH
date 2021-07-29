import { API_URL } from "common/config";
import { Adto, ReponseDefaultDTO } from "common/dto/base.dto";
import { AUTH_CONFIG_API } from "common/enum";
import { HttpService } from "services/base.service";
import { Service } from "typedi";
import {
    GetDetailMaterialDTO,
    GetDetailMaterialDTOReponseBodyDTO,
    GetMaterialDTOReponseBodyDTO,
    GetMaterialParamsDTO,
    PayLoadUpdateMaterialBodyDTO,
    UpDateMaterialDTO
} from 'common/dto/material/material.dto';
import {
    GetCategoryDTOReponseBodyDTO,
    GetCategorylDTO, 
    GetCategoryQueryDTO,
    DeleteCategoryDTO, 
    DeleteCategoryQueryDTO, 
    AddCategorylDTO, 
    PayloadAddCategoryDTO
} from "common/dto/category/category.dto";

@Service()
export class CategorylService extends HttpService {
    public BaseDto: Adto = undefined
    constructor() {
        super(API_URL, AUTH_CONFIG_API.REQUIRED)
    }
    public createCategory(body: PayloadAddCategoryDTO) {
        this.BaseDto = new AddCategorylDTO(body)
        return this.runApi<ReponseDefaultDTO>()
    }

    public getAllCategory(query: GetCategoryQueryDTO) {
        this.BaseDto = new GetCategorylDTO(query)
        return this.runApi<GetCategoryDTOReponseBodyDTO>()
    }

    public deleteCategory(query: DeleteCategoryQueryDTO) {
        this.BaseDto = new DeleteCategoryDTO(query)
        return this.runApi<GetMaterialDTOReponseBodyDTO>()
    }

    public getDetailMaterial(params: GetMaterialParamsDTO) {
        this.BaseDto = new GetDetailMaterialDTO(params)
        return this.runApi<ReponseDefaultDTO>()
    }

    public updateMaterial(body: PayLoadUpdateMaterialBodyDTO) {
        this.BaseDto = new UpDateMaterialDTO(body)
        return this.runApi<GetDetailMaterialDTOReponseBodyDTO>()
    }
}
