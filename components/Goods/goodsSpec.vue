<template>
    <div class="flex just-between" style="margin-bottom: 16px;">
        <div class="flex align-items-center fontW goods-spec-top-tips">
            <span class="limited-preferential-left-border pc-goods-des-left-border "
                style="background-color:#00c2c1;"></span>
            {{ $t('packageGoods.spec') }}
        </div>
        <div class="pointer" @click="hideGoodsSpec">
            &#10005
        </div>
    </div>
    <!-- 商品 -->
    <div class="flex package-goods-main" v-if="props.mainGoods">
        <img :src="props.mainGoods.mainImg" class="package-goods-main-img package-goods-img">
        <div class="flex1 ">
            <!-- 名称 -->
            <div class="package-goods-name fontW">{{ props.mainGoods.goodsName }}</div>
            <!-- 价格-->
            <div class="flex just-between package-goods-main-price align-items-end">
                <div>
                    <div style="line-height: 14px;">
                        <memberTips v-if="props.mainGoods.actType == 'member' 
                        || props.mainGoods.memberFullSiteActivation == true
                         || props.mainGoods.discountType"
                            :discountType="props.mainGoods.discountType"></memberTips>
                    </div>
                    <div class="flex align-items-center ">
                        <div style="margin:0 6px;" :class="[layout == 'pc' ? '' : 'font18']"> {{ $t('moneyUnit') }}{{
                            state.selectSpecPrice.price }}</div>
                        <span class="default-text default-price-online"
                            v-if="state.selectSpecPrice.originPrice !== state.selectSpecPrice.price">
                            {{ $t('groupAct.originalPrice') }}
                            {{ $t('moneyUnit') }}{{ state.selectSpecPrice.originPrice }}
                        </span>
                    </div>

                </div>
                <!-- 库存 -->
                <div class="package-goods-stock">{{ $t('packageGoods.stock') }}:
                    <!-- {{ props.mainGoods.stock }} -->
                    {{ state.selectSpecPrice.count }}
                </div>
            </div>
        </div>
    </div>
    <div class="on-line" v-if="state.specList.length > 0"></div>
    <!-- 规格 -->
    <div v-if="state.specList.length > 0" class="spec-scroll">
        <div v-for="(item, index1) in state.specList" :key="index1">
            <div class="flex align-items-center goods-spec-top-tips goods-spec-cg-title fontW "
                :class="[layout == 'pc' ? '' : 'font14']">
                {{ item.name }}
                <svg-icon name="caret-right" size="18" />
            </div>
            <div class=" flex  flex-wrap">
                <span class="package-item-content-spec  h5-package-item-content-spec  pointer common-goods-spec-val "
                    v-for="(item_value, index2) in item.properties" :key="index2"
                    @click="skuClickSpec(item_value, index1, index2)" :class="{
                        'actived-spec-val': state.subIndex[index1] == index2,
                        'font14': layout !== 'pc',
                        'justify-content-center': item_value.value.length < 6,
                        'pc-spec-item': layout == 'pc',
                    }">
                    {{ item_value.value }}
                </span>
            </div>
        </div>
    </div>

    <div class="on-line"></div>
    <!-- 数量 -->
    <div class="fontW flex align-items-center goods-spec-top-tips goods-chose-count"
        :class="[layout == 'pc' ? '' : 'font14']">
        {{ $t('groupAct.goodsCount') }}
        <svg-icon name="caret-right" size="18" />
    </div>
    <div class="flex input-number pointer">
        <div class="input-number-icon reduce-icon flex justify-content-center align-items-center"
            @click="addCountLess('less')">
            <svg-icon name="reduce" size="20" />
        </div>
        <div class="flex1 flex justify-content-center input-number-icon">{{ state.count }}</div>
        <div class="input-number-icon add-icon flex justify-content-center align-items-center"
            @click="addCountLess('add')">
            <svg-icon name="add" size="20" />
        </div>
    </div>
    <!-- 商品总价 -->
    <div class="goods-amount price fontW">
        {{ $t('groupAct.goodsAmount') }}:{{ $t('moneyUnit') }} {{ state.selectSpecPrice.price * state.count }}
    </div>

    <!-- 购买按钮 当count>0 displayAddBuy 未true 展示 加入购物车 立即购买   mainGoods.toView是商品 详情-->
    <div v-if="state.selectSpecPrice.count > 0 && state.displayAddBuy == true && !props.mainGoods.toView"
        class="flex just-between align-items-center add-buy-box-bottom pointer">
        <div class="add-cart add-cart-buy flex1 flex justify-content-center" @click="addCartBuy('addCart')">{{
            $t('button.addCart') }}</div>
        <div style="width: 50px;"></div>
        <div class="buy add-cart-buy flex1 flex justify-content-center" @click="addCartBuy('addBuy')">{{
            $t('button.addBuy') }}</div>
    </div>

    <!-- 商品详情的 显示的完成-->
    <div v-else-if="state.displayAddBuy == true && props.mainGoods.toView == 'detail' && state.selectSpecPrice.count > 0"
        class="flex just-between align-items-center add-buy-box-bottom pointer"
        @click="addCartBuy(props.mainGoods.addCartBuyType)">
        <div class="add-cart add-cart-buy flex1 flex justify-content-center">
            {{ $t('button.submitEvent') }}
        </div>
    </div>

    <!-- 到货提醒 不是团购时候 -->
    <div v-else-if="state.selectSpecPrice.count == 0  && props.mainGoods.actType !== 'group'"
        class="flex just-between align-items-center add-buy-box-bottom pointer" @click="arriveMsg">
        <div class="add-cart add-cart-buy flex1 flex justify-content-center">{{
            $t('button.arriveMsg') }}</div>
    </div>

    <!-- 售完 -->
    <div v-else class="flex just-between align-items-center add-buy-box-bottom pointer">
        <div class="activity-end add-cart-buy flex1 flex justify-content-center">{{
            $t('button.stockEmpty') }}</div>
    </div>
