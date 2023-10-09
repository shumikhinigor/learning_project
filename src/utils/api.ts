import axios, { AxiosInstance, CreateAxiosDefaults, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_TOKEN, API_URL } from 'utils/config';

class ApiInstance {
    private instance: AxiosInstance;

    constructor(config?: CreateAxiosDefaults) {
        this.instance = axios.create({ baseURL: API_URL, ...config });
    }

    async request<T>(options: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        const headers = {
            'Content-Type': 'application/json',
            authorization: `Bearer ${API_TOKEN}`,
            ...options.headers,
        };
        return await this.instance.request<T>({ ...options, headers });
    }
}

export const Api = new ApiInstance();
