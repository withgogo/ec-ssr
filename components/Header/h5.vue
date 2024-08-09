<template>
  <header class="bgfff">
    <!-- 顶部导航 -->
    <van-nav-bar fixed placeholder left-arrow z-index="2">
      <template #left>
        <van-image
          round
          width="24px"
          height="24px"
          @click="showDialogPopup"
          src="/img/icon/cg.png"
        />
      </template>
      <template #title>
        <div class="flex felx-center">
          <van-image round width="162px" height="22px" src="/img/logo/header-logo.png" />
        </div>
      </template>
      <template #right>
        <van-image
          round
          width="24px"
          height="24px"
          style="margin-right: 6px"
          src="/img/icon/search.png"
          @click="toViewJump('search')"
        />
        <van-icon
          name="/img/icon/cart.png"
          size="30"
          :badge="store.cartCountCp"
          @click="toViewJump('cart')"
        />
      </template>
    </van-nav-bar>
  </header>
  <van-popup
    v-model:show="state.showLeft"
    position="left"
    @click-overlay="closePopup"
    :style="{ width: '70%', height: '100%' }"
  >
    <div class="popup-content-more">
      <div class="flex justify-content-end" style="padding-right: 16px">
        <!-- <van-image src="/img/icon/close.png" class="popup-close" @click="closePopup"></van-image> -->
        <svg-icon name="close" size="14" color="#5E5873" @click="closePopup"></svg-icon>
      </div>
      <!-- 首页 -->
      <div class="flex align-items-center popup-text" @click="toViewJump('home')">
        <!-- <van-image src="/img/icon/home.png" class="popup-icon"></van-image> -->
        <svg-icon name="home" size="23" color="#5E5873"></svg-icon>
        <span style="margin-left: 8px">
          <!-- 首页 -->
          {{ $t("button.home") }}
        </span>
      </div>
      <!-- 会员中心 -->
      <div class="flex align-items-center popup-text" @click="toViewJump('user')">
        <!-- <van-image src="/img/icon/user.png" class="popup-icon"></van-image> -->
        <svg-icon name="user" size="23" color="#5E5873"></svg-icon>
        <span style="margin-left: 6px">
          <!-- 会员中心 -->
          {{ $t("userCenter.userCenter") }}
        </span>
      </div>
      <!-- 购物车  -->
      <div class="flex align-items-center popup-text" @click="toViewJump('cart')">
        <!-- <van-image src="/img/icon/cart.png" class="popup-icon"></van-image> -->
        <svg-icon name="cart" size="23" color="#5E5873"></svg-icon>
        <span style="margin-left: 8px">
          <!-- 购物车 -->
          {{ $t("cart.cartName") }}
        </span>
      </div>
      <!-- 分类 -->
      <div class="cg-title fontW">
        <!-- 分类 -->
        {{ $t("user.classification") }}
      </div>
      <div v-for="(nav, index) in state.categoryList" :key="nav.id">
        <div class="flex align-items-center just-between popup-text">
          <span @click="toViewCg(nav)">{{ nav.className }}</span>
          <van-image
            @click="toMoreCg(nav, index)"
            v-if="nav.childs && nav.childs.length > 0"
            src="/img/icon/down.png"
            :class="[state.activaCgIndex == index ? 'popup-down-more' : '', 'popup-down']"
          ></van-image>
        </div>
        <div
          v-if="state.activaCgIndex == index"
          style="text-indent: 0.8em"
          class="flex align-items-center just-between popup-text"
          v-for="navTab in nav.childs"
          :key="navTab.id"
          @click="toViewCg(navTab)"
        >
          {{ navTab.className }}
        </div>
      </div>
      <!-- 更多 -->
      <div class="cg-title fontW">
        <!-- 更多 -->
        {{ $t("user.more") }}
      </div>
      <div
        class="flex align-items-center just-between popup-text"
        @click="changeView('rule')"
      >
        <!-- 隱私政策 -->
        {{ $t("header.privacy") }}
      </div>
      <div
        class="flex align-items-center just-between popup-text"
        @click="changeView('memberRule')"
      >
        <!-- 会员制度 -->
        {{ $t("foot.val7") }}
      </div>
      <div
        class="flex align-items-center just-between popup-text"
        @click="changeView('aboutUs')"
      >
        <!-- 关于我们 -->
        {{ $t("header.aboutUs") }}
      </div>
      <!-- 更换主题 -->
      <!-- <div class="flex align-items-center just-between popup-text" @click="changeView('theme')">
                {{ $t("user.changeTheme") }}
            </div> -->
      <!-- 登出 -->
      <div
        class="flex align-items-center just-between popup-text"
        @click="changeView('loginOut')"
      >
        {{ $t("button.loginOutText") }}
      </div>

      <div class="cg-title fontW">
        <!-- 联络我们 -->
        {{ $t("header.cellUs") }}
      </div>
      <a
        v-if="state.storeLinechat"
        class="popup-line-btn flex flex-center"
        :href="state.storeLinechat"
      >
        <!-- 聯絡Line 客服 -->
        {{ $t("foot.cellLine") }}
      </a>
      <!--  -->
      <div class="logo-footer">
        <van-image src="/img/logo/footer-logo.png"></van-image>
        <p>
          <!--  2024 群健科技股份有限公司 COPYRIGHT CofitⓇ Healthcare Inc. ALL RIGHTS RESERVED -->
          {{ $t("foot.val6") }}
        </p>
      </div>
    </div>
  </van-popup>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { ElMessage, ElLoading } from "element-plus";
