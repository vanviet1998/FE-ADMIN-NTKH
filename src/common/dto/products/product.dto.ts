import { MaterialDTO } from './../material/material.dto';
import { CategoryDTO } from './../category/category.dto';
import { METHOD } from "common/enum";
import { Adto, PagingDTO } from "../base.dto";
import { Expose, Exclude } from "class-transformer";
import {  IsArray, IsBoolean, IsNumber, IsString } from "class-validator";
import { Service } from "typedi";

@Exclude()
export class ProductDTO {
    @Expose()
    @IsString()
    public _id!:string;

    @Expose()
    @IsArray()
    public category: CategoryDTO[];

    @Expose()
    @IsArray()
    public image?: string[];

    @Expose()
    @IsArray()
    public color?:string[];

    @Expose()    
    public size?:any;

    @Expose()    
    @IsNumber()
    public guarantee?:number;

    @Expose()    
    @IsNumber()
    public status!:number;

    @Expose()    
    @IsBoolean()
    public optionsPrice!:boolean;

    @Expose()
    @IsString()
    public name!:string;

    @Expose()
    @IsString()
    public descripsion?:string;

    @Expose()
    @IsArray()
    public material:MaterialDTO;

    @Expose()
    @IsNumber()
    public price:number;

    @Expose()
    @IsNumber()
    public disCount:number;

    @Expose()
    @IsString()
    public slug:string;

}

export class GetProductReponseBodyDTO extends PagingDTO<ProductDTO> {
}

@Exclude()
export class GetProductQueryDTO {
   
}

@Service()
export class GetProductDTO extends Adto {
    public url: string = "/product"
    public paramsDTO = undefined
    public bodyDTO = undefined
    public queryDTO = undefined
    public method = METHOD.GET
    public responseDTOClass = GetProductReponseBodyDTO

    constructor(queryDTO: GetProductQueryDTO) {
        super();
        this.queryDTO = queryDTO;
    }
}


/**add --- product */
@Exclude()
export class AddProductReponseBodyDTO {
    @Expose()
    @IsBoolean()
    public succes!:boolean;
   
}


@Exclude()
export class PayLoadAddProductBodyDTO {
    @Expose()
    @IsString()
    public username!:string;
   
    @Expose()
    @IsString()
    public password!:string;
}

@Service()
export class AddProductDTO extends Adto {
    public url: string = "/product"
    public paramsDTO = undefined
    public bodyDTO = undefined
    public queryDTO = undefined
    public method = METHOD.POST
    public responseDTOClass = AddProductReponseBodyDTO

    constructor(bodyDTO: PayLoadAddProductBodyDTO) {
        super();
        this.bodyDTO = bodyDTO;
    }
}


