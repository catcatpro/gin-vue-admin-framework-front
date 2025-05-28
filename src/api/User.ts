import ky_http from '@/utils/ky_http'
import type { ResponsePromise } from 'ky'
import toolbox from '@/utils/toolbox.ts'

export class UserApi{

  /**
   * 登录接口
   * @param {string} username
   * @param {string} password
   * @param {Captcha} captcha
   * @constructor
   * @return { ResponsePromise<LoginResponse> }
   */
  static Login(username : string, password: string, captcha: Captcha, auto_login: string): ResponsePromise<LoginResponse>{
    const sendData = {
      username,
      password,
      captcha: captcha.captcha,
      captcha_id: captcha.id,
      auto_login: auto_login,
    }
    return ky_http.post<LoginResponse>("public/admin/user/login", {
      json: sendData,
    })

  }
}