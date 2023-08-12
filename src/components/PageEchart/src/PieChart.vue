<template>
  <div class="pie-echart">
    <BaseChart :option="option" />
  </div>
</template>

<script setup lang="ts">
import type { EChartsOption } from 'echarts';
import type { EChartValue } from '../type/index';
import { computed } from 'vue';
interface Props {
  pieData: EChartValue[];
}
const props = defineProps<Props>();
const option = computed<EChartsOption>(() => {
  return {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      left: 'left',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        bottom: '-15%',
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };
});
</script>

<style scoped></style>
