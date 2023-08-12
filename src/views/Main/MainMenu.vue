<template>
  <div class="menu">
    <div class="logo flex items-center justify-start h-[50px] text-white font-bold">
      <img class="w-[32px] ml-[20px] mr-[8px]" src="https://cn.vitejs.dev/logo.svg" alt="" />
      <span v-show="!isCollapse"> 后台管理系统</span>
    </div>
    <div class="menus">
      <ElMenu
        :default-active="defaultActive"
        background-color="#02152c"
        text-color="#b7bdc3"
        active-text-color="#fff"
        class="select-none"
        :collapse="isCollapse"
      >
        <template v-for="menu in userMenu" :key="menu.id">
          <el-sub-menu :index="menu.id + ''">
            <template #title>
              <el-icon>
                <component :is="menu.icon.split('-icon-')[1]"></component>
              </el-icon>
              <span>{{ menu.name }}</span>
            </template>
            <template v-for="subMenu in menu.children" :key="subMenu.id">
              <el-menu-item :index="subMenu.id + ''" @click="toPage(subMenu.url)">{{
                subMenu.name
              }}</el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </ElMenu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import router from '@/router';
import useLoginStore from '@/store/login';
import { mapPathToMenu } from '@/utils/mapMenuToRoute';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
const { userMenu } = useLoginStore();
defineProps({
  isCollapse: {
    type: Boolean,
    default: false,
  },
});
const route = useRoute();

const defaultActive = computed(() => {
  const curRoute = mapPathToMenu(route.path, userMenu);
  return curRoute.id + '';
});
console.log(defaultActive);

function toPage(url: any) {
  router.push(url);
}
</script>

<style scoped>
.el-menu-item {
  padding-left: 50px !important;
  background-color: #0c1f36;
}
.el-menu-item:hover {
  color: #fff;
}
.el-menu-item.is-active {
  background-color: #0b5dbe;
}
</style>
