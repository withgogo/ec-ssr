<template>
    <div class="flex just-between" style="margin-bottom: 16px;">
        <div class="flex align-items-center fontW goods-spec-top-tips">
            <span class="limited-preferential-left-border pc-goods-des-left-border "
                style="background-color:#00c2c1;"></span>
            {{ $t('packageGoods.spec') }}
        </div>
        <div class="pointer" @click="hideCombinPlanSpec">
            &#10005
        </div>
    </div>
    <!-- 商品 -->
    <div class="flex package-goods-main" >
        <img :src="state.choseGoods?.img" class="package-goods-main-img package-goods-img">
        <div class="flex1 ">
            <!-- 名称 -->
            <div class="package-goods-name fontW">{{ state.choseGoods?.goodsName }}</div>
            <!-- 加价购商品时候 -->

            <div class="price package-goods-stock" v-if="!props.isCombination">
                {{ $t('moneyUnit') }} {{ state.choseGoods?.extraPrice }}
               
            </div>
            <!--可选数量:（已选数量:）  -->
            <div class="flex default-text package-goods-main-price " :class="layout !== 'pc' ? 'font12' : ''"
                v-if="props.isCombination">
                {{ $t('packageGoods.packageChoiceGoodsCount') }}:{{ props.count * state.choseGoods?.count }}
                （ {{ $t('packageGoods.choseCount') }}:{{ state.specCombinationCount }}）
            </div>
            <!-- 加价购 -->
            <div class="flex default-text package-goods-main-price " :class="layout !== 'pc' ? 'font12' : ''"
                v-if="!props.isCombination">
                {{ $t('packageGoods.packageChoiceGoodsCount') }}:{{ props.count }}
                （ {{ $t('packageGoods.choseCount') }}:{{ state.specCombinationCount }}）
            </div>
        </div>
    </div>
    <div class="on-line"></div>
    <!-- 规格 -->
    <div class="spec-scroll">

        <div v-for="(item, index1) in state.specCombination" :key="index1" @click="currentCombinationSpec(index1, item)"
            class="flex align-items-center package-goods-spec-content show-spec-val">
            <div class="package-item-content-spec  flex align-items-center  pointer"
                :class="[item.isShow == true ? 'actived-spec-val' : '',
                layout == 'pc' ? 'pc-spec-item' : 'h5-package-item-content-spec'
                ]">
                <div :class="[
                item.spData && item.spData.length == 1 ? 'default-package' : '', 
                 layout !== 'pc' ? 'font14' : '',
                'package-goods-spec','flex','align-items-center',]"
                    v-for="(item_value, index2) in item.spData" :key="index2">
                    <span class="item_value_name">{{
                        item_value.value }}</span>
                    <div v-if="index2 < item.spData.length - 1">+</div>
                </div>
            </div>

            <!-- 数量 -->
            <div class="combinPlan-goods-spec-choseCount" v-if="item.isShow == true">
                <div class="flex input-number pointer">
                    <div class=" reduce-icon flex justify-content-center align-items-center"
                    :class="[
                     layout == 'pc' ? 'pc-input-number-icon' : 'h5-input-number-icon']"
                    >
                        <svg-icon name="reduce" size="18" />
                    </div>
                    <div class="flex1 flex justify-content-center h5-input-number-icon"
                    :class="[
                     layout == 'pc' ? 'pc-input-number-icon' : 'h5-input-number-icon']"
                    >{{ item.choseCount }}</div>
                    <div class="h5-input-number-icon add-icon flex justify-content-center align-items-center"
                    :class="[
                     layout == 'pc' ? 'pc-input-number-icon' : 'h5-input-number-icon']"
                    >
                        <svg-icon name="add" size="18" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- 完成 -->
    <div class="confirm-spec-btn flex justify-content-center pointer" @click="combinationSpecConfirm">{{
        $t('button.confirmSpec') }}</div>
</template>
<script setup>
import {
    onMounted,
    reactive,
    watch
} from "vue";
import { ElMessage } from 'element-plus'
import { showLoadingToast, closeToast, showSuccessToast, showFailToast, showToast } from 'vant';
let { t } = useI18n();
const props = defineProps({
    choseGoods: {
        type: [Object, String],
        required: true,
        default: {}
    },
    isCombination: {
        type: Boolean,  //是套餐 还是 其他
        required: true,
        default: false
    },
    count: {
        type: [Object, Number],
        required: true,
        default: 1
    }
})
const state = reactive({
    storeId: getStoreId(),
    choseGoods: null, //当前选中的套餐商品
    specCombination: [],  //子商品的规格
    specCombinationCount: 0,//已选数量
})
let layout = useState("layout");
const emit = defineEmits(["combinationSpecConfirm", "hideCombinPlanSpec"]);
const hideCombinPlanSpec = () => {
    emit("hideCombinPlanSpec");
}
// 套餐规格spec 选中
let currentCombinationSpec = (index, item) => {
    // console.log(index)
    if (item.count > 0) {
        // 这里是加价购的商品赋值 
        state.choseGoods.extraPrice = item.price
        state.specCombination[index].isShow = !state.specCombination[index].isShow
        if (state.specCombination[index].isShow) {
            state.specCombination[index].choseCount = state.specCombination[index].choseCount > 0 ? state.specCombination[index].choseCount : 1
        }
        let specCombinationList = state.specCombination.filter(item => item.isShow == true)
        state.specCombinationCount = specCombinationList.reduce((prev, current) => {
            return Number(prev) + Number(current.choseCount)
        }, 0)
        // console.log(state.specCombinationCount)
    } else {

        if (layout.value == 'pc') {
                ElMessage($t('goodsDetail.specTips'))
            } else {
                showToast($t('goodsDetail.specTips'))
            }
    }
}
// 确定规格
const combinationSpecConfirm = () => {
    // 当所选商品规格超出 套餐
    if (props.isCombination == true) {
        let sum = props.count * state.choseGoods?.count
        // console.log(sum)
        if (state.specCombinationCount > sum) {
            if (layout.value == 'pc') {
                ElMessage(t('message.combinationExceed'))
            } else {
                showFailToast(t('message.combinationExceed'))
            }

            return
        }
        if (state.specCombinationCount < sum) {
            if (layout.value == 'pc') {
                ElMessage(t('message.combinationLess'))
            } else {
                showFailToast(t('message.combinationLess'))
            }
            return
        }
    }

    let specCombination = state.specCombination
    emit("combinationSpecConfirm", specCombination);
}
onMounted(() => {
    state.choseGoods = JSON.parse(JSON.stringify(props.choseGoods)) 
    console.log('state.choseGoods===', state.choseGoods)
    let specCombination = []
    console.log('props.isCombination ==', props.isCombination )
    if (props.isCombination == true) {
        //套餐
        specCombination = JSON.parse(props.choseGoods?.goodsInventoryDetail)
    } else {
        // 加价购
        specCombination = JSON.parse(props.choseGoods?.extraPriceDetail)
    }
    state.specCombination = specCombination.map(item => {
        return {
            ...item,
            choseCount: item.choseCount ? item.choseCount : 1,
            isShow: item.isShow ? item.isShow : false
        }
    })

    let specCombinationList = state.specCombination.filter(item => item.isShow == true)
    state.specCombinationCount = specCombinationList.reduce((prev, current) => {
        return Number(prev) + Number(current.choseCount)
    }, 0)
    console.log('------11',state.specCombination)

});
</script>
<style lang="scss" scoped>
@import "@/assets/css/goods/packGoodsSpec";
@import "@/assets/css/group/actGoods";
</style>