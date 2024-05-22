import axios, { type CreateAxiosDefaults, type InternalAxiosRequestConfig } from "axios";
import { token } from "./token";
const { VITE_API_URL } = import.meta.env

//配置
const config: CreateAxiosDefaults = {
    baseURL: VITE_API_URL,
    timeout: 5000,
    headers: {}
}
const instance = axios.create(config)


//请求拦截器
instance.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
    if (token.has())
        config.headers.token = token.get() as string
    /**
     * TOO
     * 更多操作
     */

    return config
}, (error) => {
    return Promise.reject(error)
})

//响应拦截器
instance.interceptors.response.use(
    response => {
        //TOO
        // 更多操作
        return response
    },
    error => {
        /**
         * TOO
         * 更多操作
         */
        return Promise.reject(error)
    }
)