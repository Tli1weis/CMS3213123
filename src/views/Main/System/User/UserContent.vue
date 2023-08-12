<template>
  <div class="content bg-white mt-[20px] p-[20px]">
    <div class="header flex justify-between items-end">
      <h2 class="title font-bold">用户列表</h2>
      <el-button size="small" type="primary" @click="createUser">新建用户</el-button>
    </div>
    <div class="tables">
      <el-table :data="userList" border style="width: 100%">
        <el-table-column type="selection" width="50px" />
        <el-table-column align="center" type="index" label="序号" width="60px" />
        <el-table-column align="center" prop="name" label="用户名" width="110px" />
        <el-table-column align="center" prop="realname" label="真实姓名" width="110px" />
        <el-table-column align="center" prop="cellphone" label="手机电话" width="150px" />
        <el-table-column align="center" prop="enable" label="状态" width="120px">
          <template #default="scope">
            <el-button plain :type="scope.row.enable ? 'success' : 'danger'">
              {{ scope.row.enable ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="createAt" label="创建时间">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="updateAt" label="更新时间">
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="150px">
          <template #default="scope">
            <el-button size="small" type="primary" icon="EditPen" text @click="editUser(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              icon="Delete"
              text
              @click="deleteClick(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/store/main/system';
import { storeToRefs } from 'pinia';
import { formatUTC } from '@/utils/formatutc';
import { ref } from 'vue';
const currentPage = ref(1);
const pageSize = ref(10);
const systemStore = useSystemStore();
fetchUserData();
const { userList, totalCount } = storeToRefs(systemStore);
console.log(totalCount);

function handleCurrentChange() {
  fetchUserData();
}
function handleSizeChange() {
  fetchUserData();
}
function deleteClick(id: number) {
  systemStore.deleteUserAction(id);
}

const emit = defineEmits(['createClick', 'editClick']);
function createUser() {
  emit('createClick');
}

function editUser(info: any) {
  emit('editClick', info);
}

function fetchUserData(formData: any = {}) {
  const size = pageSize.value;
  const offset = (currentPage.value - 1) * size;
  const pageInfo = { size, offset };
  const queryInfo = { ...pageInfo, ...formData };

  systemStore.postUserListAction(queryInfo);
}

defineExpose({
  fetchUserData,
});
</script>

<style scoped>
.tables {
  margin-top: 10px;
  :deep(.el-table__cell) {
    padding: 12px 0;
  }
  .el-button {
    margin: 0;
  }
}
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
@/store/main/system
