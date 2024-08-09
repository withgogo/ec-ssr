<template>
    <SeoHeade :title="state.storeInfo?.storeSeoTitle" :description="state.storeInfo?.storeSeoDescription"
        :keywords="state.storeInfo?.storeSeoKeywords"></SeoHeade>
    <Header></Header>
    <div class="bg">
        <!-- 分类 -->
        <div class="bgfff cg-content">
            <van-sticky :offset-top="46">
                <van-tabs @click-tab="onClickCgTab" color="#00ACC8" title-active-color="#00ACC8"
                    title-inactive-color="#5E5873" swipeable v-model:active="state.activeCg">
                    <van-tab v-for="nav in state.navList" :title="nav.className" :name="nav.id">
                    </van-tab>
                </van-tabs>
            </van-sticky>
        </div>
        <!-- banner -->
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#00ACC8">
            <van-swipe-item v-for="(swiper, index) in state.bannerList" :key="index">
                <van-image fit="fill" :src="swiper.acc.fullPath" @click="toSwiperView(swiper)"
                    class="h5-banner-img"></van-image>
            </van-swipe-item>
        </van-swipe>
        <div class="h5-content-p">
            <div class="h5-other-tip-title flex align-items-center fontW">
                <div class="h5-other-tip-icon"></div>
                <!-- 热销商品 -->
                {{ $t('groupAct.sellHotGoods') }}
            </div>
            <!-- 商品 -->
            <Goods :goodsList="state.pcRecommendList" :width="state.width" @addBuyGoods="toGoodsInfo"></Goods>
            <div class="h5-to-goods-more flex flex-center fontW" @click="toMoreGoods">
                <!-- 探索更多商品 -->
                {{ $t('groupAct.findMoreGoods') }}
            </div>
        </div>
        <!-- 限时团购 -->
        <div class="h5-content-p bgfff" style="margin-top: 12px;" v-if="state.groupActList &&  state.groupActList.length>0">
            <div class="h5-other-tip-title flex align-items-center fontW">
                <div class="h5-other-tip-icon"></div>
                <!-- 限时团购 -->
                {{ $t('groupAct.limitedTimeGroup') }}
            </div>
            <div>
                <van-swipe class="act-swipe" :width="325" :loop="false" :show-indicators="false">
                    <van-swipe-item v-for="(swiper, index) in state.groupActList" :key="index">
                        <div class="swipe-item" @click="toGroupView(swiper)">
                            <van-image fit="cover" v-if="swiper.cover && swiper.cover.fullPath"
                                :src="swiper.cover.fullPath" class="act-cover-img"></van-image>
                            <van-image fit="cover" class="act-cover-img" v-else src="/img/act-empty.png"></van-image>
                        </div>
                    </van-swipe-item>
                </van-swipe>
            </div>
        </div>
        <!-- 其他活动专区 -->
        <div v-if="state.promotionSlides && state.promotionSlides.length > 0" class="h5-content-p bgfff" style="margin-top: 12px;">
            <div class="h5-other-tip-title flex align-items-center fontW">
                <div class="h5-other-tip-icon"></div>
                <!-- 促销专区 -->
                {{ $t('groupAct.promotionZone') }}
            </div>
            <div>
                <van-swipe class="act-swipe" :width="325" :loop="false" :show-indicators="false">
                    <van-swipe-item v-for="(swiper, index) in state.promotionSlides" :key="index">
                        <div class="swipe-item" @click="toSwiperView(swiper)">
                            <van-image fit="cover" :src="swiper.acc.fullPath" class="act-cover-img" ></van-image>
                        </div>
                    </van-swipe-item>
                </van-swipe>
            </div>
        </div>
        <!-- 底部的footer -->
        <div style="margin-top: 12px;">
            <!-- footer banner -->
            <van-image src="/img/logo/ying-yang-shi.png"></van-image>
            <div class="footer-article fontW flex">
                <p class="footer-article-content">
                    <!-- 1800+ google 4.9星超好評Cofit團隊 -->
                    {{ $t('foot.cofitStart') }}
                </p>
                <p class="footer-article-content">
                    <!-- 全台最大營養師團隊，最懂你的購物商城 -->
                    {{ $t('foot.bigShopp') }}
                </p>
                <p class="footer-article-content">Change behavior, live better</p>
            </div>
            <Footer></Footer>
        </div>
    </div>

    <!--首页弹框轮播 -->
    <van-overlay z-index="100" :show="slideTypeShow" v-if="state.slideTypeList.length > 0 && slideTypeShow == true">
        <div class="flex flex-center h5-modalBox-content">
            <div class="h5-modalBox" v-for="(swiper, swiperIndex) in state.slideTypeList" :key="swiper.id">
                <!-- 关闭 -->
                <img src="/img/icon/x.png" @click="closeOffSliderList(swiperIndex)" mode="widthFix"
                    class="h5-slideType-img-close">
                </img>
                <img v-if="swiper?.acc?.fullPath" :src="swiper?.acc?.fullPath"
                    @click="toSwiperView(swiper, swiperIndex)" mode="widthFix" class="h5-slideType-img">
                </img>
            </div>
        </div>
    </van-overlay>

    <!-- 隐私权及 网站使用条款 -->
    <van-popup v-model:show="cookieShow" :overlay="false" :close-on-click-overlay="false" position="bottom"
        :style="{ height: '24%' }">
        <div class="privacy-statement">
            <div>
                <!-- '本网站中使用 cookie，欲查询有关本网站使用 cookie 方式之详情，及若您不希望 在电脑上使用 cookie 时应如何变更电脑的 cookie 设定，请参阅本网站' -->
                {{ $t('groupAct.aboutRuleMessage') }}
                <span class="main-text" @click="toPrivacy()">
                    <!-- 「 隐私权及 网站使用条款 」 -->
                    {{ $t('groupAct.aboutRule') }}
                </span>
                <!-- 之Cookie 声明。您继续使用本网站即表示您同意本公司得按本网 站使用条款之 Cookie 声明使用 cookie -->
                {{ $t('groupAct.aboutRuleMessageCookie') }}
            </div>
            <div class="flex flex-center mtop20">
                <div @click="closeOffCookiePrivacy()" class="banner-btn-footer slide-type-btn">
                    <!-- 我知道了 -->
                    {{ $t('groupAct.iknow') }}
                </div>
            </div>
        </div>
    </van-popup>

