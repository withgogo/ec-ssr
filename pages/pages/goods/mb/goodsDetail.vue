<template>
    <!-- seo -->
    <SeoHeade :title="state.seoInfo?.title" :description="state.seoInfo?.description"
        :keywords="state.seoInfo?.keywords"></SeoHeade>
    <!-- 顶部导航 -->
    <van-nav-bar fixed placeholder left-arrow z-index="2" @click-left="goBack">
        <template #title>
            <div class="flex felx-center">
                <van-image width="162px" height="22px" src="/img/logo/header-logo.png" />
            </div>
        </template>
        <template #right>
            <van-icon name="/img/icon/cart.png" size="30" :badge="store.cartCountCp" @click="toViewJump('cart')" />
        </template>
    </van-nav-bar>
    <div class="content-box bg">
        <!-- banner -->
        <div class="h5-banner-img-box">
            <video v-if="state.goodsMainImg.includes('mp4')" ref="videoPlayer" id="videoContextH5" class="h5-banner-img" controls
                show-play-btn show-center-play-btn object-fit="contain" :title="state.goodsData?.goodsName"
                :src="state.goodsMainImg"></video>
            <img v-else class="h5-banner-img" :src="state.goodsMainImg" />
            <div class="h5-soldout-mask" v-if="state.stock <= 0">
                <img class="h5-soldOut" src="/img/goods/soldout.png" />
            </div>
            <Tips v-if="state.goodsChoiceType == 7" :text="$t('packageGoods.packageText')" :position="true"
                bgColor="#f0ad4e" />
        </div>
        <!-- 图片swiper -->
        <div class="flex bgfff align-items-center h5-banner-swiper-box" v-if="state.bannerList.length > 1">
            <div  class="flex  align-items-center h5-banner-swiper">
                <div  v-for="banner, index in state.bannerList" :key="index" class="h5-banner-swiper-item"
                    @click.stop="toBannerData(banner)">
                    <video v-if="banner.fullPath.includes('mp4')" autoplay muted playsinline
                    @canplay="canplay($event)"
                    class="h5-banner-swiper-img" 
                        :title="state.goodsData?.goodsName">
                        <source :src="banner.fullPath">
                    </video>
                    <van-image v-else class="h5-banner-swiper-img" :src="banner.fullPath"
                        :alt="state.goodsData?.goodsName" />
                </div>
            </div>
            <svg-icon v-if="state.bannerList.length > 4" class="h5-banner-swiper-prev ponter"
                name="next" size="30"></svg-icon>
        </div>
        <!-- 价格 -->
        <div class="h5-goods-info bgfff h5-goods-info-price-box">
            <div class="flex just-between  h5-goods-price-box">
                <div class="flex align-items-center">
                    <!-- 首购 -->
                    <memberTips v-if="state.goodsData.discountType" :discountType="state.goodsData.discountType">
                    </memberTips>

                    <!-- 套餐 普通商品  storePrice！== rebatePrice -->
                    <memberTips
                        v-if="((state.goodsData.isAllStore && state.goodsData.isAllStore == 1) || state.actType == 'member' || state.memberFullSiteActivation == true) && state.goodsData.storePrice !== state.goodsData.rebatePrice">
                    </memberTips>

                    <div class="price h5-goods-price"> {{ $t('moneyUnit') }}{{ state.selectSpecPrice.price }}</div>
                    <!-- default 价格 -->
                    <div class="default-text h5-goods-default-price on-line-text mright5"
                        v-if="state.selectSpecPrice.price !== state.selectSpecPrice.originPrice">
                        {{ $t('moneyUnit') }}
                        {{ state.selectSpecPrice.originPrice }}
                    </div>

                    <Tips v-if="state.goodsData.goodsTransfee == 1" :text="$t('home.transfee')" :position="false"
                        bgColor="red" />
                </div>

            </div>
            <!-- 如何享有會員價 -->
            <div v-if="state.isUserLvlUpgrade == 1" class="h5-member-price-question font12 flex  align-items-center justify-content-end"
                @click="toViewJump('membership')">
                <van-image width="14px" height="14px" src="/img/icon/question.png" />
                {{ $t('goodsDetail.getMemberPrice') }}
            </div>
            <!-- 商品名称 -->
            <!-- 普通商品名称 团购商品名称 -->
            <div class="h5-goods-info-name fontW fontW">{{ state.goodsData?.goodsName }}</div>
            <!-- slogan -->
            <div class="slogan h5-slogan-des"> {{ state.goodsData.goodsAdWords }} </div>
            <!-- 介绍 -->
            <div class="h5-slogan-des"> {{ state.goodsData.goodsService }} </div>

        </div>

        <!-- 套餐子商品 -->
        <div class="h5-goods-info bgfff" style="padding: 10px;" v-if="false">
            <div class="flex flex1 h5-pack-goods-Dto" v-for="(goods, index) in state.packGoodsDtoSpecList"
                :key="goods.id">
                <!-- 商品图片 -->
                <van-image v-if="goods.img" :src="goods.img" class="h5-goods-img-extra">
                </van-image>
                <div class="flex h5-goods-item flex1">
                    <!-- 商品名称 -->
                    <div class="h5-goods-name">{{ goods.goodsName }}</div>
                </div>
                <!-- <div class="h5-goods-limit-count">
                    x{{goods.inventoryType=='spec'? goods.count :  goods.count * 1 > goods.goodsInventory ? goods.goodsInventory : goods.count * 1}}
                </div> -->
            </div>
        </div>

        <!-- 配送 活动  -->
        <div class="h5-goods-info bgfff">
            <div class="h5-goods-act-trans flex align-items-center" v-if="state.transport?.freePostageStatus">
                <van-tag color="#BEE3F8" text-color="#2A4365" size="large" class="act-tips">{{
                    $t('goodsDetail.delivery')
                    }}</van-tag>
                {{ $t('goodsDetail.orderEnough') + Math.ceil(state.transport?.freePostage) +
                    $t('goodsDetail.freeDelivery') }}
            </div>
            <!-- 限购   -->
            <div class="h5-goods-act-trans flex align-items-center" v-if="state.actType == 'goodlimit'">
                <van-tag color="#E9D8FD" text-color="#2A4365" size="large" class="act-tips">{{
                    $t('goodsDetail.limitBuy')
                    }}</van-tag>
                <span class="slogan" v-if="state.advInfo?.limit_count > 0">
                    {{ $t('goodsDetail.goodsLimit') }}
                    {{ state.advInfo?.limit_count }}</span>
            </div>

            <!-- 满额赠  -->
            <div class="h5-goods-act-trans flex align-items-center" v-if="state.actType == 'buygiftGoods'">
                <van-tag color="#E9D8FD" text-color="#2A4365" size="large" class="act-tips">{{
                    $t('goodsDetail.enoughGive')
                    }}</van-tag>
                <span class="slogan"> {{ $t('goodsDetail.enoughGive') + '-->' + $t('goodsDetail.getMore') }}</span>
            </div>

            <!-- 满额减  -->
            <div @click="toViewJump('erGoods')" class="h5-goods-act-trans flex align-items-center"
                v-if="state.actType == 'erGoods'">
                <van-tag color="#E9D8FD" text-color="#2A4365" size="large" class="act-tips">{{
                    $t('goodsDetail.enoughReduce') }}</van-tag>
                <span class="slogan" v-if="state.goodsChoiceType == 7"> {{
                    state.advInfo?.title + '-->' + $t('goodsDetail.getMore') }}</span>
                <span class="slogan" v-else> {{ state.advInfo?.ertitle + '-->' + $t('goodsDetail.getMore') }}</span>
            </div>
            <!-- 团购 -->
            <div @click="toViewJump('groupGoods')" class="h5-goods-act-trans flex align-items-center"
                v-if="state.actType == 'group'">
                <van-tag color="#E9D8FD" text-color="#2A4365" size="large" class="act-tips">{{
                    $t('goodsDetail.groupGoods')
                    }}</van-tag>
                <span class="slogan">{{ $t('goodsDetail.groupPromotion') + '-->' + $t('goodsDetail.checkNow') }}</span>
            </div>

            <!-- 折扣 -->
            <div @click="toViewJump('discount')" class="h5-goods-act-trans flex align-items-center"
                v-if="state.actType == 'discountGoods'">
                <van-tag color="#E9D8FD" text-color="#2A4365" size="large" class="act-tips">{{
                    $t('goodsDetail.discountGoods') }}</van-tag>
                <span class="slogan" v-if="state.goodsChoiceType == 7"> {{ state.advInfo?.title
                    + '-->' + $t('goodsDetail.checkNow') }}</span>
                <span class="slogan" v-else> {{ state.advInfo?.multiTitle + '-->' + $t('goodsDetail.checkNow') }}</span>
            </div>
        </div>

        <!-- 加价购商品 -->
        <div class="bgfff" v-if="state.extraGoods && state.extraGoods.length > 0">
            <h2 class="h5-guess-customer-title fontW flex align-items-center extra-goods-title">
                {{ $t('extraGoods.extraGoodsList') }}
                <img src="/img/icon/path.png" style="margin-left: 5px;" />
            </h2>
            <div class="h5-extra-goods-info-list flex">
                <div class="h5-extra-Goods border " v-for="(item, index) in state.extraGoods" :key="item.id">
                    <div style="overflow: hidden;">
                        <!-- 商品图片 -->
                        <van-image v-if="item.accessoryDto?.fullPath" :src="item.accessoryDto?.fullPath"
                            class="h5-extra-Goods-img">
                        </van-image>
                        <div class="flex h5-goods-item" style="padding: 4px 10px;">
                            <!-- 商品名称 -->
                            <div class="font12 h5-goods-name goods-name">{{ item.goodsName }}</div>
                            <div class="flex align-items-center">
                                <div class="price mright5">
                                    {{ $t('moneyUnit') }} {{ item.extraPrice }}
                                </div>
                                <div class="default-text font12 on-line-text"
                                    v-if="item.storePrice !== item.extraPrice">
                                    {{ $t('moneyUnit') }}{{ item.extraPrice }}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <!-- tab 商品详情 相关数据 -->
        <div class="bgfff h5-goods-service">
            <van-sticky :offset-top="46">
                <van-tabs v-model:active="state.goodsTab" @click="onClickItemTab" color="#00ACC8"
                    title-active-color="#00ACC8" title-inactive-color="#5E5873">
                    <!-- 商品介绍 -->
                    <van-tab :title="$t('goodsDetail.goodsIntro')" name="introduce"></van-tab>
                    <!-- 商品规格 -->
                    <van-tab :title="$t('goodsDetail.goodsSpec')" name="specDetail"></van-tab>
                    <!-- 退货换须知 -->
                    <van-tab :title="$t('goodsDetail.returnInfo')" name="returns"></van-tab>
                    <!-- 相关产品 -->
                    <van-tab :title="$t('goodsDetail.relateGoods')" name="correlation"></van-tab>
                </van-tabs>
            </van-sticky>
        </div>
        <!-- 商品数据相关 -->
        <div class="h5-goods-info bgfff h5-goods-des">
            <!-- 商品介绍  -->
            <div ref="goodsDetails" class="flex align-items-center fontW goods-title-tips">
                <span class="limited-preferential-left-border goods-des-left-border"
                    style="background-color:#00c2c1;"></span>
                {{ $t('goodsDetail.goodsIntro') }}
            </div>
            <!-- 商品介绍 -->
            <div v-html="state.goodsData.goodsDetails" class="font12 rich-text-wrap"></div>

            <!-- 规格详情  -->
            <div ref="goodsSpecDetail" class="flex align-items-center fontW goods-title-tips mtop5">
                <span class="limited-preferential-left-border goods-des-left-border"
                    style="background-color:#00c2c1;"></span>
                {{ $t('goodsDetail.goodsSpec') }}
            </div>
            <!-- 规格详情 -->
            <div v-html="state.goodsData.goodsSpecDetail" class="font12 rich-text-wrap"></div>

            <!-- 退換貨須知  -->
            <div ref="articleContent" class="flex align-items-center fontW goods-title-tips mtop5">
                <span class="limited-preferential-left-border goods-des-left-border"
                    style="background-color:#00c2c1;"></span>
                {{ $t('goodsDetail.returnInfo') }}
            </div>
            <!-- 退換貨須知 -->
            <div v-html="state.returnNotice?.articleContent" class="font12"></div>
        </div>

        <!-- 猜你喜欢 -->
        <div class="goods-content-box bgfff" ref="guessCustomer">
            <h2 v-if="state.guessCustomer.length > 0 && state.isGroupPrivate == 0"
                class="h5-guess-customer-title fontW flex align-items-center">
                {{ $t('goodsDetail.relateGoods') }}
                <img src="/img/icon/path.png" style="margin-left: 5px;" />
            </h2>
            <Goods v-if="state.isGroupPrivate == 0" @addBuyGoods="toGoodsInfo" :goodsList="state.guessCustomer"
                :width="state.width"></Goods>
        </div>
    </div>
    <div class="place"></div>
    <div class="h5-footer-submit bgfff flex just-between align-items-center" style="z-index:100">
        <!-- 私密购的时候 不展示 -->
        <div v-if="state.isGroupPrivate == 0" class=" flex just-between align-items-center">
            <!-- 分享 -->
            <SocialShare v-if="state.goodsData.goodsName" class="font11 h5-collection-share flex flex-col"
                network="line" key="line" :url="host" :title="state.goodsData?.goodsName"
                :description="state.goodsData?.goodsName">
                <van-image src="/img/icon/share.png" width="16px" height="18px"></van-image>
                {{ $t('button.shareBtn') }}
            </SocialShare>
            <!-- 收藏 -->
            <div class="font11 h5-collection-share flex flex-col" @click="collectAdd">
                <van-image v-if="state.goodsItems.is_favorite || state.goodsItems.isFavorite" src="/img/icon/xing.png"
                    width="19px" height="19px"></van-image>
                <van-image v-else src="/img/icon/xingxing.png" width="19px" height="19px"></van-image>
                {{ state.goodsItems.is_favorite || state.goodsItems.isFavorite ? '已' : '' }}{{ $t('button.favBtn') }}
            </div>
        </div>
        <!-- 加入购物车 -->
        <div class="add-cart h5-add-buy-btn flex flex-center font16" @click="addCartBuyBtn('addCart')">
            {{ $t('button.addCart') }}
        </div>
        <!-- 立即购买 -->
        <div class="buy h5-add-buy-btn flex flex-center font16" @click="addCartBuyBtn('addBuy')">
            {{ $t('button.buy') }}
        </div>
    </div>

    <!-- 套餐商品 -->
    <van-popup v-model:show="packageGoodSpec" round position="bottom" :style="{ height: 'auto' }">
        <div class="chose-spec-content">
            <!-- 商品展示 -->
            <packGoods v-if="packageGoodSpec" :packageGoodsMain="state.mainGoods"
                :specCombination="state.specCombination" :packGoodsDtoSpecList="state.packGoodsDtoSpecList"
                @showCombinationSpec="showCombinationSpec" @addCartBuy="addCartBuy" @checkGoods="getPackageItems"
                @hidePackageGoodSpec="hidePackageGoodSpec">
            </packGoods>
        </div>
    </van-popup>

    <!-- 套餐选规格 -->
    <van-popup v-model:show="packageGoodSpecVal" round position="bottom" :style="{ height: 'auto' }">
        <div class="chose-spec-content">
            <!-- 子商品 -->
            <packGoodsSpec v-if="packageGoodSpecVal" :choseGoods="state.choseGoods" :isCombination="true"
                :count="state.count" @combinationSpecConfirm="combinationSpecConfirm"
                @hideCombinPlanSpec="hideCombinPlanSpec">
            </packGoodsSpec>
        </div>
    </van-popup>

    <!-- 普通 商品 -->
    <van-popup v-model:show="goodSpecVal" round position="bottom" :style="{ height: 'auto' }">
        <div class="chose-spec-content">
            <goodsSpec v-if="goodSpecVal" :goodsInventoryDetail="state.goodsInventoryDetail" @checkGoods="getGoodsItems"
                :mainGoods="state.mainGoods" :specList="state.specList" :selectSpecPrice="state.selectSpecPrice"
                @addCartBuy="addCartBuy" @hideGoodsSpec="hideGoodsSpec"></goodsSpec>
        </div>
    </van-popup>
