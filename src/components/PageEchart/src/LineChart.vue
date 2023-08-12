<template>
  <div class="line-echart">
    <BaseChart :option="option" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BaseChart from './BaseChart.vue';
import type { EChartsOption } from 'echarts';

interface Props {
  values: string[];
  labels: string[];
}
const props = defineProps<Props>();
const option = computed<EChartsOption>(() => {
  return {
    legend: {
      data: ['分类销量统计'],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: props.labels,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '分类销量统计',
        data: props.values,
        type: 'line',
        stack: '总量',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
      },
    ],
  };
});
</script>

<style scoped></style>
