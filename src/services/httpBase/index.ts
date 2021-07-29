import axios, { AxiosInstance } from "axios"
import { Service } from "typedi";

@Service()
export abstract class AHttpService {
    protected fetchAPI: AxiosInstance
    public constructor(baseURL: string) {
        this.fetchAPI = axios.create({
            baseURL,
        });
    }


}