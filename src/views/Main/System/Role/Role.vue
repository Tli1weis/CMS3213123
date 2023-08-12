<template>
  <div class="role">
    <PageSearch :searchConfig="searchConfig" @query-click="queryClick" @reset-click="resetClick" />
    <PageContent
      :contentConfig="contentConfig"
      ref="contentRef"
      @create-click="createClick"
      @edit-click="editClick"
    />
    <PageModal :modalConfig="modalConfig" ref="modalRef" :otherInfo="otherInfo">
      <template #menulist>
        <el-tree
          ref="treeRef"
          :data="entireMenus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="checkClick"
        />
      </template>
    </PageModal>
  </div>
</template>

<script setup lang="ts" name="role">
import PageSearch from '@/components/PageSearch/index.vue';
import PageContent from '@/components/PageContent/index.vue';
import PageModal from '@/components/PageModal/index.vue';
import searchConfig from './config/search.config';
import contentConfig from './config/content.config';
import modalConfig from './config/modal.config';
import usePageContent from '@/hooks/usePageContent';
import usePageModal from '@/hooks/usePageModal';
import useMainStore from '@/store/main/index';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import type { ElTree } from 'element-plus';
import { nextTick } from 'vue';
import { mapMenuToIds } from '@/utils/mapMenuToRoute';
const mainStore = useMainStore();
const { entireMenus } = storeToRefs(mainStore);
const { resetClick, queryClick, contentRef } = usePageContent();
const { createClick, editClick, modalRef } = usePageModal(createCallback, editCallback);

const otherInfo = ref({});
const treeRef = ref<InstanceType<typeof ElTree>>();
function checkClick(checked: any, parentCheck: any) {
  const menuList = [...parentCheck.checkedKeys, ...parentCheck.halfCheckedKeys];
  otherInfo.value = { menuList };
}

function createCallback() {
  nextTick(() => {
    treeRef.value?.setCheckedKeys([]);
  });
}
function editCallback(itemData: any) {
  nextTick(() => {
    const menuIds = mapMenuToIds(itemData.menuList);
    treeRef.value?.setCheckedKeys([...menuIds]);
  });
}
</script>

<style scoped>
.role {
}
</style>
