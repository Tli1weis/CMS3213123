import hyRequest from '..';

export function getRoleList() {
  return hyRequest.post({
    url: '/role/list',
  });
}

export function getDepartmentList() {
  return hyRequest.post({
    url: '/department/list',
  });
}

export function getEntireMenus() {
  return hyRequest.post({
    url: '/menu/list',
  });
}
