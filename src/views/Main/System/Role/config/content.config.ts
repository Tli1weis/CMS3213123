const contentConfig = {
  pageName: 'role',
  head: {
    title: '角色列表',
    btnTitle: '新建角色',
  },
  propsList: [
    { type: 'selection', label: '选择', width: '80px' },
    { type: 'index', label: '序号', width: '80px' },
    { type: 'normal', label: '角色名称', prop: 'name', width: '150px' },
    { type: 'normal', label: '角色介绍', prop: 'intro', width: '150px' },
    { type: 'date', label: '创建时间', prop: 'createAt' },
    { type: 'date', label: '更新时间', prop: 'updateAt' },
    { type: 'handler', label: '操作', width: '150px' },
  ],
};

export default contentConfig;
