import hyRequest from '../..';

export function postUserList(queryInfo: any) {
  return hyRequest.post({
    url: '/users/list',
    data: queryInfo,
  });
}

export function deleteUser(id: number) {
  return hyRequest.delete({
    url: `/users/${id}`,
  });
}

export function createUser(info: any) {
  return hyRequest.post({
    url: `/users`,
    data: info,
  });
}

export function editUser(id: number, info: any) {
  return hyRequest.patch({
    url: `/users/${id}`,
    data: info,
  });
}

export function postPageListData(pageName: string, info: any) {
  return hyRequest.post({
    url: `/${pageName}/list`,
    data: info,
  });
}

export function deletePageById(pageName: string, id: number) {
  return hyRequest.delete({
    url: `/${pageName}/${id}`,
  });
}

export function createPageData(pageName: string, info: any) {
  return hyRequest.post({
    url: `/${pageName}`,
    data: info,
  });
}

export function editPageData(pageName: string, id: number, info: any) {
  return hyRequest.patch({
    url: `/${pageName}/${id}`,
    data: info,
  });
}
