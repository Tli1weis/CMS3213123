<template>
  <div class="login-bg bg-[url('@/assets/img/login-bg.svg')] h-[100%] w-[100%] bg-no-repeat">
    <div class="login flex justify-center items-center flex-col h-[100%] w-[330px] mx-[auto]">
      <h2 class="font-bold text-[32px]">后台管理系统</h2>
      <el-tabs v-model="activeName" type="border-card" class="w-[100%] mt-[20px]" stretch>
        <el-tab-pane name="account">
          <template #label>
            <el-icon class="mr-1"><UserFilled /></el-icon>
            用户登录
          </template>
          <FormAccount ref="accountRef" />
        </el-tab-pane>
        <el-tab-pane name="phone">
          <template #label>
            <el-icon class="mr-1"><Cellphone /></el-icon>
            手机登录
          </template>
          <FormPhone />
        </el-tab-pane>
      </el-tabs>
      <div class="control flex justify-between items-center w-[100%]">
        <el-checkbox v-model="isRemember" label="记住密码" size="large" />
        <el-link type="primary">忘记密码</el-link>
      </div>
      <el-button type="primary" class="login-btn w-[100%] leading-0" @click="loginClick"
        >立即登录</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FormAccount from '@/views/Login/FormAccount.vue';
import FormPhone from '@/views/Login/FormPhone.vue';
import { myLocalStorage } from '@/utils/MyStorage';
import { watch } from 'vue';

const activeName = ref('account');
const isRemember = ref<boolean>(myLocalStorage.get('isRemember') ?? false);
const accountRef = ref<InstanceType<typeof FormAccount>>();
watch(isRemember, (newVal) => {
  myLocalStorage.set('isRemember', newVal);
});
function loginClick() {
  if (activeName.value === 'account') {
    accountRef.value?.loginAction(isRemember.value);
  } else {
    console.log('phone');
  }
}
</script>

<style scoped></style>
