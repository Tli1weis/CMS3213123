<template>
  <div class="account">
    <el-form :model="account" :rules="rules" label-width="60px" ref="formEl">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { ref } from 'vue';
import useLoginStore from '@/store/login';
import { ElForm, ElMessage } from 'element-plus';
import type { FormRules } from 'element-plus/lib/components/index.js';
import type { Account } from '@/types';
import { myLocalStorage } from '@/utils/MyStorage';

const NAME = 'name',
  PASSWORD = 'password';
const account = reactive<Account>({
  name: myLocalStorage.get(NAME) ?? '',
  password: myLocalStorage.get(PASSWORD) ?? '',
});

const rules: FormRules = {
  name: [
    { required: true, message: '请输入帐号', trigger: 'blur' },
    { pattern: /^[a-z0-9]{6,20}$/, message: '必须是6-20位由数字或字母组成', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { pattern: /^[a-z0-9]{6,}$/, message: '必须是6位以上由数字或字母组成', trigger: 'blur' },
  ],
};

const formEl = ref<InstanceType<typeof ElForm>>();
const loginStore = useLoginStore();
function loginAction(isRemember: boolean) {
  formEl.value?.validate((isValid, fields) => {
    if (isValid) {
      const { name, password } = account;
      loginStore.loginAccountAction({ name, password }).then(() => {
        if (isRemember) {
          myLocalStorage.set(NAME, name);
          myLocalStorage.set(PASSWORD, password);
        } else {
          myLocalStorage.remove(NAME);
          myLocalStorage.remove(PASSWORD);
        }
      });
    } else {
      ElMessage.error('请输入正确');
    }
  });
}

defineExpose({
  loginAction,
});
</script>

<style scoped></style>
