<template>
    <div class="aside-container">
        <el-menu :defaultActive="menuIndex" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
            router>
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
import { reactive, ref } from 'vue';
const menuIndex = ref('/dash-board')
const menuData = reactive([
    {
        index: '/dash-board',
        name: '仪表盘',
        // path: '/dash-board',
        icon: '/src/assets/img/dashboard.png',
        active_icon: '/src/assets/img/dashboard_active.png',
    },
    {
        index: '/database_management',
        name: '数据库管理',
        // path: '/dash-board',
        icon: '/src/assets/img/database_management.png',
        active_icon: '/src/assets/img/database_management_active.png',
    },
])
</script>

<style lang="scss"></style>