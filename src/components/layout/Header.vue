<template>
    <div class="header-container flex justify-between">
        <div class="logo-container">
            <div class="logo">
                <h3>通用后台开发框架</h3>
            </div>
        </div>

        <div class="user-container flex items-center">
            <div class="user-avatar">
                <img src="@/assets/img/avatar.png" alt="">
            </div>
            <div class="user-name">
                <span>{{ userStore.user_info?.username }}</span>
            </div>
          <div class="arrow mt-2 ml-2">
            <el-icon :size="24">
              <ArrowDown />
            </el-icon>
          </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {onMounted} from 'vue'
import { useUserStore } from '@/stores/user';
import { ArrowDown } from '@element-plus/icons-vue'

 const userStore = useUserStore()


onMounted(async () =>{
  await userStore.getUserInfoByToken()

})
</script>

<style lang="scss">
.header-container {
    width: 100%;
    color: #fff;

    .logo-container {
        .logo {
            h3 {
                color: rgb(255, 255, 255);
                font-size: 20px;
                font-weight: 700;
                line-height: 35px;
                letter-spacing: 0px;
                text-align: left;
            }
        }
    }

    .user-container {
        .user-avatar {
            width: 32px;
            height: 32px;

            img {
                width: 100%;
                height: 100%;
                display: block;
            }
        }

        .user-name {
            margin-left: 16px;

            span {
                color: rgb(255, 255, 255);
                font-size: 20px;
                font-weight: 700;
                line-height: 29px;
                letter-spacing: 0px;
                text-align: left;
            }
        }
    }
}
</style>