</template>
<script setup>
import SeoHeade from "@/components/SeoHead/index.vue"
import Header from "@/components/Header/h5.vue"
import Goods from "@/components/Home/goods.vue"
import Footer from "@/components/Footer/h5.vue"
import { ref, onMounted, reactive } from "vue";
import { showLoadingToast, closeToast, showConfirmDialog, showSuccessToast, showFailToast, showToast } from 'vant';
import { useI18n } from "vue-i18n";
let { t } = useI18n();
const router = useRouter();
const route = useRoute()
const state = reactive({
    bannerList: [],
    pcRecommendList: [],  //推荐
    storeId: getStoreId(),
    queryCriteria: {    //查询条件
        currentPage: 1,
        pageSize: 8,
        orderBy: 'seq',
        orderType: 'desc',
        isMember: false
    },
    width: '48%',
    activeCg: '', //分类tab 选中
    groupActList: [], //团购 轮播 
    promotionSlides: [],
    navList: [],//分类
    ugcId: '-1',
    showLeft: true,
    navListPopup: [],
    activaCgIndex: 0, //分类展开更多
    slideTypeList: [], //弹框banner 列表
    bannerShowTime: false, //显示
    closeRemindVal: false,//是否不再展示
    storeInfo: {}
});

const cookieShow = ref(false);
const slideTypeShow = ref(false);
let layout = useState("layout");
const store = useTempStore()
let channelStore = useChannelStore()
// 首页的数据
const getH5Index = () => {
    let data = {
        store_id: state.storeId,
        current_page: state.queryCriteria.currentPage,
        page_size: state.queryCriteria.pageSize,
        ugc_id: state.ugcId, //-1 推荐  >0 分类
        orderBy: state.queryCriteria.orderBy,
        orderType: state.queryCriteria.orderType,
        isMember: state.queryCriteria.isMember == true ? 1 : null
    }
    h5Index(data).then((response) => {
        if (response.code == "200") {
            let { data } = response
            // banner
            state.bannerList = data.slides ? data.slides.filter(item => item.slideType == 1) : []
            state.promotionSlides = data.promotionSlides  //促销
            state.pcRecommendList = data.ugc_goods  //推荐
            state.navList = []
            if (data.ugc_all != null && data.ugc_all != "") {
                if (state.navList.length < 2) {
                    state.navList = [...state.navList, ...data.ugc_all]
                    state.navListPopup = data.ugc_all.slice(0, 5);
                    state.activeCg = state.navList[0].id
                }
            }
            bannerShowComputed(data.slides)
        }
    });
};
// 重置banner 弹框数据
const bannerShowComputed = (slides) => {
    // console.log(slides)
    // console.log(store.slideSwiperList)
    // console.log(state.bannerShowTime)
    if (state.bannerShowTime) {
        // 拿存储数据
        // if (store.slideSwiperList && store.slideSwiperList.length > 0) {
        //     state.slideTypeList = store.slideSwiperList
        // } else {
        // state.slideTypeList = slides
        state.slideTypeList = slides.filter(item => item.slideType == 3).sort((a, b) => {
            return b.seq - a.seq
        })
        // }
        slideTypeShow.value = state.slideTypeList.length > 0 ? true : false
        // 当弹框显示的时候 获取存储数据。做弹框计数器
        if (slideTypeShow.value == true) {
            setStorageData('bannerTime', new Date().getTime())
            let count = localStorage.getItem("bannerTimeCount")
            if (!count) {
                setStorageData('bannerTimeCount', 1)
            } else {
                count = accAdd(count, 1)
                setStorageData('bannerTimeCount', count)
            }
        }
    }
}
//关闭首页弹框
const closeOffSliderList = (index) => {
    state.slideTypeList.splice(index, 1)
    if (state.slideTypeList.length > 0) {
        store.slideSwiperList = state.slideTypeList
    } else {
        slideTypeShow.value = false
    }
}

