<template>
  <div class="echart-card bg-white flex flex-col justify-center mt-[10px]">
    <div class="title border-b leading-[40px] px-[20px]">卡片的头部标题</div>
    <div class="echart flex-1 p-[20px]">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
