import { removeAuthoz } from './../helper/cookie/index';
import { Adto } from "common/dto/base.dto";
import { AUTH_CONFIG_API } from "common/enum";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { Service } from "typedi";
import { getAuthoz } from "helper/cookie";
import { Modal } from 'antd';
import { AHttpService } from './httpBase';


@Service()
export abstract class HttpService extends AHttpService {

    public abstract BaseDto: Adto
    private ConfigHeader: AxiosRequestConfig

    constructor(baseURL: string, auth: AUTH_CONFIG_API, _configHeader?: AxiosRequestConfig) {
        
        super(baseURL);

        this._initializeRponseInterceptor()

        if (auth === AUTH_CONFIG_API.REQUIRED)
            this._initializeRequestInterceptor()
        if (_configHeader) {
            this.ConfigHeader = { ..._configHeader }
        }

    }
    private _initializeRequestInterceptor = () => {

        this.fetchAPI.interceptors.request.use(
            this._handleRequest,
        );

    };

    private _initializeRponseInterceptor = () => {

        this.fetchAPI.interceptors.response.use(
            this._handleResponse,
            this._handleError,
        );

    };

    private _handleResponse = ({ data }: AxiosResponse) => data;

    private _handleError = (error: any) => {

        this.resoleError(error)
        return Promise.reject(error)

    };
    private _handleRequest = (config?: AxiosRequestConfig) => {

        const jwt = getAuthoz()
        config.headers['Authorization'] = `Bearer ${jwt}`;
        const newConfig = this.ConfigHeader
        return { ...config, newConfig }

    };

    private resoleError = (err: any) => {

        if (err?.response?.status === 401) {
            removeAuthoz()
            Modal.error({
                title: "Lỗi rùi!!",
                content: 'Vui lòng đăng nhập lại nhé',
                onOk: () => {
                    window.location.reload()
                }
            });
            return
        }
        if (err.response && err.response.data) {
            Modal.error({
                title: "Lỗi rùi!!",
                content: err.response.data.message,
            });
        };
    }

    public runApi<T>(): Promise<T> {

        const { method, interpolatedUrl, bodyDTO } = this.BaseDto
        return this.fetchAPI[method](interpolatedUrl, bodyDTO)

    }
}