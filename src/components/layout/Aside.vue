<template>
    <div class="aside-container">
        <el-menu :defaultActive="menuIndex" class="el-menu-vertical" router @select="menuSelectHandle">

            <el-menu-item v-for="(item) in menuData" :key="item.index" :index="item.index">
                <el-icon>
                    <img :src="menuIndex === item.index ? item.active_icon : item.icon" alt="">
                </el-icon>
                <span>{{ item.name }}</span>
            </el-menu-item>

        </el-menu>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue';
import type { RouteRecord } from 'vue-router';
import toolbox from '@/utils/toolbox'

type menu = {
    index: string
    name: string
    icon: string
    active_icon: string
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
    {
        index: '/database',
        name: '数据库管理',
        // path: '/dash-board',
        icon: '/src/assets/img/database_management.png',
        active_icon: '/src/assets/img/database_management_active.png',
    },
])

onMounted(() => {
    menuIndex.value = toolbox.getCurrentRoutePath()
})
//菜单切换回调
const menuSelectHandle = (index: string, router: RouteRecord) => {
    menuIndex.value = index
}
</script>

<style lang="scss"></style>