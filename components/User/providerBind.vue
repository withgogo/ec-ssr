<template>
   <van-popup v-model:show="bindProvidersConfigShow" round :close-on-click-overlay="false"
    :style="{ padding: '13px 20px' }">
    <div class="user-bind-providers">
      <div class="scroll-view" style="height: 400px" scroll-y="true">
        <div class="flex-row  just-between mbottom10" v-for="provider in props.getProvidersConfig" :key="provider.typeId">
          <div class="flex align-items-center">
            <!-- 图标 -->
            <van-image :src="`/img/provider/${provider.typeId}.png`" width="35px" height="35px" />
            <div class="mleft10">
              <!-- 第三方名称 -->
              <div class="font14">{{ provider.name }}</div>
              <div class="font12 default-text" v-if="provider.oauthId">{{
                $t("user.boundProvider")
              }}</div>
              <div class="font12 default-text" v-else>{{ $t("user.unboundProvider") }}</div>
            </div>
          </div>

          <!-- 解绑 -->
          <div class="font14 main-text" v-if="provider.oauthId" @click="unBindProvider(provider)">
            {{ $t("user.unBindProvider") }}
          </div>
          <!-- 绑定 -->
          <div class="font14 main-text" v-else @click="bindProvider(provider)">
            {{ $t("user.bindProvider") }}
          </div>
        </div>
      </div>
      <div class="flex-row flex-center border-top-f5 " style="padding-top: 13px;">
        <div class="user-provider-close-btn flex-row flex-center font14" @click="closeBindProvider()">关闭</div>
      </div>
    </div>
  </van-popup>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
const props = defineProps({
    bindProvidersConfigShow: {
        type: Boolean,
        default: false,
    },
    getProvidersConfig:{
        type: Array,
        required: true,
        default:[]
    }
});
let bindProvidersConfigShow = ref(false);
// 监听 数据变化时，清空
watch(
    () => props.bindProvidersConfigShow,
    (newValue, oldValue) => {
        bindProvidersConfigShow.value = newValue;
    }
);
const emit = defineEmits(["unBindProvider", "bindProvider","closeBindProvider"]); //获取父组件的方法emit
// 解绑
const unBindProvider = (provider: object) => {
    emit("unBindProvider", provider);
};
//绑定
const bindProvider = (provider:object) => {
    emit("bindProvider",provider);
};
// 关闭
const closeBindProvider = ()=>{
    emit("closeBindProvider");
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/user";
</style>