// 今日不在提醒
const closeRemind = () => {
    state.closeRemindVal = !state.closeRemindVal
    //当选中的今日不在提醒 存入时间
    if (state.closeRemindVal) {
        setStorageData('bannerTime', new Date().getTime())
    } else {
        localStorage.removeItem("bannerTime");
    }
}
// 团购活动列表
const getGroupActList = () => {
    let data = {
        pageSize: 10,
        currentPage: 1,
        groupName: '',
        groupId: '',
        status:1
    }
    groupList(data).then(response => {
        if (response.code == 200) {
            state.groupActList = response.data.list
        }
    })
}
const toGroupView = (item) => {
    router.push({
        path: '/group/act-goods',
        query: {
            id: item.id,
            isPrivate: item.isPrivate
        }
    });
}
// banner 点击
const toSwiperView = (e, index) => {
    if (e.url) {
        if (e.url.indexOf('http') > -1) {
            window.location.href = e.url
        } else {
            router.push({
                path: e.url,
            });
        }
    }
    // 弹框 的banner 点击
    if (index > -1 && index !== undefined) {
        closeOffSliderList(index)
    }

    GASend(e)
}

const toMoreGoods = () => {
    router.push({
        path: '/category'
    })
}
// 分类切换
const onClickCgTab = ({ name, title }) => {
    state.ugcId = name
    router.push({
        path: '/category',
        query: {
            id: state.ugcId
        }
    })
    // getH5Index()
}
// 到商品详情
const toGoodsInfo = (goods) => {
    router.push({
        path: '/goods/goods-detail',
        query: {
            id: goods.id,
            goodsChoiceType: goods.goodsChoiceType
        }
    })
}
//判断签到弹框的时间对比
const judgeFn = (time, time1) => {
    return new Date(time).toDateString() === new Date(time1).toDateString()
}
// 隐私政策弹框
const closeOffCookiePrivacy = () => {
    const Cookies = useCookie('cookieShow', () => false,
        {
            expires: new Date(),
        })
    Cookies.value = false
    cookieShow.value = false
}
const toPrivacy = () => {
    router.push({
        path: '/articles',
        query: {
            type: 'privacy'
        }
    })
}
const initData = () => {
    // 获取cookieShow 隐私政策
    let cookieShowData = useCookie('cookieShow')
    if ((cookieShowData.value == undefined || cookieShowData.value == '') && cookieShowData.value !== false) {
        cookieShow.value = true
    } else {
        if (cookieShowData.value == false) {
            cookieShow.value = false
        }
    }
    // console.log(cookieShowData.value)
    // console.log(cookieShow.value)
    // 判断今天是不是已经显示过弹框banner
    if (localStorage.getItem("bannerTime")) {
        let bannerTime = localStorage.getItem("bannerTime")
        let judgeFnTime = judgeFn(new Date().getTime(), Number(bannerTime))

        // 不是同一天
        if (!judgeFnTime) {
            state.bannerShowTime = true
            // 不是同一天就移除bannerTimeCount bannerTime
            localStorage.removeItem("bannerTime");
            localStorage.removeItem("bannerTimeCount");
        } else {
            // 同一天 小于3次 或者没有值的时候
            let count = localStorage.getItem("bannerTimeCount")
            if (!count) {
                state.bannerShowTime = true
            }else if(count<3){
                state.bannerShowTime = true
            }
             else {
                state.bannerShowTime = false
            }
        }
    } else {
        state.bannerShowTime = true
        // console.log( state.bannerShowTime)
    }
    getH5Index()
    getGroupActList()
}
const GASend = (swiper) => {
    let data = {
        banner_id: swiper.id,
        banner_name: swiper.bannerName ? swiper.bannerName : ''
    }
    sendDataGA('click_banner', data)
}
//渠道号存储
const getAds=(option)=> {
    let data = {
        url: '',
        type: '',
    }
    if (channelStore.channelData(option)) {
        //1. 先统计landing的
        data.url = '/home'
        data.type = 'landing_click'
        channelStore.getChannel(data)
    }
}
onMounted(() => {
    initData()
    let storeInfo = JSON.parse(localStorage.getItem("storeInfo"));
    state.storeInfo = storeInfo
    useSeoMeta({
        title:  state.storeInfo?.storeSeoTitle,
        ogTitle:  state.storeInfo?.storeSeoTitle,
        description:  state.storeInfo?.storeSeoDescription,
        ogDescription:  state.storeInfo?.storeSeoDescription,
        ogImage:  state.storeInfo?.storeSeoImgDto?.fullPath,
        twitterCard: 'summary_large_image',
      })

      getAds(route.query)
});


</script>
<style lang="scss" scoped>
:deep(.van-tabs__line) {
    width: 18px !important;
    bottom: 16px !important;
}

@import "@/assets/css/home/index";
</style>
