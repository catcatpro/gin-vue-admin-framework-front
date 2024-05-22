<script setup lang="ts">
import { ref, reactive } from 'vue'
const form = reactive({
    username: '',
    password: '',
    code: '',
    auto_login: null,

})

const onSubmit = () => {
    console.log('submit!')
}
</script>

<template>
    <main class="login-container flex justify-center items-center">
        <div class="login-form-container flex">
            <section class="left-area bg-white">
                <h3 class="title">通用后台管理框架</h3>
                <section class="form-container">
                    <h3 class="form-title">账号登录</h3>
                    <el-form :model="form" label-width="auto" style="margin-top: 26px;max-width: 460px; ">
                        <el-space :fill="true" wrap>
                            <el-form-item label="账号">
                                <el-input v-model="form.username" placeholder="请输入账号" />
                            </el-form-item>
                            <el-form-item label="密码">
                                <el-input v-model="form.password" type="password" placeholder="请输入密码" />
                            </el-form-item>
                            <el-form-item label="验证码">
                                <div class="flex">
                                    <el-input style="width: 268px;" v-model="form.code" placeholder="请输入验证码"></el-input>
                                    <img style="width: 122px;height: 32px;margin-left: 16px;"
                                        src="@/assets/img/code.png" alt="">
                                </div>

                            </el-form-item>
                            <el-form-item label=" ">
                                <el-checkbox v-model="form.auto_login" label="自动登录" size="large" />
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
                font-weight: 400;
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