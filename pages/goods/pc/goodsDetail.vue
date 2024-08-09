<template>
    <!-- seo -->
    <!-- <SeoHeade :title="state.seoInfo?.title" :description="state.seoInfo?.description"
        :keywords="state.seoInfo?.keywords"></SeoHeade> -->
    <!-- 上部分 -->
    <div style="padding: 35px;" class="bgfff">
        <div class="flex">
            <!-- 右边的其他图片 -->
            <div style="width: 100px;height:596px;margin-right: 24px;">
                <div v-for="banner, index in state.bannerList" :key="index" class="h5-banner-swiper-item"
                    @click.stop="toBannerData(banner)">
                    <video v-if="banner.fullPath.includes('mp4')" class="pc-banner-swiper-img" object-fit="contain"
                        :title="state.goodsData?.goodsName" :src="banner.fullPath"></video>
                    <el-image v-else class="pc-banner-swiper-img" :src="banner.fullPath"
                        :alt="state.goodsData?.goodsName" />
                </div>
            </div>
            <!-- 主图 -->
            <div style="margin-right: 24px;width: 600px;">
                <div style="position: relative">

                    <!-- 视频 -->
                    <video v-if="state.goodsMainImg.includes('mp4')" id="videoContextH5" ref="videoPlayer"
                        class="pc-banner-img" controls show-play-btn show-center-play-btn object-fit="contain"
                        :title="state.goodsData?.goodsName" :src="state.goodsMainImg"></video>
                    <!-- 主图 -->
                    <img v-else class="pc-banner-img" :src="state.goodsMainImg" />
                    <div v-if="state.stock <= 0" class="pc-soldout-mask">
                        <img class="h5-soldOut" src="/img/goods/soldout.png" />
                    </div>
                </div>
                <!-- 组合标签 -->
                
                <div v-if="state.isGroupPrivate == 0" style="height:30px;margin-top: 14px;" class="flex just-between">
                    <!-- !-- 私密购的时候 不展示 -->
                    <!-- 分享 -->
                    <div v-if="state.goodsData?.goodsName"
                        class="flex align-items-center  pc-social-share pc-font14 pointer">
                        <span style="width: 50px;">{{ $t('groupAct.shareText') }}</span>
                        <SocialShare network="line" key="line" :url="host" :title="state.goodsData?.goodsName"
                            :description="state.goodsData?.goodsName">
                            <img src="/img/provider/line.png" style="width:30px;height: 30px;" alt="" />
                        </SocialShare>
                        <span style="width: 10px;"></span>
                        <SocialShare network="facebook" key="facebook" :url="host" :title="state.goodsData?.goodsName"
                            :description="state.goodsData?.goodsName">
                            <img src="/img/provider/facebook.png" style="width:30px;height: 30px; margin-left:10rpx"
                                alt="" />
                        </SocialShare>
                    </div>
                    <div class="flex align-items-center pointer">
                        <!-- 收藏 -->
                        <div class="pc-font14 flex align-items-center" @click="collectAdd">
                            <el-image v-if="state.goodsItems.is_favorite || state.goodsItems.isFavorite"
                                src="/img/icon/xing.png" style="width: 18px;height: 18px;"></el-image>
                            <el-image v-else src="/img/icon/pc-xingxing.png"
                                style="width: 20px;height: 20px;"></el-image>
                            <span style="padding-left: 5px;">
                                {{ state.goodsItems.is_favorite || state.goodsItems.isFavorite ? '已' : '' }}{{
                                    $t('button.favBtn') }}
                            </span>

                        </div>
                    </div>
                </div>
            </div>

            <!-- 商品介绍 -->
            <div style="width: 457px;" class="flex1">
                <Tips v-if="state.goodsChoiceType == 7" :text="$t('packageGoods.packageText')" :position="false"
                    bgColor="#f0ad4e" />
                <!-- 名称 -->
                <div>
                    <!-- slogan -->
                    <div class="slogan pc-font14" style="word-wrap: break-word;margin-bottom: 5px;">
                        {{ state.goodsData?.goodsAdWords }} </div>
                    <div class="flex just-between">
                        <!-- 商品名称 -->
                        <!-- 普通商品名称 团购商品名称 -->
                        <div class="h5-goods-info-name fontW pc-font18">{{ state.goodsData?.goodsName }}</div>
                    </div>

                    <!-- 介绍 -->
                    <div class="pc-font16 pc-goods-service"> {{
                        state.goodsData?.goodsService }} </div>
                </div>
                <div class="on-line"></div>
                <!-- 活动 -->
                <div style="padding: 10px 0 24px 0;" class="pointer"
                    v-if="state.transport?.freePostageStatus || state.actType">
                    <!-- 配送 活动  -->
                    <div class="pc-goods-act-trans flex align-items-center pc-font16"
                        v-if="state.transport?.freePostageStatus">
                        <el-tag color="#BEE3F8" style="color: black" size="large" class="act-tips  pc-font16">{{
                            $t('goodsDetail.delivery')
                            }}</el-tag>
                        {{ $t('goodsDetail.orderEnough') + Math.ceil(state.transport?.freePostage) +
                            $t('goodsDetail.freeDelivery') }}
                    </div>
                    <!-- 限购 -->
                    <div v-if="state.actType == 'goodlimit'"
                        class="pc-goods-act-trans flex align-items-center pc-font16">
                        <el-tag color="#E9D8FD" style="color: black" size="large" class="act-tips pc-font16">{{
                            $t('goodsDetail.limitBuy')
                            }}</el-tag>
                        <span class="slogan pc-font16" v-if="state.advInfo?.limit_count > 0">
                            {{ $t('goodsDetail.goodsLimit') }}
                            {{ state.advInfo?.limit_count }}</span>
                    </div>

                    <!-- 满额赠  -->
                    <div class="pc-goods-act-trans flex align-items-center pc-font16"
                        v-if="state.actType == 'buygiftGoods'">
                        <el-tag color="#E9D8FD" style="color: black" size="large" class="act-tips pc-font16">{{
                            $t('goodsDetail.enoughGive')
                            }}</el-tag>
                        <span class="slogan pc-font16"> {{ $t('goodsDetail.enoughGive') + '-->' +
                            $t('goodsDetail.getMore')
                            }}</span>
                    </div>

                    <!-- 满额减  -->
                    <div @click="toViewJump('erGoods')" class="pc-goods-act-trans flex align-items-center pc-font16"
                        v-if="state.actType == 'erGoods'">
                        <el-tag color="#E9D8FD" style="color: black" size="large" class="act-tips pc-font16">{{
                            $t('goodsDetail.enoughReduce') }}</el-tag>
                        <span class="slogan pc-font16" v-if="state.goodsChoiceType == 7"> {{
                            state.advInfo?.title + '-->' + $t('goodsDetail.getMore') }}</span>
                        <span class="slogan pc-font16" v-else> {{ state.advInfo?.ertitle + '-->' +
                            $t('goodsDetail.getMore')
                            }}</span>
                    </div>
                    <!-- 团购 -->
                    <div @click="toViewJump('groupGoods')" class="pc-goods-act-trans flex align-items-center pc-font16"
                        v-if="state.actType == 'group'">
                        <el-tag color="#E9D8FD" style="color: black" size="large" class="act-tips pc-font16">{{
                            $t('goodsDetail.groupGoods')
                            }}</el-tag>
                        <span class="slogan pc-font16">{{ $t('goodsDetail.groupPromotion') + '-->' +
                            $t('goodsDetail.checkNow') }}</span>
                    </div>

                    <!-- 折扣 -->
                    <div @click="toViewJump('discount')" class="pc-goods-act-trans flex align-items-center pc-font16"
                        v-if="state.actType == 'discountGoods'">
                        <el-tag color="#E9D8FD" style="color: black" size="large" class="act-tips pc-font16">{{
                            $t('goodsDetail.discountGoods') }}</el-tag>
                        <span class="slogan pc-font16" v-if="state.goodsChoiceType == 7"> {{ state.advInfo?.title
                            + '-->' + $t('goodsDetail.checkNow') }}</span>
                        <span class="slogan pc-font16" v-else> {{ state.advInfo?.multiTitle + '-->' +
                            $t('goodsDetail.checkNow') }}</span>
                    </div>
                </div>

                <!--普通商品 规格 -->
                <div v-if="state.specList.length > 0" class="spec-scroll">
                    <div  v-for="(item, index1) in state.specList" :key="index1">
                        <div class="flex align-items-center goods-spec-top-tips goods-spec-cg-title fontW "
                            :class="[layout == 'pc' ? '' : 'font14']">
                            {{ item.name }}
                            <svg-icon name="caret-right" size="18" />
                        </div>
                        <div class=" flex  flex-wrap">
                            <span
                                class="package-item-content-spec  pc-spec-item pointer common-goods-spec-val "
                                v-for="(item_value, index2) in item.properties" :key="index2"
                                @click="skuClickSpec(item_value, index1, index2)" :class="{
                                    'actived-spec-val': state.subIndex[index1] == index2,
                                    'font14': layout !== 'pc',
                                    'justify-content-center': item_value.value.length < 6
                                }">
                                {{ item_value.value }}
                            </span>
                        </div>
                    </div>
                </div>

                <!-- 套餐 子商品 -->
                <!-- 子商品 -->
                <div v-if="state.packGoodsDtoSpecList.length > 0" class="packGoods-scroll">
                    <div v-for="goods, index in state.packGoodsDtoSpecList" :key="goods.id" class="package-goods-item">
                        <div class="flex">
                            <img :src="goods.img" class="package-goods-main-img-child package-goods-img">
                            <div class="flex1">
                                <!-- 名称 -->
                                <div :class="layout !== 'pc' ? 'font14' : 'package-goods-name'">{{ goods.goodsName
                                    }}</div>
                                <div v-if="goods.inventoryType == 'spec'">
                                    <!-- 规格 -->
                                    <div v-for="spec in JSON.parse(goods.goodsInventoryDetail)" :key="spec.id">
                                        <div v-if="spec.isShow && spec.isShow == true"
                                            class="flex align-items-center package-goods-spec-content">
                                            <div class="package-goods-spec-val flex align-items-center "
                                                :class="layout !== 'pc' ? 'font12' : ''"
                                                v-for="(item_value, index2) in spec.spData" :key="index2">
                                                <span class="item_value_name"
                                                    :style="spec.spData.length > 1 ? 'max-width: 70px' : 'max-width: 90px'">{{
                                                        item_value.value }}</span>
                                                <div v-if="index2 < spec.spData.length - 1">+</div>
                                            </div>
                                            <!-- 数量 -->
                                            <div class="combinPlan-goods-choseCount">
                                                x{{ spec.choseCount }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- 全局 -->
                                <div v-else>
                                    <!-- 规格 -->
                                    <div v-for="(spec, index3) in JSON.parse(goods.goodsInventoryDetail)" :key="spec.id"
                                        class="flex align-items-center package-goods-spec-content">
                                        <div class="package-goods-spec-val flex align-items-center"
                                            v-for="(item_value, index2) in spec.spData" :key="index2">
                                            {{ item_value.value }}
                                        </div>
                                        <div class="combinPlan-goods-choseCount"
                                            v-if="index3 < JSON.parse(goods.goodsInventoryDetail).length - 1">
                                            -
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="goods-spec-top-tips">x
                                {{ goods.inventoryType == 'spec' ? goods.count : goods.count * state.count >
                                    goods.goodsInventory ?
                                    goods.goodsInventory : goods.count * state.count }}
                            </div>
                        </div>
                        <!-- 選擇規格 -->
                        <div class="flex justify-content-end pointer " v-if="goods.inventoryType == 'spec'">
                            <span class="chose-spec-text" :class="layout !== 'pc' ? 'font12' : ''"
                                @click="showCombinationSpec(goods, index)">
                                {{ $t('packageGoods.spec') }}
                                <svg-icon name="fx-right" size="22" />
                            </span>
                        </div>
                        <div class="on-line"></div>
                    </div>
                </div>

                <!-- 数量加加减 -->
                <div class="flex" style="padding: 24px 0 10px 0;">
                    <div class="flex align-items-center goods-spec-top-tips goods-chose-count "
                        :class="[layout == 'pc' ? 'pc-font16 fontW' : 'font14']">
                        {{ $t('extraGoods.chooseGoods') }}{{ $t('groupAct.goodsCount') }}
                        <svg-icon name="caret-right" size="18" />
                    </div>
                    <div class="flex input-number pointer" style="width: 288px;height: 42px;">
                        <div class="input-number-icon reduce-icon flex justify-content-center align-items-center"
                            @click="addCountLess('less')">
                            <svg-icon name="reduce" size="20" />
                        </div>
                        <div class="flex1 flex justify-content-center input-number-icon align-items-center">{{
                            state.count }}</div>
                        <div class="input-number-icon add-icon flex justify-content-center align-items-center"
                            @click="addCountLess('add')">
                            <svg-icon name="add" size="20" />
                        </div>
                    </div>
                </div>

                <div class="on-line"></div>
                <!-- 价格/按钮 -->
                <div>
                    <!-- 价格 -->
                    <div class="flex align-items-center just-between">
                        <div class="flex align-items-center">
                            <!-- 首购 -->
                            <memberTips v-if="state.goodsData?.discountType"
                                :discountType="state.goodsData?.discountType">
                            </memberTips>
                            <!-- 套餐 普通商品  storePrice！== rebatePrice -->
                            <memberTips
                                v-if="((state.goodsData?.isAllStore && state.goodsData?.isAllStore == 1) || state.actType == 'member' || state.memberFullSiteActivation == true) && state.goodsData?.storePrice !== state.goodsData?.rebatePrice">
                            </memberTips>

                            <div class="price h5-goods-price pc-font24"> {{ $t('moneyUnit') }}{{
                                state.selectSpecPrice.price
                                * state.count }}
                            </div>

                            <!-- default 价格 -->
                            <div class="default-text h5-goods-default-price on-line-text mright5 
                            pc-default-price-line-height 
                            pc-font14" v-if="state.selectSpecPrice.price !== state.selectSpecPrice.originPrice">
                                <!-- 原价 -->
                                {{ $t('groupAct.originalPrice') }}{{ $t('moneyUnit') }} {{
                                    state.selectSpecPrice.originPrice
                                }}
                            </div>
                            <!-- 免运  -->
                            <Tips v-if="state.goodsData?.goodsTransfee == 1" :text="$t('home.transfee')"
                                :position="false" bgColor="red" />
                        </div>
                        <!--库存  -->
                        <div class="package-goods-stock pc-font14">
                            {{ $t('packageGoods.stock') }}:
                            {{ state.selectSpecPrice.count }}
                        </div>
                    </div>
                    <!-- 如何享有會員價 -->
                    <div v-if="state.isUserLvlUpgrade == 1"
                        class="h5-member-price-question pc-font12 flex  align-items-center justify-content-end pointer"
                        @click="toViewJump('membership')">
                        <van-image width="14px" height="14px" src="/img/icon/question.png" />
                        {{ $t('goodsDetail.getMemberPrice') }}
                    </div>
                    <!-- 按钮 -->
                    <!-- 购买按钮 当count>0 displayAddBuy 未true 展示 加入购物车 立即购买 是商品 详情-->
                    <div v-if="state.goodsData?.goodsStatus !== 1">
                        <div v-if="state.selectSpecPrice.count > 0"
                            class="flex just-between align-items-center add-buy-box-bottom pointer">
                            <!-- 加入购物车 -->
                            <div class="add-cart  pc-add-buy-btn flex1 flex justify-content-center"
                                @click="addCartBuyBtn('addCart')">
                                {{$t('button.addCart') }}
                            </div>
                            <!-- 立即购买 -->
                            <div class="buy  pc-add-buy-btn flex1 flex justify-content-center"
                                @click="addCartBuyBtn('addBuy')">
                                {{ $t('button.addBuy') }}</div>
                            <div style="width: 10px;"></div>
                            
                        </div>
                        <!-- 到货提醒 不是团购时候 -->
                        <div v-else-if="state.selectSpecPrice.count == 0"
                            class="flex just-between align-items-center add-buy-box-bottom pointer" @click="arriveMsg">
                            <div class="add-cart  pc-add-buy-btn flex1 flex justify-content-center">{{
                                $t('button.arriveMsg') }}</div>
                        </div>
                        <!-- 售完 -->
                        <!-- <div v-else class="flex just-between align-items-center add-buy-box-bottom pointer">
                            <div class="activity-end pc-add-buy-btn flex1 flex justify-content-center">{{
                                $t('button.stockEmpty') }}</div>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- 下部分 -->
    <div style="padding: 24px 0;" class="bgfff flex flex-center" v-if="state.extraGoods.length > 0">
        <div style="width: 1204px;">
            <h2 class="h5-guess-customer-title fontW flex align-items-center">
                <!-- 加价够商品 -->{{ $t('extraGoods.extraGoodsList') }}
                <img src="/img/icon/path.png" style="margin-left: 5px;" />
            </h2>
            <extraGoods :goodsList="state.extraGoods" :width="state.width"></extraGoods>
        </div>
    </div>
    <!-- 中间部分 -->
    <div style="margin: 20px 0" class="bgfff flex flex-center">
        <div style="width: 1209px;padding:23px 0 45px 0">
            <el-tabs stretch v-model="state.goodsTab" @tab-click="onClickItemTab">
                <!-- 商品介绍 -->
                <el-tab-pane :label="$t('goodsDetail.goodsIntro')" name="introduce"></el-tab-pane>
                <!-- 商品规格 -->
                <el-tab-pane :label="$t('goodsDetail.goodsSpec')" name="specDetail"></el-tab-pane>
                <!-- 退货换须知 -->
                <el-tab-pane :label="$t('goodsDetail.returnInfo')" name="returns"></el-tab-pane>
                <!-- 相关产品 -->
                <el-tab-pane :label="$t('goodsDetail.relateGoods')" name="correlation"></el-tab-pane>
            </el-tabs>
            <!-- 商品介绍  -->
            <div ref="goodsDetails" class="flex align-items-center  goods-title-tips fontW pc-font20"
                style="padding: 16px 0 0px 0;">
                <span class="limited-preferential-left-border goods-des-left-border"
                    style="background-color:#00c2c1;"></span>
                {{ $t('goodsDetail.goodsIntro') }}
            </div>
            <!-- 商品介绍 -->
            <div style="word-wrap: break-word;" v-html="state.goodsData?.goodsDetails" class="pc-font16"></div>

            <!-- 规格详情  -->
            <div ref="goodsSpecDetail" class="flex align-items-center  goods-title-tips mtop5 fontW pc-font20"
                style="padding: 40px 0 16px 0;">
                <span class="limited-preferential-left-border goods-des-left-border"
                    style="background-color:#00c2c1;"></span>
                {{ $t('goodsDetail.goodsSpec') }}
            </div>
            <!-- 规格详情 -->
            <div style="word-wrap: break-word;" v-html="state.goodsData?.goodsSpecDetail" class="pc-font16"></div>

            <!-- 退換貨須知  -->
            <div ref="articleContent" class="flex align-items-center  goods-title-tips mtop5 fontW pc-font20"
                style="padding: 40px 0 16px 0;">
                <span class="limited-preferential-left-border goods-des-left-border"
                    style="background-color:#00c2c1;"></span>
                {{ $t('goodsDetail.returnInfo') }}
            </div>
            <!-- 退換貨須知 -->
            <div v-html="state.returnNotice?.articleContent" class="pc-font16"></div>
        </div>
    </div>
    <!-- 下部分 -->
    <div ref="guessCustomer" style="padding: 24px 0; margin-bottom:20px " class="bgfff flex flex-center">
        <div style="width: 1204px;" v-if="state.guessCustomer.length > 0 && state.isGroupPrivate == 0">
            <h2 class="h5-guess-customer-title fontW flex align-items-center">
                {{ $t('goodsDetail.relateGoods') }}
                <img src="/img/icon/path.png" style="margin-left: 5px;" />
            </h2>
            <Goods v-if="state.isGroupPrivate == 0" @addBuyGoods="toGoodsInfo" :goodsList="state.guessCustomer"
                :width="state.width"></Goods>
        </div>
    </div>
    <!-- 套餐选规格 -->
    <el-dialog v-model="packageGoodSpecVal" v-if="packageGoodSpecVal" :close-on-click-modal="false" :show-close="false"
        width="480">
        <!-- 子商品 -->
        <packGoodsSpec v-if="packageGoodSpecVal" :choseGoods="state.choseGoods" :isCombination="true"
            :count="state.count" @combinationSpecConfirm="combinationSpecConfirm"
            @hideCombinPlanSpec="hideCombinPlanSpec">
        </packGoodsSpec>
    </el-dialog>
</template>
<script setup>
import SeoHeade from "@/components/SeoHead/index.vue"
import extraGoods from "@/components/Goods/extraGoods.vue"
import Goods from "@/components/Home/goodsPc.vue"
import SocialShare from "@/components/SocialShare/index.vue"
import packGoodsSpec from "@/components/Goods/packGoodsSpec.vue";
import goodsSpec from "@/components/Goods/goodsSpec.vue";
import { ref, onMounted, reactive } from "vue";
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
    count: 1,//商品选中数量
    subIndex: [], //选的规格 下标
    selectArr: [],//选的规格val
    ids: [], //选的规格id 
    selectId: [],

    token: getToken(),
    storeId: getStoreId(),
    guessCustomer: [],
    width: '226px',
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
    maxVlaue: 0,
    stock: 1,
    bannerList: [],
    specImg: null,
    goodsTab: 'introduce',
    returnNotice: {},
    advInfo: {},//活动数据

    autoplay: false,
    addCartBuyType: '',//addCart addBuy

    specCallback: -1, //选规格的套餐子商品下标
    packGoodsDtoSpecList: [],
    choseGoods: {}, //当前选中的套餐商品
    specCombination: [],  //选中子商品的规格
    extraGoods: [], //加购商品


    memberFullSiteActivation: false,//全站会员开启
    isGroupPrivate: 0,
    seoInfo: {},
    isUserLvlUpgrade: 0
});
// let cartCount = useState("cartCount")

