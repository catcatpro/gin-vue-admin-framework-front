import ky from "ky"
import type { Options } from 'ky'
import { token } from "./token"
import _ from 'lodash'
import { ElMessage } from "element-plus"
const { APP_API_URL } = import.meta.env

console.log('eee',import.meta.env.DEV ? '/api' : APP_API_URL)
const config: Options = {
  prefixUrl:  import.meta.env.DEV ? '/api' : APP_API_URL, //正式环境用APP_API_URL, //正式环境用APP_API_URL
  retry: 0,
  timeout: 15000,
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
      }
    ],
    afterResponse: [
      async (request, options, response) => {

        //TOO
        // 更多操作
        return response

      }
    ],
    beforeError: [
      async error => {
      const response: BasicResponse = await error.response.json() as BasicResponse
        console.error('HTTPError', response);

        // 返回要抛出的 HTTPError 对象
        ElMessage.error("系统错误：" + response.msg)
        return error;
      },
    ]
  }
}

const instance = ky.create(config)


export default {
  get: instance.get,
  post: instance.post
}
