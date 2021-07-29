import { Exclude, Expose } from "class-transformer";
import { IsString, MinLength } from "class-validator";
import { METHOD } from "common/enum";
import { Service } from "typedi";
import { Adto, PagingDTO, QueryPagingDTO, ReponseDefaultDTO } from "../base.dto";

@Exclude()
export class CategoryDTO {

    @Expose()
    @IsString()
    public _id!: string

    @Expose()
    @IsString()
    public title!: string

    @Expose()
    @IsString()
    public parent_id?: string


}
@Exclude()
export class GetCategoryDTOReponseBodyDTO extends PagingDTO<CategoryDTO>{
}

@Exclude()
export class GetCategoryQueryDTO  extends QueryPagingDTO{
}

@Service()
export class GetCategorylDTO extends Adto {
    public url: string = "/category"
    public paramsDTO = undefined
    public bodyDTO = undefined
    public queryDTO = undefined
    public method = METHOD.GET
    public responseDTOClass = GetCategoryDTOReponseBodyDTO

    constructor(queryDTO: GetCategoryQueryDTO) {
        super();
        this.queryDTO = queryDTO;
    }
}

@Exclude()
export class DeleteCategoryQueryDTO {
    @Expose()
    @IsString()
    public id!: string
}

@Service()
export class DeleteCategoryDTO extends Adto {
    public url: string = "/category/delete"
    public paramsDTO = undefined
    public bodyDTO = undefined
    public queryDTO = undefined
    public method = METHOD.DELETE
    public responseDTOClass = ReponseDefaultDTO

    constructor(queryDTO: DeleteCategoryQueryDTO) {
        super();
        this.queryDTO = queryDTO;
    }
}

@Exclude()
export class PayloadAddCategoryDTO {

    @Expose()
    @IsString()
    @MinLength(1,{
        message:"Phải nhập tên vật liệu"
    })
    public title!: string

    @Expose()
    @IsString()
    public parent_id?: string


}

@Service()
export class AddCategorylDTO extends Adto {
    public url: string = "/category/create"
    public paramsDTO = undefined
    public bodyDTO = undefined
    public queryDTO = undefined
    public method = METHOD.POST
    public responseDTOClass = ReponseDefaultDTO

    constructor(bodyDTO: PayloadAddCategoryDTO) {
        super();
        this.bodyDTO = bodyDTO;
    }
}