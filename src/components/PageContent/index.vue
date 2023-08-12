<template>
  <div class="content bg-white mt-[20px] p-[20px]">
    <div class="header flex justify-between items-end">
      <h2 class="title font-bold">{{ contentConfig?.head?.title ?? '数据列表' }}</h2>
      <el-button size="small" type="primary" @click="createUser" v-if="isCreate">
        {{ contentConfig?.head?.btnTitle ?? '新建数据' }}
      </el-button>
    </div>
    <div class="tables">
      <el-table :data="pageList" border style="width: 100%" v-bind="contentConfig.childrenTree">
        <template v-for="item in contentConfig.propsList" :key="item.label">
          <template v-if="item.type === 'date'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                {{ formatUTC(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'index'">
            <el-table-column align="center" v-bind="item" />
          </template>
          <template v-else-if="item.type === 'custom'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <slot :name="item.slotName" v-bind="scope" :prop="item.prop"></slot>
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'handler'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <el-button
                  size="small"
                  type="primary"
                  icon="EditPen"
                  text
                  @click="editUser(scope.row)"
                  v-if="isEdit"
                  >编辑</el-button
                >
                <el-button
                  size="small"
                  type="danger"
                  icon="Delete"
                  text
                  v-if="isDelete"
                  @click="deleteClick(scope.row.id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column align="center" v-bind="item" />
          </template>
        </template>

        <!-- <el-table-column type="selection" width="50px" />
        <el-table-column align="center" type="index" label="序号" width="60px" />
        <el-table-column align="center" label="部门名称" prop="name" />
        <el-table-column align="center" label="部门领导" prop="leader" />
        <el-table-column align="center" label="上级部门" prop="parentId" />
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
        </el-table-column> -->
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
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
import usePermission from '@/hooks/usePermission';
const currentPage = ref(1);
const pageSize = ref(10);
const systemStore = useSystemStore();

interface Props {
  contentConfig: {
    pageName: string;
    head?: {
      title?: string;
      btnTitle?: string;
    };
    propsList: any[];
    childrenTree?: any;
  };
}
const props = defineProps<Props>();

const isCreate = usePermission(`${props.contentConfig.pageName}:create`);
const isEdit = usePermission(`${props.contentConfig.pageName}:update`);
const isDelete = usePermission(`${props.contentConfig.pageName}:delete`);
const isQuery = usePermission(`${props.contentConfig.pageName}:query`);
systemStore.$onAction(({ name, after }) => {
  after(() => {
    if (
      name === 'deletePageByIdAction' ||
      name === 'createPageDataAction' ||
      name === 'editPageDataAction'
    )
      currentPage.value = 1;
  });
});
fetchPageListData();
const { pageTotalCount, pageList } = storeToRefs(systemStore);

function handleCurrentChange() {
  fetchPageListData();
}
function handleSizeChange() {
  fetchPageListData();
}
function deleteClick(id: number) {
  systemStore.deletePageByIdAction(props.contentConfig.pageName, id);
}

const emit = defineEmits(['createClick', 'editClick']);
function createUser() {
  emit('createClick');
}

function editUser(info: any) {
  emit('editClick', info);
}

function fetchPageListData(formData: any = {}) {
  if (!isQuery) return;
  const size = pageSize.value;
  const offset = (currentPage.value - 1) * size;
  const pageInfo = { size, offset };
  const queryInfo = { ...pageInfo, ...formData };

  systemStore.postPageListDataAction(props.contentConfig.pageName, queryInfo);
}

defineExpose({
  fetchPageListData,
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
