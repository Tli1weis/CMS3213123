<template>
  <div class="department">
    <PageSearch :searchConfig="searchConfig" @query-click="queryClick" @reset-click="resetClick" />
    <PageContent
      :contentConfig="contentConfig"
      ref="contentRef"
      @create-click="createClick"
      @edit-click="editClick"
    >
      <template #leader="scope"> x-{{ scope.row[scope.prop] }} </template>
      <template #parent="scope"> y-{{ scope.row[scope.prop] }} </template>
    </PageContent>
    <PageModal :modalConfig="modalConfigRef" ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="department">
import PageSearch from '@/components/PageSearch/index.vue';
import PageContent from '@/components/PageContent/index.vue';
import PageModal from '@/components/PageModal/index.vue';
import searchConfig from './config/search.config';
import contentConfig from './config/content.config';
import modalConfig from './config/modal.config';
import { computed } from 'vue';
import useMainStore from '@/store/main';
import usePageContent from '@/hooks/usePageContent';
import usePageModal from '@/hooks/usePageModal';
const modalConfigRef = computed(() => {
  const mainStore = useMainStore();
  const departments = mainStore.entireDepartments.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  modalConfig.formItems.forEach((item) => {
    if (item.prop === 'parentId') {
      item.options.push(...departments);
    }
  });
  return modalConfig;
});

const { contentRef, resetClick, queryClick } = usePageContent();

const { modalRef, createClick, editClick } = usePageModal();
</script>

<style scoped></style>
