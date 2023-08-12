import { getDepartmentList, getEntireMenus, getRoleList } from '@/service/main';
import { defineStore } from 'pinia';

interface MainState {
  entireRoles: any[];
  entireDepartments: any[];
  entireMenus: any[];
}
const useMainStore = defineStore('main', {
  state: (): MainState => ({
    entireRoles: [],
    entireDepartments: [],
    entireMenus: [],
  }),
  actions: {
    async fetchEntireDataAction() {
      const roleRes = await getRoleList();
      const departmentRes = await getDepartmentList();
      const menus = await getEntireMenus();
      console.log(menus);

      this.entireDepartments = departmentRes.data.list;
      this.entireRoles = roleRes.data.list;
      this.entireMenus = menus.data.list;
    },
  },
});

export default useMainStore;
