<template>
  <div class="shopCard flex flex-col bg-white shadow-lg px-[15px]">
    <div class="header flex items-center justify-between h-[38px] text-gray-500 text-[12px]">
      <span>{{ title }}</span>

      <el-tooltip :content="tips" placement="top" effect="light">
        <el-icon> <Warning /> </el-icon>
      </el-tooltip>
    </div>
    <div class="content flex-1 pb-[10px] text-[20px]">
      <span ref="countRef1">{{ number1 }}</span>
    </div>
    <div class="footer h-[38px] text-[13px] leading-[38px] border-t">
      <span>{{ subtitle }}</span>
      <span ref="countRef2">{{ number2 }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CountUp } from 'countup.js';
import { onMounted, ref } from 'vue';
interface Props {
  amount?: string;
  title?: string;
  number1?: number;
  tips?: string;
  number2?: number;
  subtitle?: string;
}
const props = withDefaults(defineProps<Props>(), {
  title: '商品总销量',
  number1: 509989,
  tips: '所有的商品总销量',
  number2: 509989,
  subtitle: '商品总销量',
});
const countRef1 = ref<HTMLElement>();
const countRef2 = ref<HTMLElement>();
const countOptions = {
  prefix: props.amount === 'saleroom' ? '￥' : '',
};
onMounted(() => {
  const countup1 = new CountUp(countRef1.value!, props.number1, countOptions);
  const countup2 = new CountUp(countRef2.value!, props.number2, countOptions);
  countup1.start();
  countup2.start();
});
</script>

<style scoped></style>
