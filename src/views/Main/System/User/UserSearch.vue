<template>
  <div class="search">
    <el-form ref="formInstance" :model="form" size="large" label-width="80">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="form.name" placeholder="请输入查询的用户名" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realname">
            <el-input placeholder="请输入查询的真实姓名" v-model="form.realname" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="电话号码" prop="cellphone">
            <el-input placeholder="请输入查询的电话号码" v-model="form.cellphone" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态" prop="enable">
            <el-select placeholder="请选择查询的状态" style="width: 100%" v-model="form.enable">
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
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
  realname: '',
  cellphone: '',
  enable: '',
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