</template>
<script setup>
import SeoHeade from "@/components/SeoHead/index.vue"
import Goods from "@/components/Home/goods.vue"
import SocialShare from "@/components/SocialShare/index.vue"
import packGoods from "@/components/Goods/packGoods.vue";
import packGoodsSpec from "@/components/Goods/packGoodsSpec.vue";
import goodsSpec from "@/components/Goods/goodsSpec.vue";
import { ref, onMounted, reactive,onUnmounted } from "vue";
import { ElMessage, ElMessageBox } from 'element-plus'
import memberTips from "@/components/Member/memberTip.vue";
import Tips from "@/components/Tips/index.vue";
import { showLoadingToast, closeToast, showConfirmDialog, showSuccessToast, showFailToast, showToast } from 'vant';
import { useI18n } from "vue-i18n";
let { t } = useI18n();
const router = useRouter();
const route = useRoute();
const store = useTempStore()
const host = ref('');
const state = reactive({
    token: getToken(),
    storeId: getStoreId(),
    guessCustomer: [],
    width: '48%',
    id: '',
    goodsChoiceType: 0,// 0 一般商品 ，7套餐商品
    currentMemberLevel: null,
    goodsData: {},
    transport: {},
    goodsMainImg: '/img/goods/p1.jpg',
    telephone: null,
    actType: null,
    goodsItems: {}, //所有商品信息

    specList: [],//普通商品规格
    goodsInventoryDetail: [],
    selectSpecPrice: {
        price: 0,
        originPrice: 0,
        count: 0
    },
    mainGoods: {}, // 主商品
    maxVlaue: 0,
    stock: 1,
    bannerList: [],
    specImg: null,
    goodsTab: 'introduce',
    returnNotice: {},
    advInfo: {},//活动数据

    autoplay: false,
    addCartBuyType: '',//addCart addBuy
    packageGoodsMain: {
        mainImg: null, //主图图片
        stock: 0, //库存 
        goodsName: null,
        id: null,
    },
    packGoodsDtoSpecList: [],
    choseGoods: {}, //当前选中的套餐商品
    specCombination: [],  //选中子商品的规格
    extraGoods: [], //加购商品

    memberFullSiteActivation: false,//全站会员开启
    isGroupPrivate: 0,
    seoInfo: {},
    isUserLvlUpgrade:0
});
// let cartCount = useState("cartCount")

