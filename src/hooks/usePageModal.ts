import { ref } from 'vue';
import PageModal from '@/components/PageModal/index.vue';
type cbFn = (data: any) => void;
function usePageModal(createCallback?: cbFn, editCallBack?: cbFn) {
  const modalRef = ref<InstanceType<typeof PageModal>>();

  function createClick() {
    modalRef.value?.create();
    createCallback && createCallback();
  }

  function editClick(formData: any) {
    modalRef.value?.create(false, formData);
    editCallBack && editCallBack(formData);
  }
  return { createClick, editClick, modalRef };
}
export default usePageModal;
