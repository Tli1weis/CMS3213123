<template>
  <div class="main h-[100%]">
    <el-container class="h-[100%]">
      <el-aside class="bg-[#02152c]" :width="isCollapse ? '60px' : '210px'">
        <MainMenu :isCollapse="isCollapse" />
      </el-aside>
      <el-container>
        <el-header height="50px">
          <MainHeader @fold-change="foldChange" />
        </el-header>
        <el-main>
          <MainContent />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import MainMenu from './MainMenu.vue';
import MainHeader from './MainHeader.vue';
import MainContent from './MainContent.vue';
import { ref } from 'vue';

const isCollapse = ref(false);
function foldChange(isFold: boolean) {
  console.log(isFold);
  isCollapse.value = isFold;
}
</script>

<style scoped>
.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  transition: width 0.5s ease;
  &::-webkit-scrollbar {
    display: none;
  }
}
.el-main {
  background-color: #f0f2f5;
}
</style>
