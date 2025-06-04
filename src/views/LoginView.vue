<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { CommonApi } from '@/api/Coommon'
import { type FormRules, type FormInstance, ElMessage } from 'element-plus'
import { UserApi } from '@/api/User.ts'
import { token } from '@/utils/token.ts'
import router from '@/router'
import { useUserStore } from "@/stores/user"
const userStore = useUserStore()
const isLoading = ref(false)
onMounted(() => {
    setTimeout(async () => {

        getCaptcha()
        // if (userStore.auto_login) {
        //     await userStore.getUserInfoByToken()
        //     if (userStore.auth_status)
        //         router.push("/")
        //     else {
        //         isLoading.value = false
        //         ElMessage.error("登录失败！")
        //     }
        // }
    }, 500);
})

const formRef = ref<FormInstance>()
const form = reactive<LoginForm>({
    username: '',
    password: '',
    code: '',
    auto_login: null,

})

const rules = reactive<FormRules<LoginForm>>({
    username: [
        { required: true, message: '请输入用户名！', trigger: 'blur' },
        // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码！', trigger: 'blur' },
    ],
    code: [
        { required: true, message: '请输入验证码！', trigger: 'blur' },
    ]
})

const captcha = ref<Captcha>({
    captcha: '',
    id: ''
})

const getCaptcha = async () => {
    const res = await CommonApi.getCaptcha()
    const jsonData = await res.json()
    captcha.value = jsonData.data
}
const onSubmit = async () => {
    if (!formRef.value) return
    isLoading.value = true
    await formRef.value.validate(async (valid: boolean, invalidFields) => {
        if (!valid) {
            ElMessage.error("输入有误！")
        }else{
                 const userStore = useUserStore()
        await userStore.userLogin(form.username, form.password, { captcha: form.code, id: captcha.value.id }, form.auto_login as string)
   
        }

        //登录
        // const res  = await UserApi.Login(form.username, form.password,{ captcha: form.code, id: captcha.value.id}, form.auto_login as string)
        // const jsonData = await res.json() as  LoginResponse
        // if(jsonData.status === HttpStatusMsg.Error) return
        // // 设置token
        // token.set(jsonData.data.token)
        // await router.push('/')
   
        isLoading.value = false;
   
   
    })
}
</script>

<template>
    <main class="login-container flex justify-center items-center">
        <div class="login-form-container flex"  v-loading="isLoading">
            <section class="left-area bg-white">
                <h3 class="title font-medium">通用后台管理框架</h3>
                <section class="form-container">
                    <h3 class="form-title">账号登录</h3>
                    <el-form ref="formRef" :rules="rules" :model="form" label-width="auto"
                        style="margin-top: 26px;max-width: 460px; " size="large">
                        <el-space :fill="true" wrap>
                            <el-form-item label="账号" prop="username">
                                <el-input v-model="form.username" placeholder="请输入账号" />
                            </el-form-item>
                            <el-form-item label="密码" prop="password">
                                <el-input v-model="form.password" type="password" placeholder="请输入密码" />
                            </el-form-item>
                            <el-form-item label="验证码" prop="code">
                                <div class="flex">
                                    <el-input style="width: 268px;" v-model="form.code" placeholder="请输入验证码"
                                        size="large"></el-input>
                                    <img @click="getCaptcha" style="width: 122px; height: 38px; margin-left: 16px;"
                                        :src="captcha.captcha" alt="">
                                </div>

                            </el-form-item>
                            <el-form-item label=" " prop="auto_login">
                                <el-checkbox v-model="form.auto_login" label="自动登录" />
                            </el-form-item>
                        </el-space>


                    </el-form>
                    <div class="flex justify-center" style="margin-top: 102px;">
                        <el-button style="width: 245px;
height: 40px;" type="primary" size="large" @click="onSubmit">登录</el-button>
                    </div>

                </section>
            </section>
            <section class="right-area flex justify-center items-center">
                <div class="illus-img">
                    <img src="@/assets/img/illus.png" alt="">
                </div>
            </section>

        </div>
    </main>
</template>
<style lang="scss">
.login-container {
    width: 100%;
    height: 100vh;
    background: rgb(229, 242, 255);

    .login-form-container {
        min-height: 720px;

        .left-area {
            padding: 54px 28px;
            width: 552px;
            height: 720px;
            border-radius: 0px 32px 32px 0px;
            z-index: 99;

            .title {
                color: rgb(48, 49, 51);
                font-size: 24px;
                font-weight: 600;
                line-height: 34px;
                letter-spacing: 0px;
                text-align: left;


            }

            .form-container {
                margin-top: 26px;

                .form-title {

                    color: rgb(11, 11, 11);
                    font-size: 20px;
                    font-weight: 400;
                    line-height: 28px;
                    letter-spacing: 0px;
                    text-align: left;
                }
            }
        }

        .right-area {
            width: 706px;
            margin-left: -24px;
            background: rgb(214, 234, 255);

            .illus-img {
                width: 557px;
                height: 413px;

                img {
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
}
</style>