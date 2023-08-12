import type { ModalConfig } from '@/components/PageModal/types';

const modalConfig: ModalConfig = {
  pageName: 'menu',
  head: {
    newTitle: '新建菜单',
    editTitle: '编辑菜单',
  },
  formItems: [
    { type: 'input', label: '菜单名称', prop: 'name', placeholder: '请输入菜单名称' },
    { type: 'input', label: '部门领导', prop: 'leader', placeholder: '请输入部门领导' },
    {
      type: 'select',
      label: '选择部门',
      prop: 'parentId',
      placeholder: '请输入上级部门',
      options: [],
    },
    {
      type: 'custom',
      slotName: 'menulist',
    },
  ],
};

export default modalConfig;
