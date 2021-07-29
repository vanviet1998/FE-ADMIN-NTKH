import { API_URL } from "common/config";
import { Adto } from "common/dto/base.dto";
import { AUTH_CONFIG_API } from "common/enum";
import { HttpService } from "services/base.service";
import { Service } from "typedi";
import { AddMaterialDTO, AddMaterialDTOReponseBodyDTO, DeleteMaterialDTO, DeleteMaterialQueryDTO, GetDetailMaterialDTO, GetDetailMaterialDTOReponseBodyDTO, GetMaterialDTO, GetMaterialDTOReponseBodyDTO, GetMaterialParamsDTO, GetMaterialQueryDTO, PayLoadAddMaterialBodyDTO, PayLoadUpdateMaterialBodyDTO, UpDateMaterialDTO } from 'common/dto/material/material.dto';

@Service()
export class MaterialService extends HttpService {
    public BaseDto: Adto = undefined
    constructor() {
        super(API_URL, AUTH_CONFIG_API.REQUIRED)
    }
    public createMaterial(body: PayLoadAddMaterialBodyDTO) {
        this.BaseDto = new AddMaterialDTO(body)
        return this.runApi<AddMaterialDTOReponseBodyDTO>()
    }

    public getAllMaterial(query: GetMaterialQueryDTO){
        this.BaseDto = new GetMaterialDTO(query)
        return this.runApi<GetMaterialDTOReponseBodyDTO>()
    }

    public deleteMaterial(query: DeleteMaterialQueryDTO){
        this.BaseDto = new DeleteMaterialDTO(query)
        return this.runApi<GetMaterialDTOReponseBodyDTO>()
    }

    public getDetailMaterial(params: GetMaterialParamsDTO){
        this.BaseDto = new GetDetailMaterialDTO(params)
        return this.runApi<GetDetailMaterialDTOReponseBodyDTO>()
    }

    public updateMaterial(body:PayLoadUpdateMaterialBodyDTO){
        this.BaseDto = new UpDateMaterialDTO(body)
        return this.runApi<GetDetailMaterialDTOReponseBodyDTO>()
    }
}
