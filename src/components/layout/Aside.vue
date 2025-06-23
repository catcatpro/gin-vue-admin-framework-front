<template>
    <div class="aside-container">
        <el-menu :defaultActive="menuIndex" class="el-menu-vertical" router @select="menuSelectHandle">
            <template v-for="(item) in menuData" :key="item.index" :index="item.index">

                <el-sub-menu v-if="item.sub_menu?.length" :index="item.index">
                    <template #title>
                        <el-icon>
                            <img :src="menuIndex === item.index ? item.active_icon : item.icon" alt="">
                        </el-icon>
                                     <span class="text-base">{{ item.name }}</span>
                    </template>
                    <template v-for="(sub_item) in item.sub_menu" :key="sub_item.index">
                        <el-menu-item :index="sub_item.index">{{ sub_item.name }}</el-menu-item>
                    </template>
                </el-sub-menu>

                <el-menu-item v-else class="px-8" :index="item.index">
                    <el-icon>
                        <img :src="menuIndex === item.index ? item.active_icon : item.icon" alt="">
                    </el-icon>
                    <span class="text-base">{{ item.name }}</span>

                </el-menu-item>
            </template>


        </el-menu>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue';
import type { RouteRecord } from 'vue-router';
import toolbox from '@/utils/toolbox'

type sub_menu = {
    index: string
    name: string
    icon: string
    active_icon: string,
}
type menu = {
    index: string
    name: string
    icon: string
    active_icon: string,
    sub_menu?: sub_menu[]
}
const menuIndex = ref('/dash-board')
const menuData = reactive<menu[]>([
    {
        index: '/dashboard',
        name: '仪表盘',
        // path: '/dash-board',
        icon: '/src/assets/img/dashboard.png',
        active_icon: '/src/assets/img/dashboard_active.png',
    },
    // {
    //     index: '/database',
    //     name: '数据库管理',
    //     // path: '/dash-board',
    //     icon: '/src/assets/img/database_management.png',
    //     active_icon: '/src/assets/img/database_management_active.png',
    // },
    {
        index: 'user_management',
        name: '用户管理',
        icon: '/src/assets/img/user_management.png',
        active_icon: '/src/assets/img/user_management_active.png',
        sub_menu: [
            {

                index: '/role',
                name: '角色管理',
                icon: '/src/assets/img/database_management.png',
                active_icon: '/src/assets/img/database_management_active.png',
            },
            {
                index: '/user_list',
                name: '用户列表',
                icon: '/src/assets/img/database_management.png',
                active_icon: '/src/assets/img/database_management_active.png',
            },
        ]

    },
  {
    index: '/system_settings',
    name: '系统设置',
    // path: '/dash-board',
    icon: '/src/assets/img/settings.png',
    active_icon: '/src/assets/img/settings_active.png',
  },
])

onMounted(() => {
    menuIndex.value = toolbox.getCurrentRoutePath()
})
//菜单切换回调
const menuSelectHandle = (index: string, router: RouteRecord) => {
    console.log(index)
    menuIndex.value = index
}
</script>

<style lang="scss"></style>