</template>
<script setup>
import memberTips from "@/components/Member/memberTip.vue";
import {
    onMounted,
    reactive,
    watch
} from "vue";
import { ElMessage, ElLoading } from 'element-plus'
import { showLoadingToast, closeToast, showSuccessToast, showFailToast, showToast } from 'vant';
let { t } = useI18n();
import { checkGoods, goodsArriveMsg } from '@/composables/api/goods';
import { addGoodsCart } from '@/composables/api/user/cart';
import { setStorageData } from '@/composables/utils/dataStorage';
import { sendDataGA, sendDataFBPixel } from '@/composables/utils/GA4';
const router = useRouter()
const route = useRoute()

const props = defineProps({
    selectSpecPrice: {
        type: Object,
        required: true,
        default: {}
    },
    goodsInventoryDetail: {
        type: Array,
        default: []
    },
    specList: {
        type: Array,
        default: []
    },
    mainGoods: {
        type: Object,
        required: true,
        default: {}
    }
})

const state = reactive({
    storeId: getStoreId(),
    count: 1,
    addCartBuyType: null,
    specList: [],
    subIndex: [], //选的规格 下标
    selectArr: [],//选的规格val
    ids: [], //选的规格id 
    selectId: [],
    goodsInventoryDetail: [],
    selectSpecPrice: {
        price: 0,
        originPrice: 0,
        count: 0
    },
    displayAddBuy: false
})
let layout = useState("layout");
let channelStore = useChannelStore()
const emit = defineEmits(["showCombinationSpec", "addCartBuy", "checkGoods", "hideGoodsSpec"]);
const hideGoodsSpec = () => {
    emit("hideGoodsSpec");
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
        // console.log('state.selectArr',state.selectArr)
        // console.log('state.subIndex',state.subIndex)
        // console.log('state.ids',state.ids)
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
            if(state.selectSpecPrice.count > 0){
                state.count = state.count > 0 && state.count<=state.selectSpecPrice.count ? state.count : 1
            }else{
                state.count = 0
            }
            // 区分团购还是其他
            if (props.mainGoods.actType == 'group') {
                state.selectSpecPrice.price = someSpecIdTarget.discountPrice  //优惠的价格
                state.selectSpecPrice.originPrice = someSpecIdTarget.price   //原价
                state.selectSpecPrice.count = someSpecIdTarget.groupCount
                // console.log(state.selectSpecPrice.count)
                // console.log(state.selectSpecPrice.price)
            }
            // 会员价格
            else if (props.mainGoods.actType == 'member') {
                state.selectSpecPrice.price = someSpecIdTarget.rebatePrice  //优惠的价格
                state.selectSpecPrice.originPrice = someSpecIdTarget.price   //原价
            }
            // 组合销售
            else if (props.mainGoods.actType == 'combin') {

            }
            else if(someSpecIdTarget.rebatePrice && someSpecIdTarget.rebatePrice>0){
                state.selectSpecPrice.price = someSpecIdTarget.rebatePrice  //优惠的价格
                state.selectSpecPrice.originPrice = someSpecIdTarget.price   //原价
            }
            state.displayAddBuy = true
        } else {
            state.selectSpecPrice.count = 0
        }
    } else {
        state.selectSpecPrice.count = 0
        state.displayAddBuy = true
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
// 加入购物车 立即购买
const addCartBuy = (type) => {
    // type : addCart夹入购物车 addBuy 立即购买
    // 先检验是否选了商品
    if (state.selectSpecPrice.count <= 0) {
        if (layout.value == 'pc') {
            ElMessage(t('message.noInventoryGoods'))
        } else {
            showToast(t('message.noInventoryGoods'))
        }
        return
    }
    // 规格数量不相等
    if (state.specList.length > 0 && state.selectId.length !== state.specList.length) {
        if (layout.value == 'pc') {
            ElMessage(t('message.selectGoodsSpec'))
        } else {
            showToast(t('message.selectGoodsSpec'))
        }
        return
    }
    // 库存是否超出
    if (state.count > state.selectSpecPrice.count) {
        if (layout.value == 'pc') {
            ElMessage(t('message.goodsCountExceeds'))
        } else {
            showToast(t('message.goodsCountExceeds'))
        }
        return
    }
    state.addCartBuyType = type
    checkGoodsData()
}

let checkGoodsData = () => {
    let selectId = JSON.parse(JSON.stringify(state.selectId))
    // 先验证商品
    let data = {
        id: props.mainGoods.id,
        storeId: state.storeId,
        inventoryType: props.mainGoods.inventoryType,
        goodsTransfee: props.mainGoods.goodsTransfee,
        transportId: props.mainGoods.transportId,
        price: state.selectSpecPrice.price,// 这里区分是 全局还是 规格
        inventory: state.count, // 这里区分是 全局还是 规格
    }
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

    if (props.mainGoods.inventoryType == 'spec') {
        data.price = JSON.stringify(priceMap)
        data.inventory = JSON.stringify(specMap)
    }
    checkGoods(data).then(response => {
        if (response.code == 200) {
            // 验证完毕
            if (state.selectSpecPrice.count > 0 && state.count > 0) {
                // 加入购物车
                if (state.addCartBuyType == 'addCart') {
                    addCartConfirm()
                }
                //  立即购买
                if (state.addCartBuyType == 'addBuy') {
                    let data = {
                        id: props.mainGoods.id,
                        count: state.count,
                        gsp: state.selectId.toString()
                    }
                    emit('addCartBuy', 'addBuy', data)
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
                emit('checkGoods')
            }, 2000)

        }
    })
}

// 确认加入购物车
let addCartConfirm = () => {
    showLoadingToast({
        duration: 0,
        forbidClick: true,
        message: t('message.saveLoading'),
    });
    let channel=channelStore?.channelObj
    let dataAdd = {
        id: props.mainGoods.id,
        gsp: state.selectId.length > 0 ? state.selectId.toString() : null,
        count: state.count,
        buyType: '',
        combinId: '', //组合配件
        combinVersion: '', //组合配件
        packageList: null,
        source: channel? channel.source : null,
		medium: channel ? channel.medium : null,
		campaign: channel ? channel.campaign : null,

    };
    addGoodsCart(dataAdd).then(response => {
        closeToast()
        if (response.code == 200) {
            const store = useTempStore()
            store.getCountCart()
            if (layout.value == 'pc') {
                ElMessage({
                    message: t('message.addCartSuccess'),
                    type: 'success',
                })
            } else {
                showSuccessToast(t('message.addCartSuccess'))
            }
            GAAddCart()
            emit('addCartBuy', 'addCart')
        } else {
            if (layout.value == 'pc') {
                ElMessage(t('message.addCartError'))
            } else {
                showFailToast(t('message.addCartError'))
            }
        }
    })
}
// 到货通知
const arriveMsg = () => {
    let data = {
        id: props.mainGoods.id,
        specIds: state.selectId.length > 1 ? state.selectId.join('_') : state.selectId.toString(),
        storeId: state.storeId,
    }
    goodsArriveMsg(data).then(response => {
        if (response.code == 200) {
            if (layout.value == 'pc') {
                ElMessage(t('message.arriveTips'))
            } else {
                showToast(t('message.arriveTips'))
            }

        } else if (response.code == 44018) {
            if (layout.value == 'pc') {
                ElMessage(t('message.needBindingEmail'))
            } else {
                showFailToast(t('message.needBindingEmail'))
            }
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
            if (layout.value == 'pc') {
                ElMessage(response.data)
            } else {
                showFailToast(response.data)
            }

        }
    })
}

// ga4 fb 收录
const GAAddCart = () => {
    let data = {
        currency: "TWD",
        items: [{
            item_id: props.mainGoods.id,
            item_name: props.mainGoods.goodsName,
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
        content_ids: [props.mainGoods.id],
        content_name: props.mainGoods.goodsName,
        content_type: 'product',
        value: state.selectSpecPrice.price,
        content_category: '',
        contents: [{
            id: props.mainGoods.id,
            content_name: props.mainGoods.goodsName,
            price: state.selectSpecPrice.price,
            spec_id: state.selectId ? state.selectId.toString() : '',
            spec_name: state.selectArr ? state.selectArr.join(',') : '',
            quantity: state.count,
            content_category: ''
        }]
    }
    sendDataFBPixel('AddToCart', fbData)
}

onMounted(() => {
    state.selectSpecPrice =  {...props.selectSpecPrice}
    state.goodsInventoryDetail = props.goodsInventoryDetail
    state.specList = props.specList
    if (state.selectSpecPrice.count > 0) {
        state.displayAddBuy = true
    }
});
</script>
<style lang="scss" scoped>
@import "@/assets/css/goods/packGoodsSpec";
@import "@/assets/css/group/actGoods";
</style>