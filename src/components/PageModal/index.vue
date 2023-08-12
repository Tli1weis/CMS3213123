<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isCreateRef ? modalConfig.head.newTitle : modalConfig.head.editTitle"
      width="30%"
      center
    >
      <div class="form px-[20px]">
        <el-form :model="form" label-width="80" size="large">
          <template v-for="item in modalConfig.formItems">
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
              <template v-else-if="item.type === 'custom'">
                <slot :name="item.slotName"></slot>
              </template>
            </el-form-item>
          </template>
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
import type { ModalProps } from './types';

const props = defineProps<ModalProps>();
const initialVal: any = {};
for (const item of props.modalConfig.formItems) {
  initialVal[item.prop] = item.initialVal ?? '';
}

const form = reactive<any>(initialVal);

const systemStore = useSystemStore();

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
  let formInfo = form;
  if (props.otherInfo) {
    formInfo = { ...formInfo, ...props.otherInfo };
  }
  if (!isCreateRef.value && editData.value) {
    systemStore.editPageDataAction(props.modalConfig.pageName, editData.value.id, formInfo);
  } else {
    systemStore.createPageDataAction(props.modalConfig.pageName, formInfo);
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
