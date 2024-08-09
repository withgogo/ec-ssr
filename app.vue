<template>
  <div :class="theme" class="page">
    <NuxtLayout :name="layout">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { onMounted, onBeforeMount, onUnmounted, reactive } from "vue";
import publicData from "@/composables/utils/publicData.js";
let { getStoreInfo, getStoreConfig, getUser } = publicData;
const store = useTempStore();
let { locale } = useI18n();
let theme = useState("theme");
theme.value = theme.value || "dark";
let layout = useState("layout");
const state = reactive({
  seoInfo: {}
})
//如果是server 先设置访问的是pc还是mb
if (process.server) {
  const headers = useRequestHeaders();
  let layout = deviceType(headers["user-agent"]).type == "pc" ? "pc" : "mobile";
  useState("layout", () => layout);
    // 初始化店铺数据  service端调取接口提前渲染 SeoMeta
  //   getStoreInfo((data) => {
  //   if (data) {
  //     let seoInfo = {
  //       title: data.storeSeoTitle,
  //       keywords: data.storeSeoKeywords,
  //       description: data.storeSeoDescription,
  //       ogImage:data.storeSeoImgDto.fullPath
  //     }
  //     state.seoInfo = seoInfo
  //     useSeoMeta({
  //       title:  state.seoInfo.title,
  //       ogTitle:  state.seoInfo.title,
  //       description:  state.seoInfo.description,
  //       ogDescription:  state.seoInfo.description,
  //       ogImage:  state.seoInfo.ogImage,
  //       twitterCard: 'summary_large_image',
  //     })
  //   }
  // });
}

onMounted(() => {
  if (getToken() == true) {
    store.getCountCart();
    getUser();
  }
  getStoreInfo((data) => {
    if (data) {
      let seoInfo = {
        title: data.storeSeoTitle,
        keywords: data.storeSeoKeywords,
        description: data.storeSeoDescription,
        ogImage:data.storeSeoImgDto?.fullPath
      }
      state.seoInfo = seoInfo
      useSeoMeta({
        title:  state.seoInfo.title,
        ogTitle:  state.seoInfo.title,
        description:  state.seoInfo.description,
        ogDescription:  state.seoInfo.description,
        ogImage:  state.seoInfo.ogImage,
        twitterCard: 'summary_large_image',
      })
    }
  });
  getStoreConfig((publishCountry) => {
    if (publishCountry) {
      locale.value = publishCountry == "tw" ? "tw" : "zh";
    }
  });
  // 监听屏幕变化
  window.onresize = throttle(() => {
    let w = window.innerWidth;
    if (w <= 690) {
      // 断点
      useState("layout").value = "mobile";
    } else {
      useState("layout").value = "pc";
    }
  }, 100);
  // 如果希望根据屏幕宽度做首次渲染，请加上下面的代码( 不推荐 )
  // window.dispatchEvent(  new Event( "resize" ) );

  // 这里做的是当用户关闭页面时 清除私密团购的数据
  // 如果是选择超商地址跳出去的，在回来时（ TW-confirmation）获取商品数据，判断 group_msg?.isPrivate==1就保存数据
  // 如果是 信用卡支付绑卡并支付跳出去的，在回来时(paySuccess 页面)获取订单数据时，判断 groupDto.isPrivate == 1 就保存数据
  let beginTime = 0; //开始时间
  let differTime = 0; //时间差
  window.onunload = function () {
    differTime = new Date().getTime() - beginTime;
    if (differTime <= 5) {
      console.log("这是关闭");
      handleBeforeUnload();
    } else {
      console.log("这是刷新");
    }
  };
  window.onbeforeunload = function () {
    beginTime = new Date().getTime();
  };
});

const handleBeforeUnload = () => {
  // 当离开项目时候删除私密购商品存储
  console.log("关闭页面");
  let groupStore = useGroupStore();
  groupStore.isGroupPrivate = 0;
  groupStore.groupId = "";
  //关闭页面/离开页面清除广告渠道
  let channelStore = useChannelStore()
  let channelObj = {
        source: null,
        medium: null,
        campaign: null,
      }
  channelStore.channelObj =channelObj
  //没清除成功
  localStorage.removeItem("channelStore"); //初始化的时候的清除广告渠道
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
