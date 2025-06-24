import ky from "ky"
import type { Options } from 'ky'
import { token } from "./token"
import _ from 'lodash'
import { ElMessage } from "element-plus"
import { useUserStore } from "@/stores/user"
import router from "@/router"
import { UserApi } from "@/api/UserApi"
//@ts-ignore
const { APP_API_URL } = import.meta.env
//@ts-ignore
console.log('eee', import.meta.env.DEV ? '/api' : APP_API_URL)
const config: Options = {
  //@ts-ignore
  prefixUrl: import.meta.env.DEV ? '/api' : APP_API_URL, //正式环境用APP_API_URL, //正式环境用APP_API_URL
  retry: {
    limit: 1,
    methods: ['post'],
    statusCodes: [401]
  },
  timeout: 1500,
  headers: {},
  hooks: {
    beforeRequest: [
      (request, options) => {
        if (token.has()) {
          request.headers.set('x-header-token', `${token.get()}`);
        }
        /**
 * TOO
 * 更多操作
 */
        console.log(' beforeRequest')
      }
    ],
    afterResponse: [
      async (request, options, response) => {
        console.log("  afterResponse:")
        //TOO
        // 更多操作
        // if (response.headers.has('authorization')) {
        //   // 设置token
        //   const AuthorizationStr = response.headers.get('authorization')
        //   if (AuthorizationStr) {
        //     const userStore = useUserStore()
        //     const searchIndex = "Bearer ".length
        //     const tokenStr = AuthorizationStr.substring(searchIndex)
        //     console.log(tokenStr, AuthorizationStr, searchIndex)
        //     token.set(tokenStr)
        //     userStore.auth_status = true
        //   }

        // }
        if (response.status == 401) {
          const userStore = useUserStore()
          try {
            const res = await UserApi.RefreshToken(token.getRefathToken() as string)
            const jsonData = await res.json() as RefreshTokenResponse
            console.log('jsonData.data', jsonData.data['token'])
            token.set(jsonData.data['token'] as string)
            userStore.auth_status = true
           //@ts-ignore
            options.headers.set('x-header-token', `${token.get()}`);

          } catch (err) {
            options.retry.limit = 0
           request.clone()
            ElMessage.error("登录状态已过期！")
            userStore.userLogout()
          }
        } else {

        }
        return response

      }
    ],
    beforeError: [
      //@ts-ignore
      async (error) => {
        const response: BasicResponse = await error.response.json() as BasicResponse
        const originalRequest = error.request;
        // 返回要抛出的 HTTPError 对象
        if (error.response.status != 401 && response && response.msg) {
          error.message = `${response.msg} (${response.status})`;
          ElMessage.error("系统错误：" + error.message);
        }
        return error;
      },
    ],

  }
}

const instance = ky.create(config)


export default {
  get: instance.get,
  post: instance.post
}
