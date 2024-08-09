<template>
    <!-- <SeoHeade :title="state.storeInfo?.storeSeoTitle" :description="state.storeInfo?.storeSeoDescription"
        :keywords="state.storeInfo?.storeSeoKeywords"></SeoHeade> -->
    <div data-aos="fade-down">
        <el-carousel :interval="4000" autoplay arrow="always" height="519px" ref="carousel">
            <el-carousel-item v-for="(swiper, index) in state.bannerList" :key="index">
                <el-image :src="swiper.acc.fullPath" @click="toSwiperView(swiper)" class="pc-banner-img pointer" />
            </el-carousel-item>
        </el-carousel>
    </div>
    <div class="auto pc-box-content-b" style="width: 1200px;">
        <!-- 分类 -->
        <div class="flex align-items-center pc-cg-list just-between pointer">
            <div v-for="category in state.partCategory" :key="category.id" @click.native="toCategory(category.id)"
                class="pc-cg-item flex flex-center">{{ category.className }}</div>
        </div>
        <figure class="pc-box-content-b">
            <!--热销商品 -->
            <div class="flex flex-center pc-home-hot-title">
                <span class="pc-home-hot-icon-line"></span>
                <span class="pc-home-hot-icon fontW">
                    <!-- 热销商品 -->
                    {{ $t('groupAct.sellHotGoods') }}</span>
                <span class="pc-home-hot-icon-line"></span>
            </div>
            <!-- 商品 -->
            <Goods @addBuyGoods="toGoodsInfo" :goodsList="state.pcRecommendList" :width="state.width"></Goods>
            <!-- 探索更多 -->
            <div class="pc-to-goods-more flex flex-center fontW auto pointer" @click="toMoreGoods()">
                <!-- 探索更多商品 -->
                {{ $t('groupAct.findMoreGoods') }}
            </div>
            <!-- 限时团购 -->
            <div class="flex flex-center pc-home-hot-title" v-if="state.groupActList.length > 0">
                <span class="pc-home-hot-icon-line"></span>
                <span class="pc-home-hot-icon fontW">
                    <!-- 限时团购 -->
                    {{ $t('groupAct.limitedTimeGroup') }}</span>
                <span class="pc-home-hot-icon-line"></span>
            </div>
            <!-- 团购 活动列表 -->
            <div class="flex just-between align-items-center pointer" v-if="state.groupActList.length > 0">
                <svg-icon name="pre" size="27" @click="toActView('prev')"></svg-icon>
                <div class="flex1" style="padding:0 12px">
                    <el-carousel ref="actCarousel" :autoplay="false" arrow="never" height="260px"
                        indicator-position="none">
                        <el-carousel-item class="pc-el-cart  flex align-items-center just-between"
                            v-for="(swiper, index) in state.groupActList" :key="index">
                            <div class="top-img" v-for="(act, index2) in swiper" :key="index2"
                                @click="toGroupView(act)">
                                <el-image v-if="act.fill && act.fill.fullPath" :src="act.fill.fullPath"
                                    class="pc-act-img" />
                                <el-image v-else src="/img/act-empty.png" class="pc-act-img" />
                            </div>
                            <div class="top-img" v-if="swiper.length == 1">
                                <el-image src="/img/act-empty.png" class="pc-act-img" />
                            </div>
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <svg-icon name="next" size="27" class="ponter" @click="toActView('pre')"></svg-icon>
            </div>
            <!--促销专区 -->
            <div class="flex flex-center pc-home-hot-title" v-if="state.promotionSlides.length > 0">
                <span class="pc-home-hot-icon-line"></span>
                <span class="pc-home-hot-icon fontW">
                    <!-- 促销专区 -->
                    {{ $t('groupAct.promotionZone') }}
                </span>
                <span class="pc-home-hot-icon-line"></span>
            </div>
            <!-- 其他活动 -->
            <div class="flex just-between align-items-center pointer" v-if="state.promotionSlides.length > 0">
                <svg-icon name="pre" size="27" @click="toOtherActView('prev')"></svg-icon>
                <div class="flex1" style="padding:0 12px">
                    <el-carousel ref="actOtherCarousel" :autoplay="false" arrow="never" height="260px"
                        indicator-position="none">
                        <el-carousel-item class="pc-el-cart  flex align-items-center just-between"
                            v-for="(swiper, index) in state.promotionSlides" :key="index">
                            <div class="top-img" v-for="(act, index2) in swiper" :key="index2"
                                @click="toSwiperView(act)">
                                <el-image v-if="act.acc && act.acc.fullPath" class="pc-act-img"
                                    :src="act.acc.fullPath" />
                                <el-image v-else src="/img/act-empty.png" class="pc-act-img" />
                            </div>
                            <div class="top-img" v-if="swiper.length == 1">
                                <el-image src="/img/act-empty.png" class="pc-act-img" />
                            </div>
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <svg-icon name="next" size="27" class="ponter" @click="toOtherActView('pre')"></svg-icon>
            </div>
        </figure>
        <el-image src="/img/logo/ying-yang-shi.png"></el-image>
        <div class="auto" style="width: 1200px;">
            <div class="footer-article fontW flex box-content-b" style="font-size: 24px;">
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
        </div>
    </div>

    <!--首页弹框轮播 -->
    <van-overlay z-index="100" :show="slideTypeShow" v-if="state.slideTypeList.length > 0 && slideTypeShow == true">
        <div class="flex flex-center h5-modalBox-content">
            <div class="h5-modalBox pc-modalBox" v-for="(swiper, swiperIndex) in state.slideTypeList" :key="swiper.id">
                <!-- 关闭 -->
                <img src="/img/icon/x.png" @click="closeOffSliderList(swiperIndex)" mode="widthFix"
                    class="h5-slideType-img-close">
                </img>
                <img v-if="swiper?.acc?.fullPath" :src="swiper?.acc?.fullPath"
                    @click="toSwiperView(swiper, swiperIndex)" mode="widthFix" class="pc-slideType-img">
                </img>
            </div>
        </div>
    </van-overlay>

