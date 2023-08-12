<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isCreateRef ? '新建部门' : '编辑部门'"
      width="30%"
      center
    >
      <div class="form px-[20px]">
        <el-form :model="form" label-width="80" size="large">
          <el-form-item label="部门名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入部门名称" />
          </el-form-item>
          <el-form-item label="部门领导" prop="leader">
            <el-input v-model="form.leader" placeholder="请输入部门领导" />
          </el-form-item>
          <el-form-item label="选择部门" prop="parentId">
            <el-select v-model="form.parentId" placeholder="请输入上级部门">
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
  leader: '',
  parentId: '',
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
    systemStore.editPageDataAction('department', editData.value.id, form);
  } else {
    systemStore.createPageDataAction('department', form);
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
