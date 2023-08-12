<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isCreateRef ? '新建用户' : '编辑用户'"
      width="30%"
      center
    >
      <div class="form px-[20px]">
        <el-form :model="form" label-width="80" size="large">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="form.name" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="真实姓名" prop="realname">
            <el-input v-model="form.realname" placeholder="请输入真实姓名" />
          </el-form-item>
          <el-form-item v-if="isCreateRef" label="密码" prop="password">
            <el-input v-model="form.password" show-password placeholder="请输入密码" />
          </el-form-item>
          <el-form-item label="手机号码" prop="cellphone">
            <el-input v-model="form.cellphone" placeholder="请输入手机号码" />
          </el-form-item>
          <el-form-item label="选择角色" prop="roleId">
            <el-select v-model="form.roleId" placeholder="请选择角色" style="width: 100%">
              <template v-for="item in entireRoles" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="选择部门" prop="departmentId">
            <el-select v-model="form.departmentId" placeholder="请输入部门">
              <template v-for="item in entireDepartments" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmHandle"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { ref } from 'vue';
import useMainStore from '@/store/main';
import { storeToRefs } from 'pinia';
import useSystemStore from '@/store/main/system';
const form = reactive<any>({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: '',
});

const mainStore = useMainStore();
const systemStore = useSystemStore();
const { entireDepartments, entireRoles } = storeToRefs(mainStore);
const dialogVisible = ref(false);
const isCreateRef = ref();
const editData = ref();

function create(isCreate: boolean = true, info?: any) {
  dialogVisible.value = true;
  isCreateRef.value = isCreate;
  if (!isCreate) {
    for (const key in form) {
      form[key] = info[key];
    }
    editData.value = info;
  } else {
    for (const key in form) {
      form[key] = '';
    }
    editData.value = null;
  }
}

function confirmHandle() {
  dialogVisible.value = false;
  if (!isCreateRef.value && editData.value) {
    systemStore.editUserDataAction(editData.value.id, form);
  } else {
    systemStore.createUserDataAction(form);
  }
}

defineExpose({
  create,
});
</script>

<style scoped>
.modal {
}
</style>
