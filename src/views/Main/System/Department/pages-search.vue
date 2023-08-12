<template>
  <div class="search">
    <el-form ref="formInstance" :model="form" size="large" label-width="80">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="部门名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入查询部门名称" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="部门领导" prop="leader">
            <el-input placeholder="请输入查询的部门领导" v-model="form.leader" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              v-model="form.createAt"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="btn">
      <el-button icon="refresh" @click="resetClick">重置</el-button>
      <el-button type="primary" icon="search" @click="queryClick">查询</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ElForm } from 'element-plus';
import { ref } from 'vue';
import { reactive } from 'vue';

const formInstance = ref<InstanceType<typeof ElForm>>();
const form = reactive({
  name: '',
  leader: '',
  createAt: '',
});

const emit = defineEmits(['resetClick', 'queryClick']);

function resetClick() {
  formInstance.value?.resetFields();
  emit('resetClick');
}

function queryClick() {
  emit('queryClick', form);
}
</script>

<style scoped>
.search {
  background-color: #fff;
  padding: 20px;
  .el-form-item {
    padding: 20px 30px;
    margin-bottom: 0;
  }
  .btn {
    text-align: right;
    padding: 0 30px 10px 0;
  }
}
</style>
