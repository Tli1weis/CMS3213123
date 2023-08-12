<template>
  <div class="crumb">
    <el-breadcrumb separator="/">
      <template v-for="item in breadCrumb" :key="item.name">
        <el-breadcrumb-item :to="{ path: item.path! }">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/store/login';
import { mapPathToBreadCrumb } from '@/utils/mapMenuToRoute';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const userMenu = useLoginStore().userMenu;
const breadCrumb = computed(() => {
  return mapPathToBreadCrumb(route.path, userMenu);
});
console.log(breadCrumb);
</script>

<style scoped></style>
