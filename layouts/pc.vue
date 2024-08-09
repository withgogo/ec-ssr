<template>
    <client-only>
        <div class="pc-layout">
            <header class="header-layout">
                <div class="header-top">
                    <div class="pc-content header-top-content flex  align-items-center just-between pointer">
                        <div class="header-top-cg" @click="toView('home')" v-if="state.currentRoute !=='/home'">
                            <!-- 回首页 -->
                            {{ $t('button.backHomeBtn') }}
                        </div>
                        <div v-else></div>
                        <div class="header-top-cg flex  align-items-center">
                            <!-- 登入 -->
                            <div v-if="getToken() == false"
                                class="login-box flex  align-items-center header-top-cg-item " @click="toView('login')">
                                <!-- 登入 -->
                                 {{ $t('button.login') }}
                            </div>
                            <div v-if="getToken() == true" class=" flex  align-items-center header-top-cg-item ">
                                <el-dropdown>
                                    <div class="login-out">
                                        {{ store.getUserName }}
                                    </div>
                                    <template #dropdown>
                                        <el-dropdown-menu>
                                            <el-dropdown-item @click.native="loginOuted()" class="main-text">
                                                <!-- 登出 -->
                                                {{ $t('button.loginOutText') }}
                                            </el-dropdown-item>
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                            </div>
                            <!-- 会员中心 -->
                            <!-- 私密团购不展示 -->
                            <div v-if="groupStore.isPrivate == 0 && getToken() == true" class="header-top-cg-item" @click="toView('member')">
                                <!-- 会员中心 -->
                                {{ $t('userCenter.userCenter') }}
                            </div>
                            <!-- 购物车 -->
                            <div class="header-top-cg-item flex align-items-center" @click="toView('cart')">
                                <!-- 购物车 -->
                                {{ $t('user.shopCar') }}
                                <van-icon name="/img/icon/cart.png" size="30" :badge="store.cartCountCp" />
                            </div>
                            <!--  客服 -->
                            <a v-if="state.storeLinechat" class="header-top-cg-item" :href="state.storeLinechat"
                                target="_blank">
                                <!-- 客服 -->
                                {{ $t('foot.customer') }}</a>
                        </div>
                    </div>
                </div>
                <div class="header-store" v-if="groupStore.isPrivate == 0">
                    <div class=" pc-content  header-content flex  align-items-center just-between pointer">
                        <img class="header-logo" src="/img/logo/header-logo.png" @click="toView('home')">
                        <!-- 分类 -->
                        <div class="flex  flex1 align-items-center header-cg just-between  " :class="state.ugcAllCategory.length > 5?'header-nav':'header-nav-more'">
                            <el-dropdown v-for="category in state.partCategory" :key="category.id">
                                <div @click.stop="toCategory(category.id)" class="header-nav-item">
                                    {{ category.className }}
                                </div>
                                <template #dropdown >
                                    <el-dropdown-menu v-if="category.childs && category.childs.length>0">
                                        <el-dropdown-item @click.native="toCategory(cg.id)" class="main-text"
                                            v-for="cg in category.childs" :key="cg.id">
                                            <div>{{ cg.className }}</div>
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                            <el-dropdown v-if="state.ugcAllCategory.length > 5">
                                <!-- <el-button key="plain" type="" link> -->
                                    <div class="header-nav-item">
                                    <el-icon size="20">
                                        <MoreFilled />
                                    </el-icon>
                                  </div>
                                    
                                <!-- </el-button> -->
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item @click.native="toCategory(category.id)" class="main-text"
                                            v-for="category in state.partCategoryNext" :key="category.id">
                                            <div>{{ category.className }}</div>                                       
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </div>
                        <!-- 搜索 -->
                        <div class="header-search">
                            <div class="header-search-item flex align-items-center just-between">
                                <input class="search-input" v-model="state.searchVal" :placeholder="$t('message.areYouLookingFor')">
                                <div class="search-btn flex flex-center" @click="searchBtn(state.searchVal)">{{ $t('button.searchBtn') }}</div>
                            </div>
                            <div class="search-correlation">
                                <span class="search-label">{{ $t('search.hotSearchText') }}:</span>
                                <span class="search-val" v-for="hot, index in state.hotSearchList" :key="index" @click="searchBtn(hot.value,hot.key)">{{ hot.key }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="header-store" v-if="groupStore.isPrivate == 1">
                    <div class=" pc-content  header-content flex  align-items-center pointer">
                        <img class="header-logo" src="/img/logo/header-logo.png" @click="toView('home')">
                        <!-- 私密购展示-->
                        <div class="flex align-items-center header-cg header-nav-more" >
                            <div @click.native="toView('cart')" class="header-cg-item">
                                <!-- 购物车 -->
                                 {{ $t('cart.cartName') }}
                            </div>
                            <div @click.native="toView('order')" class="header-cg-item">
                                <!-- 我的订单 -->
                                 {{ $t('user.myOrder') }}
                            </div>
                            <div @click.native="toView('returnOrder')" class="header-cg-item">
                                <!-- 退货/退款 -->
                                 {{ $t('order.returnText') }}
                            </div>
                        </div>
                        <div></div>
                    </div>
                </div>
            </header>
            <div style="height: 140px;"></div>
            <!-- 页面主题 pages中的页面将放到这里面 -->
            <div class="main">
                <slot></slot>
            </div>
            <!-- 页脚 -->
            <div class="footer mtop5">
                <Footer></Footer>
           </div>
        </div>
    </client-only>
</template>

<script setup>
import Footer from "@/components/Footer/pc.vue"
import { storeInfo } from '@/composables/api/home';
import { queryListClass } from "@/composables/api/category";
import { getUserInfoStorage } from '@/composables/utils/dataStorage';
import { ElMessage, ElLoading } from 'element-plus'
import { ref, onMounted, reactive ,watch} from "vue";
import { useI18n } from "vue-i18n";
let { t } = useI18n();
const router = useRouter();
const route = useRoute();
const state = reactive({
    ugcAllCategory: [],
    partCategory: [],
    partCategoryNext: [],
    storeLinechat: null,
    userInfo: null,
    searchVal:null,
    hotSearchList:[],
    currentRoute:''
});
const store = useTempStore()
let groupStore = useGroupStore()

// let cartCount = useState("cartCount")
const toView = (type) => {
    switch (type) {
        case "home":
            if (groupStore.isPrivate == 1) {
                router.push({
                    path: `/group/act-goods`,
                    query: {
                        id: groupStore.groupId,
                        isPrivate: groupStore.isPrivate
                    },
                });
            } else {
                router.push({
                    path: `/home`,
                });
            }

            break;
        case "login":
            router.push({
                path: `/login/login-code`,
                // query: {
                //     type: type,
                //     data: state.userInfo.realName,
                // },
            });
            break;
        case "member":
            router.push({
                path: `/user/user/center/list`,
            });
            break;
        case "cart":
            router.push({
                path: `/user/user/cart`,
            });
            break;
        case "kefu":
            router.push({
                path: `/user/user/cart`,
            });
            break;
        case "order":
            router.push({
                path: `/user/user/order/order-list`,
            });
            break;
        case "returnOrder":
            router.push({
                path: `/user/user/order/return-order-list`,
            });
            break;
    }
}
const toCategory = (id) => {
    router.push({
        path: `/category`,
        query: {
            id: id
        }
    });
}
const searchBtn = (val,key)=>{
    if(key){
        state.searchVal =key
    }
    router.push({
        path: `/search`,
        query: {
            val: val
        }
    });
}
const getH5Index = () => {
    let data = {
        store_id: getStoreId(),
        current_page: 1,
        page_size: 20,
        ugc_id: '-1', //-1 推荐  >0 分类
        orderBy: null,
        orderType: null,
        isMember: null
    }
    queryListClass({storeId:getStoreId()}).then((response) => {
        if (response.code == "200") {
            let { data } = response
            state.ugcAllCategory = data
            state.partCategory = state.ugcAllCategory.slice(0, 5)
            state.partCategoryNext = state.ugcAllCategory.slice(5, 22)
        }
    });
};
const getStoreInfo = () => {
    storeInfo().then(response => {
        if (response.code == 200) {
            state.storeLinechat = response.data.storeLinechat
            // state.storeLinechat = 'https://www.baidu.com/'
        }
    })
}
const loginOuted = () => {
    loginOut().then((response) => {
        if (response.code == 200) {
            ElMessage(t('login.logoutSuccess'))
            store.userName = ''
            store.cartCounter = 0
            clearStorageOutLogin()
        }
        else {
            ElMessage(t('login.notLogin'))
        }
    });
}
watch(
  () => router.currentRoute.value,
  (newValue) => {
    // 此处写监听路由后要执行的事情;
    // console.log(newValue);
    state.currentRoute = newValue.path;
    if( state.currentRoute=='/home'){
        groupStore.isGroupPrivate  = 0
        groupStore.groupId  = ''
    }
  },
  { immediate: true }
);

onMounted(() => {
    getH5Index()
    getStoreInfo()
    if (getToken() == true) {
        store.getCountCart()
        let userInfo = getUserInfoStorage();
         store.userName = userInfo.nick_name || userInfo.realName
    }
    let storeInfo = JSON.parse(localStorage.getItem('storeInfo'))
    if (storeInfo != null && storeInfo !== undefined) {
        state.hotSearchList = storeInfo.hotSearchList
    }
});
</script>
<style scoped lang="scss">
:deep(.el-dropdown-menu__item) {
    font-size: 15px;
}

:deep(.el-dropdown-menu__item):hover {
    font-size: 15px;
    background-color: #f5f5f5;
    color: #484848;
}

:deep(.van-badge--top-right) {
    top: 7px !important;
    right: 5px !important;
}


.header-layout {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 11;
}

.footer {
    background-color: #fff;
    // padding: 10px;
    border-bottom: 1px #ccc solid;
}

.header-store {
    background-color: #fff;
    border-bottom: 1px #f6f6f6 solid;
    width: 100%;
}

.header-content {
    height: 95px;

}

.main {
    width: 1280px;
    /* box-sizing: border-box; */
    margin: 0 auto;
    /* display: flex;
    flex-direction: column;
    align-items: center; */
}

.pc-layout {
    background-color: #fff;
}

.header-logo {
    width: 249px;
    height: 32px;
}

.header-cg {
    // color: #5E5873;
    // text-align: center;
    // font-feature-settings: 'clig' off, 'liga' off;
    // font-family: "Noto Sans";
    // font-size: 20px;
    // font-weight: 600;
}

.header-cg-item{
    padding: 0 15px;
    color: #5E5873;
    text-align: center;
    // font-feature-settings: 'clig' off, 'liga' off;
    // font-family: "Noto Sans";
    font-size: 20px;
    font-weight: 600;
}
.header-nav-item {
    font-size: 20px;
    font-weight: 600;
    color: #5E5873;
}

.header-cg-item,.header-nav-item:focus-visible {
    outline: unset;
}

.login-out,.header-nav-item:focus-visible {
    outline: unset;
}

.header-nav-item:hover {
    /* width: 94px; */
    color: var(--main-color)
}

.header-search-item {
    padding: 4px 4px 4px 8px;
    border-radius: 6px;
    border: 1px solid #D1D4D9;
    background: #FFF;
    width: 300px;
}

.search-input {
    border: none;
    font-size: 16px;
    color: #484848;
}

input::placeholder {
    color: #A2A2A2;
    /* 将颜色代码修改为需要的颜色 */
}

.search-btn {
    width: 76px;
    height: 32px;
    background-color: var(--main-color);
    color: #fff;
    border-radius: 5px;
}

.search-correlation {
    font-size: 14px;
    color: var(--main-color);
    margin-top: 8px;
}

.search-label {
    color: #5E5873;
}

.search-val {
    /* margin-right: 10px; */
    // min-width: 48px;
    padding: 0 10px;
    text-align: center;
    display: inline-block;
}

.pc-content {
    width: 1200px;
    margin: 0 auto;
}

.header-top {
    background-color: #f5f5f5;
    width: 100%;
}

.header-top-content {
    height: 40px;
}

.header-top-cg {
    color: #5E5873;
    font-size: 14px;
}

.login-box {
    padding: 3px 18px;
    font-size: 14px;
    border-radius: 6px;
    background: #3E8CF0;
    color: #fff;
}

.header-top-cg-item {
    margin-right: 20px;
}
.header-nav{
    padding: 0 20px;
}
.header-nav-more{
    padding: 0 64px;
}
</style>