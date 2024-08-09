
<template>
   <!--联系我们 隐私政策-->
    <div>
      <div
        class="user-section-privacy flex just-between"
        @click="customerService(nav.label)"
        v-for="nav in props.orderTabPrivacy"
        :key="nav.text"
      >
        <div class="flex align-items-center">
          <img
            :src="`/img/user/${nav.icon}.png`"

            class="user-privacy-icon mright5"
          />
          <div class="order-item-text-other">{{ nav.text }}</div>
        </div>
        <div>
          <svg-icon name="arrow-right-bold" />
        </div>
      </div>
    </div>
</template>
<script setup lang="ts">
import {  onMounted } from "vue";
  const props = defineProps({
    orderTabPrivacy: {
          type: Array,
          required: true,
          default:[]
      }
  })
  const emit = defineEmits(['customerService']) //获取父组件的方法emit
  // 点击  更换主题 购物车 订单 登出
  const customerService =(label:any)=>{
      emit('customerService',label)
  }
</script>
<style lang="scss" scoped>
@import "@/assets/css/user";
</style>
