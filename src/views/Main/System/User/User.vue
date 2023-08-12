<template>
  <div class="user">
    <PageSearch :searchConfig="searchConfig" @reset-click="resetClick" @query-click="queryClick" />
    <UserContent ref="contentRef" @create-click="createUser" @edit-click="editUser" />
    <UserModal ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="user">
import PageSearch from '@/components/PageSearch/index.vue';
import UserContent from './UserContent.vue';
import UserModal from './UserModal.vue';
import { ref } from 'vue';
import searchConfig from './config/search.config';
const contentRef = ref<InstanceType<typeof UserContent>>();

function queryClick(formData: any) {
  contentRef.value?.fetchUserData(formData);
}
function resetClick() {
  contentRef.value?.fetchUserData();
}

const modalRef = ref<InstanceType<typeof UserModal>>();
function createUser() {
  modalRef.value?.create();
}

function editUser(info: any) {
  modalRef.value?.create(false, info);
}
</script>

<style scoped>
.user {
  border-radius: 10px;
  overflow: hidden;
}
</style>