import { queryListClass } from "@/composables/api/category";
import { getToken } from "@/composables/utils/dataStorage";
import { useI18n } from "vue-i18n";
import { showToast } from "vant";
let { t } = useI18n();
const router = useRouter();
const store = useTempStore();

// let cartCount = useState("cartCount")
const state = reactive({
  ugcId: "-1",
  activaCgIndex: -1, //分类展开更多
  showLeft: false,
  categoryList: [],
  storeId: getStoreId(),
  storeLinechat: null,
});
const emit = defineEmits(["showDialogPopup", "toViewJump"]); //获取父组件的方法emit
// 分类查看更多
const toMoreCg = (nav, index) => {
  if (index == state.activaCgIndex) {
    state.activaCgIndex = -1;
  } else {
    state.activaCgIndex = index;
  }
};
// 分类查看
const toViewCg = (nav) => {
  router.push({
    path: "/category",
    query: {
      id: nav.id,
    },
  });
  closePopup();
};
// 抽屉关闭事件
const closePopup = () => {
  state.showLeft = false;
};
// 点击  更换主题 购物车 订单 登出
const showDialogPopup = () => {
  state.showLeft = true;
};

// 抽屉 跳转 home user cart
const toViewJump = (type) => {
  if (type == "home") {
    router.push({
      path: "/home",
    });
  } else if (type == "user") {
    router.push({
      path: "/user/user/center/list",
    });
  } else if (type == "cart") {
    router.push({
      path: "/user/user/cart",
    });
  } else if (type == "search") {
    router.push({
      path: "/search",
    });
  }
  closePopup();
};
// 点击 跳转其他的页面
const changeView = (type) => {
  switch (type) {
    case "rule": //隐私政策
      router.push({
        path: `/articles`,
        query: {
          type: "privacy",
        },
      });
      break;
    case "memberRule": //会员规则
      // 代码块2
      router.push({
        path: `/user/user/member-zone`,
      });
      break;
    case "aboutUs": // 关于我门
      router.push({
        path: `/articles`,
        query: {
          type: "about_us",
        },
      });
      break;
    case "theme": // 切换主题
      let theme = useState("theme");
      let newTheme = theme.value == "pink" ? "dark" : "pink";
      useState("theme").value = newTheme;
      break;
    case "loginOut": // 登出
      loginOut().then((response) => {
        if (response.code == 200) {
          showToast(t("login.logoutSuccess"));
          clearStorageOutLogin();
          const store = useTempStore();
          store.cartCounter = 0;
          router.push({
            path: "/login/login-code",
          });
        } else {
          showToast(t("login.notLogin"));
        }
      });
      break;
  }
};
// 商品分类
const getQueryListClass = () => {
  queryListClass({ storeId: state.storeId }).then((response) => {
    if (response.code == 200) {
      state.categoryList = response.data.splice(0, 5);
    }
  });
};
const getStoreInfo = () => {
  let storeInfo = JSON.parse(localStorage.getItem("storeInfo"));
  // console.log(storeInfo.codePrompt)
  if (storeInfo != null && storeInfo !== undefined) {
    state.storeLinechat = storeInfo.storeLinechat;
  }
};
onMounted(() => {
  if (getToken() == true) {
    store.getCountCart();
  }
  getStoreInfo();
  getQueryListClass();
});
</script>

<style lang="scss" scoped>
:deep(.van-badge--top-right) {
  top: 7px !important;
  right: 5px !important;
}

.popup-content-more {
  padding: 40px 0;
}

.popup-close {
  @include size(20px, 20px);
}

.popup-icon {
  @include size(25px, 25px);
  margin-right: 5px;
}

.cg-title {
  font-size: 14px;
  color: #5e5873;
  padding-left: 10px;
  margin-top: 14px;
}

.popup-down {
  @include size(20px, 20px);
  transition: 0.2s;
}

.popup-down-more {
  transform: rotate(180deg);
}

.popup-text {
  font-size: 16px;
  padding: 14px 16px;
  border-bottom: 1px solid #d1d4d9;
}

.popup-line-btn {
  @include size(220px, 40px);
  font-size: 16px;
  border-radius: 27px;
  background: #39cd00;
  color: #fff;
  margin: 16px auto;
}

.logo-footer {
  padding: 14px;
  color: #5e5873;
  font-size: 12px;
}
</style>
