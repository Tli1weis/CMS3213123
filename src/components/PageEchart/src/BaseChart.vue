<template>
  <div class="base-echart">
    <div class="echart" ref="echartRef"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';
import chinaJson from '../data/china.json';
import { watchEffect } from 'vue';
interface Props {
  option: EChartsOption;
}
const props = defineProps<Props>();
const echartRef = ref<HTMLElement>();
echarts.registerMap('china', chinaJson as any);
onMounted(() => {
  const myChart = echarts.init(echartRef.value!, 'light', { renderer: 'canvas' });
  // 绘制图表
  watchEffect(() => {
    myChart.setOption(props.option);
    window.addEventListener('resize', () => {
      myChart.resize();
    });
  });
});
</script>

<style scoped>
.echart {
  height: 300px;
}
</style>