let layout = useState("layout");
const packageGoodSpec = ref(false);
const packageGoodSpecVal = ref(false);
const goodSpecVal = ref(false);

const goodsDetails = ref(null);  //商品介绍
const goodsSpecDetail = ref(null);  //商品规格
const articleContent = ref(null);  //退货须知
const guessCustomer = ref(null); //猜你喜欢
const videoPlayer = ref(null) //视频
let groupStore = useGroupStore()
state.isGroupPrivate = groupStore.isPrivate

let translate = computed(() => {
    // 每次平移的宽度
    return swiper.translateX * 225;
})
let swiper = reactive({
    translateX: 0,
    tsion: true,
})
// 获取套餐商品详情 商品价格运费变动时候重新获取数据
const getPackageItems = () => {
    showLoadingToast({
        duration: 0,
        forbidClick: true,
        message: t('message.getDataIng'),
    });
    let data = {
        storeId: state.storeId,
        id: state.id,
    }
    packageItems(data).then(response => {
        if (response.code == 200) {
            let { data } = response
            state.packGoodsDtoSpecList = data.packGoodsDtoList
            state.currentMemberLevel = data.currentLevel ? data.currentLevel : null
            state.goodsData = data    //商品数据
            state.transport = data?.transport   //商品运费
            state.telephone = data.goodsStore?.storeTelephone  //手机
            state.goodsItems = data  //商品所有数据
            let seoInfo = {
                title: data.goodsName,
                keywords: data.seoKeywords,
                description: data.seoDescription,
            }
            state.seoInfo = seoInfo
            if (data.activityDtoList.length > 0) {
                switch (data.activityDtoList[0].type) {
                    case 'enoughReduce':
                        state.actType = 'erGoods'
                        state.advInfo = data.activityDtoList[0]
                        break;
                    case 'buyGift':
                        state.actType = 'buygiftGoods' //满送
                        break;
                    case 'member':
                        state.actType = 'member' //会员 
                        break;
                    case 'multiDiscount':
                        state.actType = 'discountGoods'   //折扣
                        state.advInfo = data.activityDtoList[0]
                        break;
                    case 'group':
                        state.actType = 'group' //团购
                        state.advInfo = data.activityDtoList[0]
                        break;
                    case 'combinPlan':
                        state.actType = 'combinPlan' //组合销售
                        break;
                    case 'goodLimit':
                        state.actType = 'goodlimit' //限购
                        state.advInfo = data.activityDtoList[0]
                        break;
                    case 'advanceSale':
                        state.actType = 'advanceSale' //限购
                        break;
                }
            }

            // 会员  首购价格
            if (state.actType == 'member' || (state.goodsData.isAllStore && state.goodsData.isAllStore == 1) || (state.goodsData.discountType && state.goodsData.discountType !== '')) {
                // 刚进入时候的商品价格 
                state.selectSpecPrice.price = state.goodsData.rebatePrice
                //店铺价格 
                state.selectSpecPrice.originPrice = state.goodsData.storePrice
            } else {
                state.selectSpecPrice.price = state.goodsData.storePrice
                state.selectSpecPrice.originPrice = state.goodsData.goodsPrice
            }
            // 规格商品
            if (state.goodsData.inventoryType == 'all') {
                state.selectSpecPrice.count = state.goodsData.goodsInventory
                // state.maxVlaue = state.selectSpecPrice.count
                state.stock = state.selectSpecPrice.count
            } else {
                // 商品库存
                let inventory = JSON.parse(state.goodsData.goodsInventoryDetail)
                //提前做 id 排序 然后选规格时候就不用在排了直接find 
                inventory.forEach(item => {
                    if (item.spData.length > 1) {
                        item.id = item.id.split('_').sort().toString() //提前做 id 排序
                    }
                })
                state.goodsInventoryDetail = inventory
                state.selectSpecPrice.count = state.goodsInventoryDetail.reduce((prev, curr) => {
                    return parseInt(prev) + parseInt(curr.count)
                }, 0)
                state.stock = state.selectSpecPrice.count
            }

            // 如果没有库存
            state.bannerList = []
            if (state.stock <= 0) {
                // 售完图片显示
                if (state.goodsData.goodsSoldoutPhoto !== null && state.goodsData.goodsSoldoutPhoto !==
                    undefined && state.goodsData.goodsSoldoutPhoto != '') {
                    let goodsSoldoutPhoto = state.goodsData.goodsSoldoutPhoto
                    state.bannerList.push(goodsSoldoutPhoto)
                }
            }
            // h5 视频
            if (layout.value == 'mobile') {
                // 视频 mobile
                if (state.goodsData.goodsMobileVideoPhoto !== null && state.goodsData
                    .goodsMobileVideoPhoto !==
                    undefined && state.goodsData.goodsMobileVideoPhoto != '') {
                    state.bannerList.push(state.goodsData.goodsMobileVideoPhoto)
                }
            }
            // 其他主图
            if (state.goodsData.goodsMainPhoto !== null && state.goodsData.goodsMainPhoto !==
                undefined && state.goodsData.goodsMainPhoto != '') {
                let goodsMainPhoto = state.goodsData.goodsMainPhoto
                //这里判断如果售馨图就不添加 主图标示
                goodsMainPhoto.type = state.goodsData.goodsSoldoutPhoto !== null && state.goodsData
                    .goodsSoldoutPhoto !==
                    undefined && state.goodsData.goodsSoldoutPhoto != '' ? null : 'main'
                state.bannerList.push(goodsMainPhoto)
                state.specImg = goodsMainPhoto.fullPath
                state.goodsMainImg = state.specImg
            }

            // 其他图片
            if (state.goodsData.goodsPhotos.length > 0) {
                state.bannerList = [...state.bannerList, ...state.goodsData.goodsPhotos]
                state.specImg = !state.specImg ? state.goodsData.goodsPhotos[0].fullPath : state.specImg
            }
            let packageGoodsMain = {
                mainImg: data.goodsMainPhoto?.fullPath, //主图图片
                stock: state.stock, //库存 
                goodsName: data.goodsName,  // 名称
                price: state.selectSpecPrice.price,  //真实付款价格/
                goodsPrice: state.selectSpecPrice.originPrice, //店铺商品价格
                id: state.id,  //商品id 
                goodsTransfee: data.goodsTransfee, // 这边是为了做加购物车的手的check 验证
                transportId: data.transportId, // 这边是为了做加购物车的手的check 验证
                inventoryType: data.inventoryType,
                actType: state.actType,
                toView: 'detail',
                addCartBuyType: state.addCartBuyType ? state.addCartBuyType : undefined,
                discountType: state.goodsData.discountType || undefined,
                isAllStore: state.goodsData.isAllStore || undefined
            }
            closeToast();
            state.mainGoods = packageGoodsMain
            GASend()
            createFBPixelOrg()
        } else {
            closeToast();
        }
    })
}
// 获取商品详情
const getGoodsItems = () => {
    showLoadingToast({
        duration: 0,
        forbidClick: true,
        message: t('message.getDataIng'),
    });
    let data = {
        storeId: state.storeId,
        id: state.id,
    }
    goodsItems(data).then(response => {
        if (response.code == 200) {
            let { data } = response
            state.specList = data.spec
            state.currentMemberLevel = data.currentLevel ? data.currentLevel : null
            state.goodsData = data.obj      //商品数据
            // console.log(state.goodsData)
            state.transport = data.obj?.transport   //商品运费
            state.telephone = data.store.storeTelephone  //手机
            state.goodsItems = data  //商品所有数据
            let seoInfo = {
                title: data.obj.goodsName,
                keywords: data.obj.seoKeywords,
                description: data.obj.seoDescription,
            }
            state.seoInfo = seoInfo
            if (data.adv) {
                if (data.adv.enoughReduce) {  //满减
                    state.actType = 'erGoods'
                    state.advInfo = data.adv.enoughReduce[0]
                }
                if (data.adv.buyGifts) {
                    state.actType = 'buygiftGoods' //满送
                }
                if (data.adv.combinPlan) {
                    state.actType = 'combinPlan' //组合销售
                }
                if (data.adv.groupGoods) {
                    state.actType = 'group' //团购
                    state.advInfo = data.adv.groupGoods[0]
                }
                if (data.adv.memberGoods && data.adv.memberGoods[0].id) {
                    state.actType = 'member' //会员
                } 
                 if (data.adv.memberGoods && data.adv.memberGoods.length > 0) {
                    // 全站会员
                    state.memberFullSiteActivation = true
                }
                if (data.adv.mdGoods) {
                    state.actType = 'discountGoods' //折扣
                    state.advInfo = data.adv.mdGoods[0]
                }
                if (data.adv.extraGoods) {
                    state.actType = 'extraGoods' //加价购
                    state.extraGoods = data.adv.extraGoods //加价购
                }
                if (data.adv.goodlimit) {
                    state.actType = 'goodlimit' //限购
                    state.advInfo = data.adv.goodlimit
                }
            }

            // 会员
            if ( state.memberFullSiteActivation || state.actType == 'member' || (state.goodsData.isAllStore && state.goodsData.isAllStore == 1) || (state.goodsData.discountType && state.goodsData.discountType !== '')) {
                // 刚进入时候的商品价格 
                state.selectSpecPrice.price = state.goodsData.rebatePrice
                //店铺价格 
                state.selectSpecPrice.originPrice = state.goodsData.storePrice

            } else {
                state.selectSpecPrice.price = state.goodsData.storePrice
                state.selectSpecPrice.originPrice = state.goodsData.goodsPrice
            }
            // 规格商品
            if (state.goodsData.inventoryType == 'all') {
                state.selectSpecPrice.count = state.goodsData.goodsInventory
                // state.maxVlaue = state.selectSpecPrice.count
                state.stock = state.selectSpecPrice.count
            } else {
                // 商品库存
                let inventory = JSON.parse(state.goodsData.goodsInventoryDetail)
                //提前做 id 排序 然后选规格时候就不用在排了直接find 
                inventory.forEach(item => {
                    if (item.spData.length > 1) {
                        item.id = item.id.split('_').sort().toString() //提前做 id 排序
                    }
                })
                state.goodsInventoryDetail = inventory
                state.selectSpecPrice.count = state.goodsInventoryDetail.reduce((prev, curr) => {
                    return parseInt(prev) + parseInt(curr.count)
                }, 0)
                state.stock = state.selectSpecPrice.count
            }
            state.bannerList = []
            // 如果没有库存
            if (state.stock <= 0) {
                // 售完图片显示
                if (state.goodsData.goodsSoldoutPhoto !== null && state.goodsData.goodsSoldoutPhoto !==
                    undefined && state.goodsData.goodsSoldoutPhoto != '') {
                    let goodsSoldoutPhoto = state.goodsData.goodsSoldoutPhoto
                    state.bannerList.push(goodsSoldoutPhoto)
                }
            }
            // h5 视频
            if (layout.value == 'mobile') {
                // 视频 mobile
                if (state.goodsData.goodsMobileVideoPhoto !== null && state.goodsData
                    .goodsMobileVideoPhoto !==
                    undefined && state.goodsData.goodsMobileVideoPhoto != '') {
                    state.bannerList.push(state.goodsData.goodsMobileVideoPhoto)
                }
            }
            // 其他主图
            if (state.goodsData.goodsMainPhoto !== null && state.goodsData.goodsMainPhoto !==
                undefined && state.goodsData.goodsMainPhoto != '') {
                let goodsMainPhoto = state.goodsData.goodsMainPhoto
                //这里判断如果售馨图就不添加 主图标示
                goodsMainPhoto.type = state.goodsData.goodsSoldoutPhoto !== null && state.goodsData
                    .goodsSoldoutPhoto !==
                    undefined && state.goodsData.goodsSoldoutPhoto != '' ? null : 'main'
                state.bannerList.push(goodsMainPhoto)
                state.specImg = goodsMainPhoto.fullPath
                state.goodsMainImg = state.specImg
            }

            // 其他图片
            if (state.goodsData.goodsPhotos.length > 0) {
                state.bannerList = [...state.bannerList, ...state.goodsData.goodsPhotos]
                state.specImg = !state.specImg ? state.goodsData.goodsPhotos[0].fullPath : state.specImg
            }

            let mainGoods = {
                mainImg: state.goodsData.goodsMainPhoto?.fullPath, //主图图片
                stock: state.stock, //库存 
                goodsName: state.goodsData.goodsName,  // 名称
                price: state.selectSpecPrice.price,  //真实付款价格/
                goodsPrice: state.selectSpecPrice.originPrice, //店铺商品价格
                id: state.id,  //商品id 
                goodsTransfee: state.goodsData.goodsTransfee, // 这边是为了做加购物车的手的check 验证
                transportId: state.goodsData.transportId, // 这边是为了做加购物车的手的check 验证
                inventoryType: state.goodsData.inventoryType,
                actType: state.actType,
                toView: 'detail',
                addCartBuyType: state.addCartBuyType ? state.addCartBuyType : undefined,
                discountType: state.goodsData.discountType || undefined
            }
            state.mainGoods = mainGoods
            GASend()
            createFBPixelOrg()
            closeToast()
        } else {
            closeToast()
        }
    })
}
// 猜你喜欢
const getGoodsListBottom = () => {
    let data = {
        storeId: state.storeId
    }
    goodsListBottom(data).then(response => {
        if (response.code == 200) {
            state.guessCustomer = response.data.your_like_goods.splice(0, 8)
        }
    })
}
const goBack = () => {
    router.push({
        path: '/home'
    })
}
// 抽屉 跳转 home user cart
const toViewJump = (type) => {
    if (type == 'cart') {
        router.push({
            path: "/user/user/cart",
        });
    } else if (type == 'membership') {
        router.push({
            path: `/articles`,
            query: {
                type: "membership"
            }
        });
    }
    else if (type == 'erGoods') {  //满减
        let actInfo = {}
        if (route.query.goodsChoiceType == 0) {
            actInfo = state.goodsItems?.adv?.enoughReduce[0]
        } else {
            actInfo = state.goodsItems?.activityDtoList[0]
        }
        router.push({
            path: `/enough-reduce/act-goods`,
            query: {
                id: actInfo.id,
            },
        });
    }
    else if (type == 'groupGoods') {
        let actInfo = {}
        if (route.query.goodsChoiceType == 0) {
            actInfo = state.goodsItems?.adv?.groupGoods[0]
        } else {
            actInfo = state.goodsItems?.activityDtoList[0]
        }
        router.push({
            path: `/group/act-goods`,
            query: {
                id: actInfo.id,
                isPrivate: actInfo.isPrivate
            },
        });
    }
    else if (type == 'discount') {
        let actInfo = {}
        if (route.query.goodsChoiceType == 0) {
            actInfo = state.goodsItems?.adv?.mdGoods[0]
        } else {
            actInfo = state.goodsItems?.activityDtoList[0]
        }
        router.push({
            path: `/discount-buy/act-goods`,
            query: {
                id: actInfo.id,
            },
        });
    }
}
const toBannerData = (item) => {
    state.goodsMainImg = item.fullPath
}
// 获取退货详情
const getSysInfos = () => {
    getSysInfo({ articleKey: 'return_notice' }).then(response => {
        if (response.code == 200) {
            state.returnNotice = response.data
        }
    })
}
// 收藏
const collectAdd = () => {
    if (state.token) {
        let isFavorite = false
        if (state.goodsChoiceType == 7) {
            state.goodsItems.isFavorite = !state.goodsItems.isFavorite
            isFavorite = state.goodsItems.isFavorite
        } else {
            state.goodsItems.is_favorite = !state.goodsItems.is_favorite
            isFavorite = state.goodsItems.is_favorite
        }
        if (isFavorite == true) {
            addGoodsFavorite({ id: state.id }).then(response => {
                if (response.code == 200) {
                    showSuccessToast(t('message.addFavSuccessMsg'))
                } else {
                    state.goodsItems.is_favorite = !state.goodsItems.is_favorite
                    showFailToast(t('message.addFavFailMsg'))
                }
            })
        } else {
            goodsFavoriteDel({ id: state.id }).then(response => {
                if (response.code == 200) {
                    showSuccessToast(t('message.adelFavSuccessMsg'))
                } else {
                    state.goodsItems.is_favorite = !state.goodsItems.is_favorite
                    showFailToast(t('message.delFailMsg'))
                }
            })
        }
    } else {
        showToast(t('user.loginInPlease'))
        router.push({
            path: '/login/login-code',
            query: {
                redirectUrl: window.location.href
            }
        })
    }
}

