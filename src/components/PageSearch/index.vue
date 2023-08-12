<template>
  <div class="search" v-if="isQuery">
    <el-form ref="formInstance" :model="form" size="large" label-width="80">
      <el-row :gutter="20">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input v-model="form[item.prop]" :placeholder="item.placeholder" />
              </template>
              <template v-else-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="form[item.prop]"
                  :placeholder="item.placeholder"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  v-model="form[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="btn">
      <el-button icon="refresh" @click="resetClick">重置</el-button>
      <el-button type="primary" icon="search" @click="queryClick">查询</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import usePermission from '@/hooks/usePermission';
import type { ElForm } from 'element-plus';
import { ref } from 'vue';
import { reactive } from 'vue';
interface Props {
  searchConfig: {
    pageName: string;
    formItems: any[];
  };
}
const props = defineProps<Props>();
const formInstance = ref<InstanceType<typeof ElForm>>();

const isQuery = usePermission(`${props.searchConfig.pageName}:query`);
const initFormVal: any = {};
for (const item of props.searchConfig.formItems) {
  initFormVal[item.prop] = '';
}
const form = reactive(initFormVal);

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
