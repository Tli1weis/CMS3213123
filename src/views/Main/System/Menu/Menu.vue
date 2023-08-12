<template>
  <div class="menu">
    <PageContent
      :content-config="contentConfig"
      @create-click="createClick"
      @edit-click="editClick"
    />
    <PageModal :modalConfig="modalConfig" ref="modalRef">
      <template #menulist>
        <span>11</span>
      </template>
    </PageModal>
  </div>
</template>

<script setup lang="ts" name="menu">
import PageContent from '@/components/PageContent/index.vue';
import PageModal from '@/components/PageModal/index.vue';
import contentConfig from './config/content.config';
import modalConfig from './config/modal.config';

import usePageModal from '@/hooks/usePageModal';

const { modalRef, createClick, editClick } = usePageModal();
</script>

<style scoped>
.menu {
}
</style>
