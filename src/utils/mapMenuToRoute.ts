import type { RouteRecordRaw } from 'vue-router';

function getRoutesModule() {
  const routes: RouteRecordRaw[] = [];
  const files: Record<string, any> = import.meta.glob('@/router/Main/**/*.ts', {
    eager: true,
  });

  for (const file in files) {
    const module = files[file];
    routes.push(module.default);
  }
  return routes;
}
export let firstMenu: any = null;

export function mapMenuToRoute(userMenu: any[]) {
  const routes: RouteRecordRaw[] = [];
  const routesModule = getRoutesModule();
  for (const menu of userMenu) {
    for (const submenu of menu.children) {
      const route = routesModule.find((item) => item.path === submenu.url);
      if (route) {
        if (!routes.find((item) => item === menu.url)) {
          routes.push({ path: menu.url, redirect: route.path });
        }
        routes.push(route);
      }
      if (!firstMenu && route) firstMenu = submenu;
    }
  }

  return routes;
}

export function mapPathToMenu(path: string, userMenu: any[]) {
  for (const menu of userMenu) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        return submenu;
      }
    }
  }
}
interface BreadCrumb {
  name: string;
  path?: string;
}
export function mapPathToBreadCrumb(path: string, userMenu: any[]) {
  const breadcrumb: BreadCrumb[] = [];
  for (const menu of userMenu) {
    for (const submenu of menu.children) {
      if (path === submenu.url) {
        breadcrumb.push({ name: menu.name, path: menu.url });
        breadcrumb.push({ name: submenu.name, path: submenu.url });
      }
    }
  }
  return breadcrumb;
}

export function mapMenuToIds(menuList: any[]) {
  const Ids: number[] = [];

  function getId(menus: any[]) {
    for (const item of menus) {
      if (item.children) {
        getId(item.children);
      } else {
        Ids.push(item.id);
      }
    }
  }
  getId(menuList);
  return Ids;
}

export function mapMenuToPermission(menuList: any[]) {
  const permissions: string[] = [];

  function getPermission(menus: any[]) {
    for (const item of menus) {
      if (item.type === 3) {
        permissions.push(item.permission);
      } else {
        getPermission(item.children ?? []);
      }
    }
  }
  getPermission(menuList);

  return permissions;
}
