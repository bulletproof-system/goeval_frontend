<template>
  <el-config-provider >
    <el-container>
      <el-header><TopBar /></el-header>
      <el-main><router-view /></el-main>
    </el-container>
  </el-config-provider>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, computed } from 'vue';
import { storeToRefs } from 'pinia';

import { useThemeConfig } from '@/stores/themeConfig';


// 引入组件
const TopBar = defineAsyncComponent(() => import('@components/topBar/index.vue'));

// 定义变量内容
const storesThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storesThemeConfig);


</script>

<style scoped>

</style>