let layout = useState("layout");
// const packageGoodSpec = ref(false);
const packageGoodSpecVal = ref(false);
// const goodSpecVal = ref(false);

const goodsDetails = ref(null);  //商品介绍
const goodsSpecDetail = ref(null);  //商品规格
const articleContent = ref(null);  //退货须知
const guessCustomer = ref(null); //猜你喜欢
const videoPlayer = ref(null) //视频

let channelStore = useChannelStore()
let groupStore = useGroupStore()
state.isGroupPrivate = groupStore.isPrivate

// 到货通知
const arriveMsg = () => {
    let data = {
        id: state.id,
        specIds: state.goodsChoiceType !== 7 && state.selectId.length > 1 ? state.selectId.join('_') : state.selectId.toString(),
        storeId: state.storeId,
    }
    goodsArriveMsg(data).then(response => {
        if (response.code == 200) {
            ElMessage(t('message.arriveTips'))
        } else if (response.code == 44018) {
            ElMessage(t('message.needBindingEmail'))
            setTimeout(() => {
                router.push({
                    path: "/user/user/setting/edit-user-info",
                    query: {
                        type: 'email',
                        data: '',
                    }
                });
            }, 2000)
        } else {
            ElMessage(response.data)
        }
    })
}
// 选中规格 
const skuClickSpec = (value, index1, index2) => {
    if (value) {
        if (state.selectArr[index1] != value.value) {
            state.selectArr[index1] = value.value
            state.subIndex[index1] = index2
            state.ids[index1] = value.id
        } else {
            state.selectArr[index1] = ''
            state.subIndex[index1] = -1
            state.ids[index1] = ''
            state.selectId = []
        }
        // console.log('state.selectArr', state.selectArr)
        // console.log('state.subIndex', state.subIndex)
        // console.log('state.ids', state.ids)
        if (state.subIndex.length == state.specList.length && !state.subIndex.find(item => item < 0)) {
            handleSpec()
        }
    }
}
// 选规格对比
const handleSpec = () => {
    state.selectId = state.ids.filter(function (s) { // 选中id 
        return s
    })
    let newSelectId = state.selectId.map(v => v).sort().toString()  //选中的规格id排序
    let newSortId = ''  //库存的中的id
    // 有库存的情况下
    if (state.goodsInventoryDetail.length > 0) {
        // console.log('33333',newSelectId)
        // console.log('state.goodsInventoryDetail',state.goodsInventoryDetail)
        let someSpecIdTarget = state.goodsInventoryDetail.find(item => item.id == newSelectId)
        // console.log('someSpecIdTarget',someSpecIdTarget)

        if (someSpecIdTarget) {
            // 其他商品价格 一般商品
            state.selectSpecPrice.count = someSpecIdTarget.count
            state.selectSpecPrice.price = someSpecIdTarget.price
            // 当库存大于0时 及时更新 选购数量
            if (state.selectSpecPrice.count > 0) {
                state.count = state.count > 0 && state.count <= state.selectSpecPrice.count ? state.count : 1
            } else {
                state.count = 0
            }
            // 区分团购还是其他
            if (state.actType == 'group') {
                state.selectSpecPrice.price = someSpecIdTarget.discountPrice  //优惠的价格
                state.selectSpecPrice.originPrice = someSpecIdTarget.price   //原价
                state.selectSpecPrice.count = someSpecIdTarget.groupCount
                // console.log(state.selectSpecPrice.count)
                // console.log(state.selectSpecPrice.price)
            }
            // 会员价格
            else if (state.actType == 'member') {
                state.selectSpecPrice.price = someSpecIdTarget.rebatePrice  //优惠的价格
                state.selectSpecPrice.originPrice = someSpecIdTarget.price   //原价
            }
            // 组合销售
            else if (state.actType == 'combin') {

            }
            else if (someSpecIdTarget.rebatePrice && someSpecIdTarget.rebatePrice > 0) {
                state.selectSpecPrice.price = someSpecIdTarget.rebatePrice  //优惠的价格
                state.selectSpecPrice.originPrice = someSpecIdTarget.price   //原价
            }
        } else {
            state.selectSpecPrice.count = 0
        }
    } else {
        state.selectSpecPrice.count = 0
    }
}
// 加减数量
const addCountLess = (type) => {
    if (type == 'add') {
        if (state.count >= state.selectSpecPrice.count) {
            state.count = state.selectSpecPrice.count
        }
        if (state.count < state.selectSpecPrice.count) {
            state.count++
        }
    } else {
        if (state.count > 1) {
            state.count--
        }
        else if (state.count <= 1) {
            state.count = 1
        }
    }
}


