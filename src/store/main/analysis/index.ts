import {
  getAddressSale,
  getCategoryCount,
  getCategoryFavor,
  getCategorySale,
  getShopAmount,
} from '@/service/main/analysis';
import { defineStore } from 'pinia';

interface AnalysisState {
  amountList: any[];
  goodsCategoryCount: any[];
  goodsCategorySale: any[];
  goodsCategoryFavor: any[];
  goodsAddressSale: any[];
}
const useAnalysisStore = defineStore('analysis', {
  state: (): AnalysisState => ({
    amountList: [],
    goodsCategorySale: [],
    goodsCategoryCount: [],
    goodsCategoryFavor: [],
    goodsAddressSale: [],
  }),
  actions: {
    async fetchShopAmountAction() {
      const res = await getShopAmount();
      const countRes = await getCategoryCount();
      const saleRes = await getCategorySale();
      const favorRes = await getCategoryFavor();
      const addRes = await getAddressSale();
      this.amountList = res.data;
      this.goodsCategoryCount = countRes.data;
      this.goodsCategorySale = saleRes.data;
      this.goodsCategoryFavor = favorRes.data;
      this.goodsAddressSale = addRes.data;
    },
  },
});

export default useAnalysisStore;