//加入购物车
const addCartBuyBtn = (type) => {
    if (!getToken()) {
        showToast(t('login.loginInvalid'))
        setTimeout(() => {
            router.push({
                path: '/login/login-code',
                query: {
                    redirectUrl: window.location.href,
                }
            })
        }, 2000);
        return
    }
    state.addCartBuyType = type
    // 套餐
    if (state.goodsChoiceType == 7) {
        packageGoodSpec.value = true
        state.mainGoods.addCartBuyType = type
    } else {
        // 一般商品
        goodSpecVal.value = true
        state.mainGoods.addCartBuyType = type
    }
}

// 入购物车或者立即购买
const addCartBuy = (type, data) => {
    // type :addCart 加入购物车  addBuy 立即购买
    // data 套餐 立即购买的参数 { id:12, count:1 packageList:[]}   套餐数据存在缓存中  
    //  data 普通商品  立即购买的参数 { id:12, gsp:23, count:1}   
    if (type == 'addBuy') {
        const addressCvsStore = useCvsStore()
        // 普通商品需要清除数据 套餐商品是选了套餐数据不需要清除
        // if (state.goodsChoiceType !== 7) {
        clearStorageOrder()
        // }
        setTimeout(() => {
            // 数据存下来之后跳转下单页面直接获取数据
            addressCvsStore.cvsStoreData.goodsId = data.id
            addressCvsStore.cvsStoreData.count = data.count
            addressCvsStore.cvsStoreData.gsp = data.gsp ? data.gsp : null
            addressCvsStore.cvsStoreData.type = 'buy'
            addressCvsStore.cvsStoreData.packageList = data.packageList ? data.packageList : []
            addressCvsStore.cvsStoreData.callbackUrl = router.currentRoute.value.path
            addressCvsStore.cvsStoreData.callbackDate = route.query
            router.push({
                path: "/payment/TW-confirmation",
            });
        }, 200)

    }
    hidePackageGoodSpec()
    hideGoodsSpec()
}
// 套餐 有规格的商品去选规格
const showCombinationSpec = (data, count) => {
    state.choseGoods = data
    state.count = count
    packageGoodSpecVal.value = true
}

