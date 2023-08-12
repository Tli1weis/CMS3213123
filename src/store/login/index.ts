import { accountLogin, getUserInfoById, getUserMenuById } from '@/service/login';
import { defineStore } from 'pinia';
import type { Account } from '@/types';
import { myLocalStorage } from '@/utils/MyStorage';
import router from '@/router';
import { TOKEN } from '@/types/constants';

import { mapMenuToPermission, mapMenuToRoute } from '@/utils/mapMenuToRoute';
import useMainStore from '../main';

interface State {
  token: string;
  userInfo: any;
  userMenu: any;
  permissions: any[];
}
const useLoginStore = defineStore('login', {
  state: (): State => ({
    userInfo: {},
    userMenu: [],
    token: '',
    permissions: [],
  }),
  actions: {
    async loginAccountAction(account: Account) {
      const res = await accountLogin(account);
      const id = res.data.id;
      const name = res.data.name;
      this.token = res.data.token;
      myLocalStorage.set(TOKEN, this.token);

      const userInfo = await getUserInfoById(id);
      this.userInfo = userInfo.data;

      const userMenu = await getUserMenuById(this.userInfo.role.id);
      this.userMenu = userMenu.data;

      myLocalStorage.set('userInfo', this.userInfo);
      myLocalStorage.set('userMenu', this.userMenu);

      const mainStore = useMainStore();
      mainStore.fetchEntireDataAction();

      const permissions = mapMenuToPermission(this.userMenu);
      this.permissions = permissions;
      console.log(permissions);

      const routes = mapMenuToRoute(this.userMenu);
      routes.forEach((route) => router.addRoute('main', route));

      router.push('/main');
    },
    loadLocalCache() {
      const token = myLocalStorage.get(TOKEN);
      const userInfo = myLocalStorage.get('userInfo');
      const userMenu = myLocalStorage.get('userMenu');
      if (token && userInfo && userMenu) {
        this.token = token;
        this.userInfo = userInfo;
        this.userMenu = userMenu;

        const mainStore = useMainStore();
        mainStore.fetchEntireDataAction();

        const permissions = mapMenuToPermission(this.userMenu);
        console.log(permissions);

        this.permissions = permissions;
        const routes = mapMenuToRoute(this.userMenu);
        routes.forEach((route) => router.addRoute('main', route));
      }
    },
  },
});

export default useLoginStore;
