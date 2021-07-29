import { Exclude, Expose } from "class-transformer";
import { IsString, MinLength } from "class-validator";
import { METHOD } from "common/enum";
import { Service } from "typedi";
import { Adto, PagingDTO, QueryPagingDTO } from "../base.dto";

@Exclude()
export class MaterialDTO {
    @Expose()
    @IsString()
    public _id!: string
    
    @Expose()
    @IsString()
    @MinLength(1,{
        message:"Phải nhập tên vật liệu"
    })
    public title!: string

}

@Exclude()
export class PayLoadAddMaterialBodyDTO {
    @Expose()
    @IsString()
    @MinLength(1,{
        message:"Phải nhập tên vật liệu"
    })
    public title!: string
}
export class AddMaterialDTOReponseBodyDTO{
    public result!: boolean
}

@Service()
export class AddMaterialDTO extends Adto {
    public url: string = "/material/create"
    public paramsDTO = undefined
    public bodyDTO = undefined
    public queryDTO = undefined
    public method = METHOD.POST
    public responseDTOClass = AddMaterialDTOReponseBodyDTO

    constructor(bodyDTO: PayLoadAddMaterialBodyDTO) {
        super();
        this.bodyDTO = bodyDTO;
    }
}

@Exclude()
export class GetMaterialDTOReponseBodyDTO extends PagingDTO<MaterialDTO>{
}

@Exclude()
export class GetMaterialQueryDTO  extends QueryPagingDTO{
}

@Service()
export class GetMaterialDTO extends Adto {
    public url: string = "/material"
    public paramsDTO = undefined
    public bodyDTO = undefined
    public queryDTO = undefined
    public method = METHOD.GET
    public responseDTOClass = GetMaterialDTOReponseBodyDTO

    constructor(queryDTO: GetMaterialQueryDTO) {
        super();
        this.queryDTO = queryDTO;
    }
}

@Exclude()
export class DeleteMaterialQueryDTO {
    @Expose()
    @IsString()
    public id!: string
}
@Service()
export class DeleteMaterialDTO extends Adto {
    public url: string = "/material/delete"
    public paramsDTO = undefined
    public bodyDTO = undefined
    public queryDTO = undefined
    public method = METHOD.DELETE
    public responseDTOClass = GetMaterialDTOReponseBodyDTO

    constructor(queryDTO: DeleteMaterialQueryDTO) {
        super();
        this.queryDTO = queryDTO;
    }
}

@Exclude()
export class GetMaterialParamsDTO {
    @Expose()
    @IsString()
    public id!: string
}

@Exclude()
export class GetDetailMaterialDTOReponseBodyDTO extends MaterialDTO{
}


@Service()
export class GetDetailMaterialDTO extends Adto {
    public url: string = "/material/detail/:id"
    public paramsDTO = undefined
    public bodyDTO = undefined
    public queryDTO = undefined
    public method = METHOD.GET
    public responseDTOClass = GetDetailMaterialDTOReponseBodyDTO

    constructor(paramsDTO: GetMaterialParamsDTO) {
        super();
        this.paramsDTO = paramsDTO;
    }
}


@Exclude()
export class PayLoadUpdateMaterialBodyDTO {
    @Expose()
    @IsString()
    public _id!: string

    @Expose()
    @IsString()
    @MinLength(1,{
        message:"Phải nhập tên vật liệu"
    })
    public title!: string
}

@Service()
export class UpDateMaterialDTO extends Adto {
    public url: string = "/material/update"
    public paramsDTO = undefined
    public bodyDTO = undefined
    public queryDTO = undefined
    public method = METHOD.PUT
    public responseDTOClass = GetDetailMaterialDTOReponseBodyDTO

    constructor(bodyDTO: PayLoadUpdateMaterialBodyDTO) {
        super();
        this.bodyDTO = bodyDTO;
    }
}
