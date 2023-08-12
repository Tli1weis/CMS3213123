interface UserList {
  id: number;
  name: string;
  realname: string;
  cellphone: number;
  enable: number;
  departmentId: number;
  roleId: number;
  createAt: string;
  updateAt: string;
}

interface SystemState {
  userList: UserList[];
  totalCount: number;
  pageList: any[];
  pageTotalCount: number;
}
export type { SystemState };
