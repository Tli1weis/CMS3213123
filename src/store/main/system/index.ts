import {
  createPageData,
  createUser,
  deletePageById,
  deleteUser,
  editPageData,
  editUser,
  postPageListData,
  postUserList,
} from '@/service/main/system';
import { defineStore } from 'pinia';
import type { SystemState } from './type';
import useMainStore from '..';

const useSystemStore = defineStore('system', {
  state: (): SystemState => ({
    userList: [],
    totalCount: 0,
    pageList: [],
    pageTotalCount: 0,
  }),
  actions: {
    async postUserListAction(formData: any) {
      const res = await postUserList(formData);
      const { totalCount, list } = res.data;
      console.log(list);

      this.totalCount = totalCount;
      this.userList = list;
    },
    async deleteUserAction(id: number) {
      const res = await deleteUser(id);
      console.log(res);
      this.postUserListAction({ offset: 0, size: 10 });
    },
    async createUserDataAction(info: any) {
      const res = await createUser(info);
      console.log(res);

      this.postUserListAction({ offset: 0, size: 10 });
    },
    async editUserDataAction(id: number, info: any) {
      const res = await editUser(id, info);
      console.log(res);

      this.postUserListAction({ offset: 0, size: 10 });
    },

    async postPageListDataAction(pageName: string, info: any) {
      const {
        data: { list, totalCount },
      } = await postPageListData(pageName, info);

      this.pageList = list;
      this.pageTotalCount = totalCount;
    },

    async deletePageByIdAction(pageName: string, id: number) {
      const res = await deletePageById(pageName, id);
      console.log(res);

      this.postPageListDataAction(pageName, { offset: 0, size: 10 });
    },

    async createPageDataAction(pageName: string, info: any) {
      const res = await createPageData(pageName, info);
      console.log(res);

      this.postPageListDataAction(pageName, { offset: 0, size: 10 });
      const mainStore = useMainStore();
      mainStore.fetchEntireDataAction();
    },
    async editPageDataAction(pageName: string, id: number, info: any) {
      const res = await editPageData(pageName, id, info);
      console.log(res);

      this.postPageListDataAction(pageName, { offset: 0, size: 10 });
      const mainStore = useMainStore();
      mainStore.fetchEntireDataAction();
    },
  },
});
export default useSystemStore;
