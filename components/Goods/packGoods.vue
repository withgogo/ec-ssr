<template>
    <div class="flex just-between" style="margin-bottom: 16px;">
        <div class="flex align-items-center fontW goods-spec-top-tips">
            <span class="limited-preferential-left-border pc-goods-des-left-border "
                style="background-color:#00c2c1;"></span>
            {{ $t('message.confirmProduct') }}
        </div>
        <div class="pointer" @click="hidePackageGoodSpec">
            &#10005
        </div>
    </div>
    <!-- 主商品 -->
    <div class="flex package-goods-main" v-if="props.packageGoodsMain.goodsName">
        <img :src="props.packageGoodsMain.mainImg" class="package-goods-main-img package-goods-img">
        <div class="flex1 ">
            <!-- 名称 -->
            <div class="package-goods-name fontW">{{ props.packageGoodsMain.goodsName }}</div>
            <div class="flex just-between package-goods-main-price align-items-end">
                <!-- 价格 -->
                <div class="flex flex-bottom align-items-end">
                    <div class="package-goods-name" :class="{ 'font18': layout !== 'pc' }" style="margin-right:10px;">
                        <div style="line-height: 18px;">
                            <memberTips
                            v-if="props.packageGoodsMain.actType == 'member' || (props.packageGoodsMain.isAllStore && props.packageGoodsMain.isAllStore == 1) || props.packageGoodsMain.discountType"
                            :discountType="props.packageGoodsMain.discountType"></memberTips>
                        </div>
                       <div>
                        {{$t('moneyUnit') }}{{ props.packageGoodsMain.price }}
                       </div>
                    </div>
                    <span class="default-text default-price-online"
                        v-if="props.packageGoodsMain.price !== props.packageGoodsMain.goodsPrice"> {{ $t('moneyUnit')
                        }}{{
                            props.packageGoodsMain.goodsPrice }}</span>
                </div>
                <!-- 库存 -->
                <div class="package-goods-stock">{{ $t('packageGoods.stock') }}:{{ props.packageGoodsMain.stock }}</div>
            </div>
        </div>
    </div>
    <div class="on-line"></div>
    <!-- 子商品 -->
    <div class="packGoods-scroll">
        <div v-for="goods, index in state.packGoodsDtoList" :key="goods.id" class="package-goods-item">
            <div class="flex">
                <img :src="goods.img" class="package-goods-main-img-child package-goods-img">
                <div class="flex1">
                    <!-- 名称 -->
                    <div :class="layout !== 'pc' ? 'font14' : 'package-goods-name'">{{ goods.goodsName }}</div>
                    <div v-if="goods.inventoryType == 'spec'">
                        <!-- 规格 -->
                        <div v-for="spec in JSON.parse(goods.goodsInventoryDetail)" :key="spec.id">
                            <div v-if="spec.isShow && spec.isShow == true"
                                class="flex align-items-center package-goods-spec-content">
                                <div class="package-goods-spec-val flex align-items-center "
                                    :class="layout !== 'pc' ? 'font12' : ''" v-for="(item_value, index2) in spec.spData"
                                    :key="index2">
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
                    {{ goods.inventoryType == 'spec' ? goods.count : goods.count * state.count > goods.goodsInventory ?
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
    <!-- 数量 -->
    <div class="fontW flex align-items-center goods-spec-top-tips goods-chose-count" :class="layout !== 'pc' ? 'font14' : ''">
        {{
            $t('groupAct.goodsCount') }}
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
        {{ $t('groupAct.goodsAmount') }}:{{ $t('moneyUnit') }} {{ props.packageGoodsMain.price * state.count }}
    </div>
    <!-- 购买按钮  toView 没有值的时候显示 加购跟立即购买-->
    <div class="flex just-between align-items-center add-buy-box-bottom pointer"
        v-if="props.packageGoodsMain.stock > 0 && !props.packageGoodsMain.toView">
        <div class="add-cart add-cart-buy flex1 flex justify-content-center" @click="addCartBuy('addCart')">{{
            $t('button.addCart') }}</div>
        <div style="width: 50px;"></div>
        <div class="buy add-cart-buy flex1 flex justify-content-center" @click="addCartBuy('addBuy')">{{
            $t('button.addBuy')
        }}</div>
    </div>

    <!-- 商品详情的 显示的完成-->
    <div v-else-if="props.packageGoodsMain.stock > 0 && props.packageGoodsMain.toView == 'detail'"
        class="flex just-between align-items-center add-buy-box-bottom pointer"
        @click="addCartBuy(props.packageGoodsMain.addCartBuyType)">
        <div class="add-cart add-cart-buy flex1 flex justify-content-center">
            {{$t('button.submitEvent')}}
        </div>
    </div>

    <!-- 到货提醒 不是团购时候 -->
    <div v-else-if="props.packageGoodsMain.type !== 'group' && props.packageGoodsMain.stock == 0"
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
let { t } = useI18n();
import { checkGoods, goodsArriveMsg } from '@/composables/api/goods';
import { addGoodsCart } from '@/composables/api/user/cart';
import { setStorageData } from '@/composables/utils/dataStorage';
import { showLoadingToast, closeToast, showConfirmDialog, showSuccessToast, showFailToast, showToast } from 'vant';
import { sendDataGA, sendDataFBPixel } from '@/composables/utils/GA4';
const props = defineProps({
    packGoodsDtoSpecList: {
        type: Array,
        required: true,
        default: []
    },
    packageGoodsMain: {
        type: [Object, String],
        required: true,
        default: {}
    },
    specCombination: { //选了子商品规格
        type: Array,
        default: []
    }
})
watch(
    () => props.specCombination, (newVal) => {
        // console.log('newVal====',newVal)
        // 选了规格传回来的
        if (newVal.length > 0) {
            state.packGoodsDtoList[state.specCallback].goodsInventoryDetail = JSON.stringify(newVal)
            state.packGoodsDtoList[state.specCallback].choseCount = newVal.filter(item => item
                .isShow == true || item.isShow == 'true').reduce((prev, current) => {
                    return prev + Number(current.choseCount)
                }, 0)
        }
    },{deep:true}
)
const state = reactive({
    storeId: getStoreId(),
    packGoodsDtoList: [],
    count: 1,
    specCallback: -1, //选规格的套餐子商品下标
    choseGoods: {}, //当前选中的套餐商品
    specCombination: [],  //子商品的规格
    specCombinationCount: 0,//已选数量
    storeId: getStoreId(),
    addCartBuyType: null,
    packageGoodsMain: {}
})
let layout = useState("layout");
let channelStore = useChannelStore()
const emit = defineEmits(["showCombinationSpec", "addCartBuy", "checkGoods", "hidePackageGoodSpec"]);
const hidePackageGoodSpec = () => {
    emit("hidePackageGoodSpec");
}
// 选择商品规格
let showCombinationSpec = (goods, index) => {
    state.specCallback = index;
    state.choseGoods = goods
    emit("showCombinationSpec", goods,state.count);
}

// 加减数量
const addCountLess = (type) => {
    if (type == 'add') {
        if (state.count >= props.packageGoodsMain.stock) {
            state.count = props.packageGoodsMain.stock
        }
        if (state.count < props.packageGoodsMain.stock) {
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
    state.addCartBuyType = type
    // 库存是否超出
    if (state.count > props.packageGoodsMain.stock) {
        if (layout.value == 'pc') {
            ElMessage(t('message.goodsCountExceeds'))
        } else {
            showToast(t('message.goodsCountExceeds'))
        }
        return
    }
    let checkGoods = checkGoodsCombinPlanCount()
    if (!checkGoods) {
        if (layout.value == 'pc') {
            ElMessage(t('message.specError'))
        } else {
            showToast(t('message.specError'))
        }
    } else {
        checkGoodsData()
    }
}

/*
点击完成加购物车或者 立即购买时 
校验用户是否选中子商品的规格的数量是不是跟套餐数量相等
*/
let checkGoodsCombinPlanCount = () => {
    let specList = state.packGoodsDtoList.filter(item => item.inventoryType == 'spec')
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
let checkGoodsData = () => {
    // 先验证商品
    let data = {
        id: props.packageGoodsMain.id,
        storeId: state.storeId,
        inventoryType: 'all',
        inventory: state.count,
        goodsTransfee: props.packageGoodsMain.goodsTransfee,
        transportId: props.packageGoodsMain.transportId,
        packageList: '',
        price: props.packageGoodsMain.price
    }
    let packageList = props.packGoodsDtoSpecList.map(item => {
        return {
            count: item.count,
            goodsInventory: item.goodsInventory,
            goodsInventoryDetail: item.goodsInventoryDetail,
            id: item.id,
            inventoryType: item.inventoryType,
        }
    })
    data.packageList = JSON.stringify(packageList)
    checkGoods(data).then(response => {
        if (response.code == 200) {
            // 验证完毕
            if (props.packageGoodsMain.stock > 0 && state.count > 0) {
                let packageList = state.packGoodsDtoList.map(item => {
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
                // 加入购物车
                if (state.addCartBuyType == 'addCart') {
                    addCartConfirm(packageList)
                }
                //  立即购买
                if (state.addCartBuyType == 'addBuy') {
                    console.log()
                    let data = {
                        id: props.packageGoodsMain.id,
                        count: state.count,
                        packageList: packageList
                    }
                    emit('addCartBuy', state.addCartBuyType, data)
                }
            }
        } else {
            if (layout.value == 'pc') {
                ElMessage(response.data)
            } else {
                showToast(response.data)
            }
            // 商品价格运费变动时候重新获取数据 获取套餐商品详情 
            setTimeout(()=>{
                emit('checkGoods')
            },2000)
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
        id: props.packageGoodsMain.id,
        gsp: null,
        count: state.count,
        buyType: '',
        combinId: '',
        combinVersion: '',
        packageList: packageList,
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
        id: props.packageGoodsMain.id,
        storeId: state.storeId,
        specIds: ''
    }
    goodsArriveMsg(data).then(response => {
        if (response.code == 200) {
            if(layout.value == 'pc'){
                ElMessage(t('message.arriveTips'))
            }else{
                showToast(t('message.arriveTips'))
            }

        } else if (response.code == 44018) {
            if(layout.value == 'pc'){
                ElMessage(t('message.needBindingEmail'))
            }else{
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
            if(layout.value == 'pc'){
                ElMessage(response.data)
            }else{
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
            item_id: props.packageGoodsMain.id,
            item_name: props.packageGoodsMain.goodsName,
            price:  props.packageGoodsMain.price,
            spec_id:  '',
            spec_name: '',
            quantity: state.count,
            item_category: ''
        }]
    }
    sendDataGA('add_to_cart', data)
    
    let fbData = {
        currency: "TWD",
        content_ids: [props.packageGoodsMain.id],
        content_name: props.packageGoodsMain.goodsName,
        content_type: 'product',
        value:  props.packageGoodsMain.price,
        content_category: '',
        contents: [{
            id: props.packageGoodsMain.id,
            content_name: props.packageGoodsMain.goodsName,
            price: props.packageGoodsMain.price,
            spec_id:  '',
            spec_name:  '',
            quantity: state.count,
            content_category: ''
        }]
    }
    sendDataFBPixel('AddToCart', fbData)
}
onMounted(() => {
    state.packGoodsDtoList = props.packGoodsDtoSpecList
});
</script>
<style lang="scss" scoped>
@import "@/assets/css/goods/packGoodsSpec";
@import "@/assets/css/group/actGoods";
</style>