let checkGoodsData = () => {
    let selectId = JSON.parse(JSON.stringify(state.selectId))
    // 先验证商品
    let data = {
        id: state.id,
        storeId: state.storeId,
        inventoryType: state.goodsData?.inventoryType,
        goodsTransfee: state.goodsData?.goodsTransfee,
        transportId: state.goodsData?.transportId,
        price: state.selectSpecPrice?.price,// 这里区分是 全局还是 规格
        inventory: state.count, // 这里区分是 全局还是 规格
    }
    // 套餐
    if (state.goodsChoiceType == 7) {
        let packageList = state.packGoodsDtoSpecList.map(item => {
            return {
                count: item.count,
                goodsInventory: item.goodsInventory,
                goodsInventoryDetail: item.goodsInventoryDetail,
                id: item.id,
                inventoryType: item.inventoryType,
            }
        })
        data.packageList = JSON.stringify(packageList)
    } else {
        let priceMap = {
            id: selectId.join('_'),
            count: parseInt(state.selectSpecPrice.count),
            price: state.selectSpecPrice.price
        }
        let specMap = {
            id: selectId.join('_'),
            count: parseInt(state.count),
            price: state.selectSpecPrice.price
        }
        if (state.goodsData.inventoryType == 'spec') {
            data.price = JSON.stringify(priceMap)
            data.inventory = JSON.stringify(specMap)
        }
    }
    checkGoods(data).then(response => {
        if (response.code == 200) {
            // 验证完毕
            if (state.selectSpecPrice.count > 0 && state.count > 0) {
                // 加入购物车
                if (state.addCartBuyType == 'addCart') {
                    // 套餐加入购物车
                    if (state.goodsChoiceType == 7) {
                        let packageList = state.packGoodsDtoSpecList.map(item => {
                            return {
                                goodsId: item.id,
                                packageCount: item.count,
                                count: item.count * state.count,
                                spec: item.inventoryType == 'spec' ? JSON.parse(item.goodsInventoryDetail).filter(isShow =>
                                    isShow.isShow == true).map(spec => {
                                        return {
                                            id: spec.id,
                                            count: spec.choseCount
                                        }
                                    }) : undefined
                            }
                        })
                        addCartConfirm(packageList)
                    } else {
                        addCartConfirm()
                    }

                }
                //  立即购买
                if (state.addCartBuyType == 'addBuy') {
                    if (state.goodsChoiceType == 7) {
                        let packageList = state.packGoodsDtoSpecList.map(item => {
                            return {
                                goodsId: item.id,
                                packageCount: item.count,
                                count: item.count * state.count,
                                spec: item.inventoryType == 'spec' ? JSON.parse(item.goodsInventoryDetail).filter(isShow =>
                                    isShow.isShow == true).map(spec => {
                                        return {
                                            id: spec.id,
                                            count: spec.choseCount
                                        }
                                    }) : undefined
                            }
                        })
                        let data = {
                            id: state.id,
                            count: state.count,
                            packageList: packageList
                        }
                        addCartBuy(data)
                    } else {
                        let data = {
                            id: state.id,
                            count: state.count,
                            gsp: state.selectId.toString()
                        }
                        addCartBuy(data)
                    }
                }
            }
        } else {
            // console.log('response====',response.data)
            if (layout.value == 'pc') {
                ElMessage(response.data)
            } else {
                showFailToast(response.data)
            }
            // 商品价格运费变动时候重新获取数据 获取套餐商品详情 
            setTimeout(() => {
                if (state.goodsChoiceType == 7) {
                    getPackageItems()
                } else {
                    getGoodsItems()
                }

            }, 2000)

        }
    })
}
// 确认加入购物车
let addCartConfirm = (packageList) => {
    showLoadingToast({
        duration: 0,
        forbidClick: true,
        message: t('message.saveLoading'),
    });
    let channel=channelStore?.channelObj
    let dataAdd = {
        id: state.id,
        gsp: state.goodsChoiceType !== 7 && state.selectId.length > 0 ? state.selectId.toString() : null,
        count: state.count,
        buyType: '',
        combinId: '', //组合配件
        combinVersion: '', //组合配件
        packageList: state.goodsChoiceType == 7 ? packageList : null,
        source: channel? channel.source : null,
		medium: channel ? channel.medium : null,
		campaign: channel ? channel.campaign : null,
    };
    addGoodsCart(dataAdd).then(response => {
        closeToast()
        if (response.code == 200) {
            const store = useTempStore()
            store.getCountCart()
            GAAddCart()
            ElMessage({
                message: t('message.addCartSuccess'),
                type: 'success',
            })
        } else {

            ElMessage(t('message.addCartError'))

        }
    })
}

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
            allDataGoodsInfo()
            closeToast();
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
                    state.advInfo.inventoryType = state.advInfo.inventory_type
                    state.advInfo.actGoodsInventoryDetail = state.advInfo.inventory_detail
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
            allDataGoodsInfo()
            closeToast()

        } else {
            closeToast()
        }
    })
}

