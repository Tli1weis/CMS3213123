import PageContent from '@/components/PageContent/index.vue';
import { ref } from 'vue';
function usePageContent() {
  const contentRef = ref<InstanceType<typeof PageContent>>();
  function queryClick(formData: any) {
    contentRef.value?.fetchPageListData(formData);
  }

  function resetClick() {
    contentRef.value?.fetchPageListData();
  }
  return { contentRef, queryClick, resetClick };
}
export default usePageContent;
