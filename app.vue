<template>
  <div  class="page">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { onMounted, onBeforeMount, onUnmounted, reactive } from "vue";
//如果是server 先设置访问的是pc还是mb

if (process.server) {
  const headers = useRequestHeaders();
	

}

onMounted(() => {
  
});

const handleBeforeUnload = () => {
  
};



onUnmounted(() => {
  // handleBeforeUnload()
});
</script>
<style lang="scss">
@import "@/assets/css/font/index";

.page {
  background-color: #f5f5f5;
  -webkit-user-select: text;
  color: var(--main-text-color);
  // -webkit-text-size-adjust: none;
}
</style>