const allDataGoodsInfo = () => {
    let seoInfo = {
        title: state.goodsData.goodsName,
        keywords: state.goodsData.seoKeywords,
        description: state.goodsData.seoDescription,
        ogImage:state.goodsData?.goodsMainPhoto?.fullPath
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
    // 团购取价格  这边只区分团购 商品 以及其他商品的 stock 取值 price 取值
    if (state.actType == 'group') {
        // 套餐的商品名称 跟一般 商品名称取的不一样
        let goodsName = route.query.goodsChoiceType == 7 ? state.advInfo?.actGoodsName : state.advInfo?.gg_name
        state.goodsData.goodsName = goodsName

        if (state.advInfo?.inventoryType == 'all') {
            // 刚进入时候的商品价格   套餐取的价格不一样
            let price = route.query.goodsChoiceType == 7 ? state.advInfo?.actGoodsPrice : state.advInfo?.gg_price
            state.selectSpecPrice.price = price
            //店铺价格 
            state.selectSpecPrice.originPrice = state.goodsData.goodsPrice

            // 套餐取的数量不一样
            let count = route.query.goodsChoiceType == 7 ? state.advInfo?.actGoodsInventory : state.advInfo?.gg_count
            state.selectSpecPrice.count = count
            state.stock = state.selectSpecPrice.count

        } else if (state.advInfo.inventoryType == 'spec' && state.advInfo.actGoodsInventoryDetail) {
            // 商品库存
            let inventory = JSON.parse(state.advInfo.actGoodsInventoryDetail)
            //提前做 id 排序 然后选规格时候就不用在排了直接find 
            inventory.forEach(item => {
                if (item.spData.length > 1) {
                    item.id = item.id.split('_').sort().toString() //提前做 id 排序
                }
            })
            state.goodsInventoryDetail = inventory
            // 刚进入时候的商品价格  取gg_price 规格商品后台做了价格排序 可以直接取
            state.selectSpecPrice.price = state.advInfo.gg_price
            //店铺价格 
            state.selectSpecPrice.originPrice = state.goodsData.goodsPrice

            state.selectSpecPrice.count = state.goodsInventoryDetail.reduce((prev, curr) => {
                return parseInt(prev) + parseInt(curr.groupCount)
            }, 0)
            state.stock = state.selectSpecPrice.count
        }
    } else {
        // 会员   // 会员  首购价格
        if (state.memberFullSiteActivation || state.actType == 'member' || (state.goodsData?.isAllStore && state.goodsData?.isAllStore == 1) || (state.goodsData?.discountType && state.goodsData?.discountType !== '')) {
            // 刚进入时候的商品价格 
            state.selectSpecPrice.price = state.goodsData?.rebatePrice
            //店铺价格 
            state.selectSpecPrice.originPrice = state.goodsData?.storePrice

        } else {
            state.selectSpecPrice.price = state.goodsData?.storePrice
            state.selectSpecPrice.originPrice = state.goodsData?.goodsPrice
        }
        // 规格商品
        if (state.goodsData?.inventoryType == 'all') {
            state.selectSpecPrice.count = state.goodsData?.goodsInventory
            // state.maxVlaue = state.selectSpecPrice.count
            state.stock = state.selectSpecPrice.count
        } else {
            // 商品库存
            let inventory = JSON.parse(state.goodsData?.goodsInventoryDetail)
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
        if (layout.value == 'pc') {
            // 视频 mobile
            if (state.goodsData.goodsPcVideoPhoto !== null && state.goodsData
                .goodsPcVideoPhoto !==
                undefined && state.goodsData.goodsPcVideoPhoto != '') {
                state.bannerList.push(state.goodsData.goodsPcVideoPhoto)
            }
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
    }

    // 其他图片
    if (state.goodsData.goodsPhotos.length > 0) {
        state.bannerList = [...state.bannerList, ...state.goodsData.goodsPhotos]
        state.specImg = !state.specImg ? state.goodsData.goodsPhotos[0].fullPath : state.specImg
    }
    if (state.bannerList.length > 5) {
        state.bannerList = state.bannerList.splice(0, 5)
    }

    state.goodsMainImg = state.specImg

    GASend()
    createFBPixelOrg()
    closeToast()
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
    router.go(-1)
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
    } else if (type == 'erGoods') {  //满减
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

    // 先检验是否选了商品
    if (state.selectSpecPrice.count <= 0) {
        ElMessage(t('message.noInventoryGoods'))
        return
    }
    // 库存是否超出
    if (state.count > state.selectSpecPrice.count) {
        ElMessage(t('message.goodsCountExceeds'))
        return
    }
    // 套餐
    if (state.goodsChoiceType == 7) {
        let checkGoodsFind = checkGoodsCombinPlanCount()
        if (!checkGoodsFind) {
            ElMessage(t('message.specError'))
        } else {
            checkGoodsData()
        }

    } else {
        // 一般商品
        // type : addCart夹入购物车 addBuy 立即购买
        // 规格数量不相等
        if (state.specList.length > 0 && state.selectId.length !== state.specList.length) {
            ElMessage(t('message.selectGoodsSpec'))
            return
        }
        checkGoodsData()
    }
}

/*
点击完成加购物车或者 立即购买时 
校验用户是否选中子商品的规格的数量是不是跟套餐数量相等
*/
let checkGoodsCombinPlanCount = () => {
    let specList = state.packGoodsDtoSpecList.filter(item => item.inventoryType == 'spec')
    let specShow = false
    if (specList.length > 0) {
        let specCountError = specList.find(item => !item.choseCount || Number(item.choseCount) !== Number(state
            .count * item.count))
        if (!specCountError) {
            specShow = true
        }
    } else {
        specShow = true
    }
    return specShow
}
// 入购物车或者立即购买
const addCartBuy = (data) => {
    // type :addCart 加入购物车  addBuy 立即购买
    // data 套餐 立即购买的参数 { id:12, count:1 packageList:[]}   套餐数据存在缓存中  
    //  data 普通商品  立即购买的参数 { id:12, gsp:23, count:1}   
    // 立即购买
    if (state.addCartBuyType == 'addBuy') {
        const addressCvsStore = useCvsStore()
        // 普通商品需要清除数据 套餐商品是选了套餐数据不需要清除
        // if (state.goodsChoiceType !== 7) {
        clearStorageOrder()
        // }
        // 数据存下来之后跳转下单页面直接获取数据
        addressCvsStore.cvsStoreData.goodsId = data.id
        addressCvsStore.cvsStoreData.count = data.count
        addressCvsStore.cvsStoreData.gsp = data.gsp ? data.gsp : null
        addressCvsStore.cvsStoreData.type = 'buy'
        addressCvsStore.cvsStoreData.packageList = data.packageList ? data.packageList : []
        router.push({
            path: "/payment/TW-confirmation",
        });
    }
}
// 套餐 有规格的商品去选规格
const showCombinationSpec = (data, index) => {
    state.choseGoods = data
    state.specCallback = index
    packageGoodSpecVal.value = true
}

// 套餐确定规格
const combinationSpecConfirm = (specCombination) => {
    // 当所选商品规格
    // state.specCombination = specCombination
    console.log(specCombination)
    console.log(state.specCallback)
    state.packGoodsDtoSpecList[state.specCallback].goodsInventoryDetail = JSON.stringify(specCombination)
    state.packGoodsDtoSpecList[state.specCallback].choseCount = specCombination.filter(item => item
        .isShow == true || item.isShow == 'true').reduce((prev, current) => {
            return prev + Number(current.choseCount)
        }, 0)

    hideCombinPlanSpec()
}
// 套餐商品关闭
// const hidePackageGoodSpec = () => {
//     packageGoodSpec.value = false
// }
// 套餐选规格关闭
const hideCombinPlanSpec = () => {
    packageGoodSpecVal.value = false
}

// 普通商品 选规格关闭
// const hideGoodsSpec = () => {
//     goodSpecVal.value = false
// }
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
// ga4 fb 收录
const GAAddCart = () => {
    let data = {
        currency: "TWD",
        items: [{
            item_id: state.id,
            item_name: state.goodsData?.goodsName,
            price: state.selectSpecPrice.price,
            spec_id: state.selectId.length > 0 ? state.selectId.toString() : '',
            spec_name: state.selectArr ? state.selectArr.join(',') : '',
            quantity: state.count,
            item_category: ''
        }]
    }
    sendDataGA('add_to_cart', data)

    let fbData = {
        currency: "TWD",
        content_ids: [state.id],
        content_name: state.goodsData.goodsName,
        content_type: 'product',
        value: state.selectSpecPrice.price,
        content_category: '',
        contents: [{
            id: state.id,
            content_name: state.goodsData.goodsName,
            price: state.selectSpecPrice.price,
            spec_id: state.selectId ? state.selectId.toString() : '',
            spec_name: state.selectArr ? state.selectArr.join(',') : '',
            quantity: state.count,
            content_category: ''
        }]
    }
    sendDataFBPixel('AddToCart', fbData)
}
const GASend = () => {
    let data = {
        currency: "TWD",
        items: [{
            item_id: state.id,
            item_name: state.goodsData?.goodsName,
            price: state.selectSpecPrice.price,
            item_category: state.goodsData.userGoodsClassList.length > 0 ? state.goodsData?.userGoodsClassList[0]
                .className : '',
        }]
    }
    sendDataGA('view_item', data)
    let fbData = {
        currency: "TWD",
        content_ids: [state.id],
        content_name: state.goodsData?.goodsName,
        content_type: 'product',
        value: state.selectSpecPrice.price,
        content_category: state.goodsData?.userGoodsClassList.length > 0 ? state.goodsData?.userGoodsClassList[0]
            .className : '',
    }
    sendDataFBPixel('ViewContent', fbData)
}
// FB 微数据标签
const createFBPixelOrg = () => {
    let data = {
        id: state.id,
        goodsData: state.goodsData,
        goodsName: state.goodsData?.goodsName,
        fullPath: state.goodsMainImg,
        goodsPrice: state.selectSpecPrice.price,
        stock: state.stock
    }
    createFBPixel(data)

}
const handlePageHide = () => {
    videoPlayer.value.pause();
};
//渠道号存储
const getAds=(option)=> {
    let data = {
        url: '',
        type: '',
    }
    if (channelStore.channelData(option)) {
        //1. 先统计landing的
        data.url = '/goods/goods-detail?id=' + state.id
        data.type = 'landing_click'
        channelStore.getChannel(data)
        
        //2. 再统计goods_click的
        data = {}
        data.type = 'goods_click'
        data.goodsId = state.id
        channelStore.getChannel(data)

    }
}
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
    host.value = window.location.href
    window.addEventListener('pagehide', handlePageHide);
    let storeInfo = localStorage.getItem('storeInfo')
    if (storeInfo) {
        storeInfo = JSON.parse(storeInfo)
        state.isUserLvlUpgrade = storeInfo.isUserLvlUpgrade
    }
    getAds(route.query)
});

onUnmounted(() => {
    window.removeEventListener('pagehide', handlePageHide);
})
</script>
<style lang="scss" scoped>
@import "@/assets/css/group/goodsItem";
@import "@/assets/css/goods/goodsDetail";
@import "@/assets/css/goods/packGoodsSpec";
@import "@/assets/css/pc-style.scss";

:deep(.el-tabs__item) {
    align-items: center;
    box-sizing: border-box;
    color: var(--el-text-color-primary);
    display: flex;
    font-size: 16px;
    font-weight: 500;
    height: var(--el-tabs-header-height);
    justify-content: center;
    list-style: none;
    padding: 0 20px;
    position: relative;
}
</style>