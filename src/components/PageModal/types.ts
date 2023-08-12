export interface ModalConfig {
  pageName: string;
  head: {
    newTitle: string;
    editTitle: string;
  };
  formItems: any[];
}

export interface ModalProps {
  modalConfig: ModalConfig;
  otherInfo?: any;
}
