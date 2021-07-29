import { Exclude, Expose } from "class-transformer";
import { IsArray, IsBoolean, IsNumber } from "class-validator";
import { METHOD } from "common/enum";

export abstract class Adto {
    public abstract paramsDTO: any;
	public abstract queryDTO: any;
	public abstract bodyDTO: any;
    public abstract readonly url: string;
    public abstract readonly method: METHOD;
	public abstract readonly responseDTOClass: Constructor<any>;

    public get interpolatedUrl(): string {
		let url = this.url;
		if (this.paramsDTO) {
			Object.keys(this.paramsDTO).forEach((key) => {
				url = url.replace(":" + key, String(this.paramsDTO[key]));
			});
		}
		if (this.queryDTO) {
			Object.keys(this.queryDTO).forEach((key, index) => {
				if (this.queryDTO[key]) {
					url += (index === 0 ? "?" : "&") + key + "=" + String(this.queryDTO[key]);
				}
			});
		}
		return url;
	}

}

@Exclude()
export  class PagingDTO<T> {
	@Expose()
	@IsNumber()
	public total!:number;

	@Expose()
	@IsNumber()
	public page!:number;

	@Expose()
	@IsNumber()
    public pageSize!:number;

	@Expose()
	@IsArray()
    public result!:T[];
}

@Exclude()
export abstract class QueryPagingDTO {
	@Expose()
	@IsNumber()
	public pageNumber!:number;

	@Expose()
	public q?:string;

	@Expose()
	@IsNumber()
    public limit!:number;


}

@Exclude()
export abstract class ReponseDefaultDTO {
	@Expose()
	@IsBoolean()
    public resuilt!:boolean;
}