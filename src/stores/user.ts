import { UserApi } from "@/api/User";
import router from "@/router";
import { token } from "@/utils/token";
import { defineStore } from "pinia";
import { HttpStatus } from "@/enums/api";
import { storage } from "@/utils/storage";

export const useUserStore = defineStore('user', {
    state: () => ({
        auth_status: false,
        auto_login: storage.get('auto_login') ? true : false,
        user_info: storage.get("user_info") ? JSON.parse(storage.get("user_info") ?? "{}") : null
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
            // 设置token
            token.set(jsonData.data.token)
            this.auth_status = true
            await router.push('/')
        },
        async getUserInfoByToken() {
            const _token = token.get()
            if (_token) {
                const res = await UserApi.getUserInfoByToken(_token)
                const jsonData = await res.json() as UserInfoResponse
                if (jsonData.status == HttpStatus.Success) {
                    this.auth_status = true
                    this.user_info = jsonData.data
                }

            }
        }
    }
})