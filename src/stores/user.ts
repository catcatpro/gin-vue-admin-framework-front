import { UserApi } from "@/api/UserApi";
import router from "@/router";
import { token } from "@/utils/token";
import { defineStore } from "pinia";
import { HttpStatus } from "@/enums/api";
import { storage } from "@/utils/storage";
import { ElMessage } from "element-plus";

export const useUserStore = defineStore('user', {
    state: () => ({
        auth_status: token.has(),
        auto_login: storage.get('auto_login') ? true : false,
        user_info:  {}
    }),
    getters: {
        getUserInfo: (state) => state.user_info,
        getAuthStatus: (state) => state.auth_status
    },
    actions: {
        async userLogin(username: string, password: string, captcha: Captcha, auto_login: string) {
            const res = await UserApi.Login(username, password, captcha, auto_login as string)
            const jsonData = await res.json() as LoginResponse
            if (jsonData.status === HttpStatus.Error) return
            if (auto_login)
                storage.set('auto_login', '1')
            token.set(jsonData.data['token'])
            token.setRefathToken(jsonData.data['refresh_token'])
            this.auth_status = true
            router.push('/')
        },

        userLogout() {
            this.auth_status = false
            token.remove()
            token.removeRefathToken()
            //返回登录页面
            router.push('/login')
        },
        async getUserInfoByToken() {
            const _token = token.get()
            if (_token) {
                const res = await UserApi.getUserInfoByToken()
                console.log("res", res)
                const jsonData = await res.json() as UserInfoResponse
                if (res.status == 200) {
                    if (jsonData.status == HttpStatus.Success) {
                        this.auth_status = true
                        this.user_info = jsonData.data
                    }
                }
            }
        }
    }
})