</template>
<script setup>
import SeoHeade from "@/components/SeoHead/index.vue"
import Goods from "@/components/Home/goods.vue"

import { ref, onMounted, reactive } from "vue";
const { $aos } = useNuxtApp()
import { useI18n } from "vue-i18n";
let { t } = useI18n();
const router = useRouter();
const route = useRoute()
const state = reactive({
    bannerList: [],
    pcRecommendList: [],
    pcNewGoodsList: [],
    storeId: getStoreId(),
    queryCriteria: { //查询条件
        currentPage: 1,
        pageSize: 8,
        orderBy: 'seq',
        orderType: 'desc',
        isMember: false
    },
    width: '23.5%',
    groupActList: [],
    promotionSlides: [],
    partCategory: [],
    slideTypeList: [], //弹框banner 列表
    bannerShowTime: false, //显示
    storeInfo: {}
});
let layout = useState("layout");
const store = useTempStore()
const actCarousel = ref()
const actOtherCarousel = ref()
const cookieShow = ref(false);
const slideTypeShow = ref(false);
let channelStore = useChannelStore()
// 
const getH5Index = () => {
    let data = {
        store_id: state.storeId,
        current_page: state.queryCriteria.currentPage,
        page_size: state.queryCriteria.pageSize,
        ugc_id: '-1', //-1 推荐  >0 分类
        orderBy: state.queryCriteria.orderBy,
        orderType: state.queryCriteria.orderType,
        isMember: state.queryCriteria.isMember == true ? 1 : null
    }
    h5Index(data).then((response) => {
        if (response.code == "200") {
            let { data } = response
            // banner
            state.bannerList = data.slides ? data.slides.filter(item => item.slideType == 1) : []
            state.pcRecommendList = data.ugc_goods
            // 分类
            // state.partCategory = data.ugc_all.slice(0, 5)
            getQueryListClass()
            // 因为需要显示2个图片 所以数据要2个分组
            if (data.promotionSlides && data.promotionSlides.length > 0) {
                let promotionSlides = data.promotionSlides.reduce((acc, curr, index) => {
                    if (index % 2 === 0) {
                        acc.push([curr]);
                    } else {
                        acc[acc.length - 1].push(curr);
                    }
                    return acc;
                }, [])
                state.promotionSlides = promotionSlides
            }
            bannerShowComputed(data.slides)
        }
    });
};

const getQueryListClass = () => {
  queryListClass({ storeId: state.storeId }).then((response) => {
    if (response.code == 200) {
        if(response.data.length>5){
            state.partCategory = response.data.slice(0, 5)
        }else{
            state.partCategory = response.data
        }

    }
})
}

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

const getGroupActList = () => {
    let data = {
        pageSize: 10,
        currentPage: 1,
        groupName: '',
        groupId: '',
        status: 1
    }
    groupList(data).then(response => {
        if (response.code == 200) {
            // 因为需要显示2个图片 所以数据要2个分组
            if (response.data.list && response.data.list.length > 0) {
                let newGroupActList = response.data.list.reduce((acc, curr, index) => {
                    if (index % 2 === 0) {
                        acc.push([curr]);
                    } else {
                        acc[acc.length - 1].push(curr);
                    }
                    return acc;
                }, [])
                state.groupActList = newGroupActList
            }

            // console.log( state.groupActList)
        }
    })
}


// 团购
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
// 团购
const toActView = (type) => {
    type == 'prev' ? actCarousel.value.prev() : actCarousel.value.next()
}
// 其他活动
const toOtherSwiperView = () => {
    // router.push({
    //     path: '/group/act-goods',
    //     query: {
    //         id: act.id
    //     }
    // })
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
//  其他活动
const toOtherActView = (type) => {
    type == 'prev' ? actOtherCarousel.value.prev() : actOtherCarousel.value.next()
}
const toCategory = (id) => {
    router.push({
        path: `/category`,
        query: {
            id: id
        }
    });
}
//判断签到弹框的时间对比
const judgeFn = (time, time1) => {
    return new Date(time).toDateString() === new Date(time1).toDateString()
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
            } else if (count < 3) {
                state.bannerShowTime = true
            } else {
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
    $aos().init({
        easing: 'ease-out-back',
        duration: 1000
    })

    getAds(route.query)
});
</script>

<style lang="scss" scoped>
// banner 图指示标颜色
:deep(.el-carousel__indicators--horizontal) {
    position: absolute;
    bottom: 5px;
    text-align: right;

    .el-carousel__indicator--horizontal button {
        width: 10px;
        height: 10px;
        background: #ffffff;
        border-radius: 50%;
        opacity: 0.5;
    }

    .el-carousel__indicator--horizontal.is-active button {
        width: 10px;
        height: 10px;
        background: var(--main-color);
        opacity: 1;
        border-radius: 10px;
    }
}

.custom-trigger {
    text-align: center;
    background: #fff;
    padding: 10px;
}

@import "@/assets/css/home/index";
@import "@/assets/css/group/goodsItem";
</style>