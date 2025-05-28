import ky_http from '@/utils/ky_http'
import type { ResponsePromise } from 'ky'

/**
 * 公共接口
 */
export class CommonApi{
    /**
     * 获取图形验证码
     * @return ResponsePromise<GetCaptchaResponse>
     */
    static  getCaptcha() : ResponsePromise<GetCaptchaResponse>{
        return ky_http.get<GetCaptchaResponse>("public/sys/get_captcha")
    }
}