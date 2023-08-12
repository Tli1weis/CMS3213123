import type { ModalConfig } from '@/components/PageModal/types';

const modalConfig: ModalConfig = {
  pageName: 'role',
  head: {
    newTitle: '新建角色',
    editTitle: '编辑角色',
  },
  formItems: [
    { type: 'input', label: '角色名称', prop: 'name', placeholder: '请输入角色名称' },
    { type: 'input', label: '角色描述', prop: 'intro', placeholder: '请输入角色描述' },
    {
      type: 'custom',
      slotName: 'menulist',
    },
  ],
};

export default modalConfig;
