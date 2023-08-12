<template>
  <div class="header flex flex-1 items-center h-[100%] cursor-pointer">
    <div class="menuIcon flex items-center pr-[12px]">
      <el-icon size="28px" @click="foldHandle">
        <component :is="isFold ? 'Expand' : 'Fold'"></component>
      </el-icon>
    </div>
    <div class="content flex items-center flex-1 justify-between pr-[12px]">
      <div class="breadcrumb">
        <BreadCrumb />
      </div>
      <div class="infos flex justify-between w-[200px]">
        <div class="operation flex">
          <span>
            <el-icon><Message /></el-icon>
          </span>
          <span class="chat">
            <el-icon><ChatDotRound /></el-icon>
            <div class="dot"></div>
          </span>
          <span>
            <el-icon><Search /></el-icon>
          </span>
        </div>
        <el-dropdown>
          <span class="el-dropdown-info flex items-center">
            <el-avatar :size="30" :src="'1'" />
            <span class="ml-[8px]">{{ name }}</span>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="exitClick">
                <el-icon><CircleClose /></el-icon>
                <span>退出系统</span>
              </el-dropdown-item>
              <el-dropdown-item divided>
                <el-icon><InfoFilled /></el-icon>
                <span>个人信息</span>
              </el-dropdown-item>
              <el-dropdown-item divided>
                <el-icon><Unlock /></el-icon>
                <span>修改密码</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { TOKEN } from '@/types/constants';
import { myLocalStorage } from '@/utils/MyStorage';
import { ref } from 'vue';
import BreadCrumb from './BreadCrumb.vue';
const isFold = ref(false);
let emit = defineEmits(['foldChange']);

const name = myLocalStorage.get('name');
function exitClick() {
  myLocalStorage.remove(TOKEN);
  router.push('/login');
}

function foldHandle() {
  isFold.value = !isFold.value;
  emit('foldChange', isFold.value);
}
</script>

<style scoped>
.infos {
  :global(.el-dropdown-menu__item) {
    line-height: 36px !important;
    padding: 6px 22px;
  }
  .operation {
    span {
      display: flex;
      width: 32px;
      height: 32px;
      align-items: center;
      &.chat {
        position: relative;
        .dot {
          position: absolute;
          z-index: 10;
          top: 4px;
          right: 10px;
          width: 5px;
          height: 5px;
          background-color: red;
          border-radius: 100%;
        }
      }
    }
  }
}
</style>
