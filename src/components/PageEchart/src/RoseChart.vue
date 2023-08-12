<template>
  <div class="rose-chart">
    <BaseChart :option="option" />
  </div>
</template>

<script setup lang="ts">
import type { EChartsOption } from 'echarts';
import type { EChartValue } from '../type/index';
import { computed } from 'vue';

interface Props {
  roseData: EChartValue[];
}
const props = defineProps<Props>();
const option = computed<EChartsOption>(() => {
  return {
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    tooltip: {
      trigger: 'item',
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: [10, 150],
        center: ['50%', '50%'],
        bottom: '-15%',
        roseType: 'area',
        itemStyle: {
          borderRadius: 8,
        },
        data: props.roseData,
        label: {
          show: false,
        },
      },
    ],
  };
});
</script>

<style scoped></style>
