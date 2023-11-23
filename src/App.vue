<template>
  <el-config-provider >
    <el-container class="full-screen">
      <el-header class="no-padding">
        <TopBar />
      </el-header>
      <el-main class="no-padding">
        <router-view />
      </el-main>
    </el-container>
  </el-config-provider>
  <Login />
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
// import Login from '@components/login.vue';
// import TopBar from '@components/topBar/index.vue';



// 引入组件
const TopBar = defineAsyncComponent(() => import('@components/topBar/index.vue'));
const Login = defineAsyncComponent(() => import('@components/login.vue'));
// 定义变量内容


</script>

<style scoped>
.no-padding {
  padding: 0px;
}
.full-screen {
  height: 100vh;
  width: 100vw;
}
</style>