// 套餐确定规格
const combinationSpecConfirm = (specCombination) => {
    // 当所选商品规格
    state.specCombination = specCombination
    hideCombinPlanSpec()
}
// 套餐商品关闭
const hidePackageGoodSpec = () => {
    packageGoodSpec.value = false
}
// 套餐选规格关闭
const hideCombinPlanSpec = () => {
    packageGoodSpecVal.value = false
}

// 普通商品 选规格关闭
const hideGoodsSpec = () => {
    goodSpecVal.value = false
}
// 商品介绍 规格详情
const onClickItemTab = () => {
    switch (state.goodsTab) {
        case 'introduce':
            goodsDetails.value.scrollIntoView({ behavior: 'smooth' });
            break;
        case 'specDetail':
            goodsSpecDetail.value.scrollIntoView({ behavior: 'smooth' });
            break;
        case 'returns':
            articleContent.value.scrollIntoView({ behavior: 'smooth' });
            break;
        case 'correlation':
            guessCustomer.value.scrollIntoView({ behavior: 'smooth' });
            break;
    }
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
    setTimeout(() => {
        router.go(0)
    }, 500)
}
const GASend = () => {
    let data = {
        currency: "TWD",
        items: [{
            item_id: state.id,
            item_name: state.goodsData.goodsName,
            price: state.selectSpecPrice.price,
            item_category: state.goodsData.userGoodsClassList.length > 0 ? state.goodsData.userGoodsClassList[0]
                .className : '',
        }]
    }
    sendDataGA('view_item', data)
    let fbData = {
        currency: "TWD",
        content_ids: [state.id],
        content_name: state.goodsData.goodsName,
        content_type: 'product',
        value: state.selectSpecPrice.price,
        content_category: state.goodsData.userGoodsClassList.length > 0 ? state.goodsData.userGoodsClassList[0]
            .className : '',
    }
    sendDataFBPixel('ViewContent', fbData)
}
// FB 微数据标签
const createFBPixelOrg = () => {
    let data = {
        id: state.id,
        goodsData: state.goodsData,
        goodsName: state.goodsData.goodsName,
        fullPath: state.mainGoods.mainImg,
        goodsPrice: state.selectSpecPrice.price,
        stock: state.stock
    }
    createFBPixel(data)

}
/* 视频播放 获取第一帧 */
const canplay = (event)=>{
  setTimeout(() => {
    event.target.pause(); // 暂停播放视频 以此来获取封面
  }, 200);
};
const handlePageHide = () => {
  videoPlayer.value.pause();
};
 
onMounted(() => {
    state.id = route.query.id
    state.goodsChoiceType = route.query.goodsChoiceType
    if (state.goodsChoiceType == 7) {
        getPackageItems()
    } else {
        getGoodsItems()
    }
    getGoodsListBottom()
    getSysInfos()
    window.addEventListener('pagehide', handlePageHide);
    host.value = window.location.href
    let storeInfo = localStorage.getItem('storeInfo')
    if (storeInfo) {
        storeInfo = JSON.parse(storeInfo)
        state.isUserLvlUpgrade = storeInfo.isUserLvlUpgrade
    }
});
onUnmounted(() => {
  window.removeEventListener('pagehide', handlePageHide);
})
</script>
<style lang="scss" scoped>
@import "@/assets/css/group/goodsItem";
@import "@/assets/css/goods/goodsDetail";

:deep(.van-badge--top-right) {
    top: 7px !important;
    right: 5px !important;
}

:deep(.van-tabs__line) {
    width: 92px !important;
    bottom: 14px !important;
}
</style>