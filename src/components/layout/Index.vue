<template>
    <div class="layout-container">
        <el-container>
            <el-header>
                <Header />
            </el-header>

            <el-container>
                <el-aside width="200px">
                    <Aside></Aside>
                </el-aside>
                <el-main>
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import Header from './Header.vue'
import Aside from './Aside.vue'
</script>

<style lang="scss">
.layout-container {
    .el-header {
        background: rgb(0, 39, 102);

    }
}
</style>