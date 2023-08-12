<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <template v-for="item in amountList" :key="item.amount">
        <el-col :span="6">
          <ShopCard v-bind="item" />
        </el-col>
      </template>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="7">
        <EchartCard>
          <PieChartVue :pieData="goodsCategoryCounts" />
        </EchartCard>
      </el-col>
      <el-col :span="10">
        <EchartCard>
          <MapChartVue :map-data="goodsAddressSales" />
        </EchartCard>
      </el-col>
      <el-col :span="7">
        <EchartCard>
          <RoseChartVue :roseData="goodsCategoryCounts" />
        </EchartCard>
      </el-col>
      <el-col :span="12">
        <EchartCard>
          <LineChartVue v-bind="goodsCategorySales" />
        </EchartCard>
      </el-col>
      <el-col :span="12">
        <EchartCard>
          <BarChartVue v-bind="goodsCategoryFavors" />
        </EchartCard>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts" name="dashboard">
import { storeToRefs } from 'pinia';
import ShopCard from './c-cpns/ShopCard/index.vue';
import EchartCard from './c-cpns/EchartCard/index.vue';
import {
  PieChartVue,
  LineChartVue,
  RoseChartVue,
  BarChartVue,
  MapChartVue,
} from '@/components/PageEchart';
import useAnalysisStore from '@/store/main/analysis/index';
import { computed } from 'vue';
const analysisStore = useAnalysisStore();
analysisStore.fetchShopAmountAction();

const { amountList, goodsCategoryCount, goodsCategorySale, goodsCategoryFavor, goodsAddressSale } =
  storeToRefs(analysisStore);

const goodsCategoryCounts = computed(() => {
  return goodsCategoryCount.value.map((item) => ({
    value: item.goodsCount > 0 ? item.goodsCount : null,
    name: item.goodsCount > 0 ? item.name : null,
  }));
});

const goodsAddressSales = computed(() => {
  return goodsAddressSale.value.map((item) => ({ value: item.count, name: item.address }));
});

const goodsCategorySales = computed(() => {
  const values = goodsCategorySale.value.map((item) =>
    item.goodsCount !== null ? item.goodsCount : null
  );
  const labels = goodsCategorySale.value.map((item) => (item.goodsCount !== null ? item.name : ''));
  return { values, labels };
});

const goodsCategoryFavors = computed(() => {
  const values = goodsCategoryFavor.value.map((item) =>
    item.goodsFavor !== null ? item.goodsFavor : null
  );
  const labels = goodsCategoryFavor.value.map((item) =>
    item.goodsFavor !== null ? item.name : ''
  );
  return { values, labels };
});
</script>

<style scoped>
.dashboard {
}
</style>
