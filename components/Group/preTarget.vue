<template>
    <div class="group-targat-title ">
        <span class="limited-preferential-left-border " style="background-color: #EA5455;"></span>
        {{ $t('groupAct.limitedTimePreferential') }}
    </div>
    <div class="preTargetAmount-box flex align-items-center">
     
        <Circle  v-if="props.groupInfo.isShowMoney==1" :size="70" :percent="targetAmount"></Circle>
        <div class="flex1 sale-target-box" >
            <!--  -->
            <div v-if="props.groupInfo.isShowMoney == 1">
                <!-- 真实 销售数量 -->
                <div v-if="props.groupInfo.isShowVirtual == 0">
                    <p class="fontW  sale-amount" 
                        v-if="props.groupInfo.saleAmount && props.groupInfo.saleAmount > 0">
                        {{ $t('moneyUnit') }}
                        <CnMoney :showUnit="false" :showZeroDecimal="false" :money="props.groupInfo.saleAmount" thousandth
                            :size="20" color="#484848" />
                    </p>
                    <p v-else class="fontW"  :class="[layout == 'pc' ? 'pc-limited-rush-buying' : 'h5-limited-rush-buying']">
                        {{ $t('groupAct.limitedTimeRushBuying') }}
                    </p>
                </div>
                <!-- 虚拟销售数量  -->
                <div v-if="props.groupInfo.isShowVirtual == 1">
                    <p class="fontW"
                        v-if="props.groupInfo.groupVirtualSaleAmount && props.groupInfo.groupVirtualSaleAmount > 0">
                        {{ $t('moneyUnit') }}
                        <CnMoney :showUnit="false" :showZeroDecimal="false"
                            :money="props.groupInfo.groupVirtualSaleAmount" thousandth :size="22" color="#484848">
                        </CnMoney>
                    </p>
                    <p v-else class="fontW">
                        {{ $t('groupAct.limitedTimeRushBuying') }}
                    </p>
                </div>
                <div class="target-Amount ">
                    {{ $t('member.targetAmount') }}
                    {{ $t('moneyUnit') }}
                    <CnMoney :showUnit="false" :showZeroDecimal="false" :money="props.groupInfo.preTargetAmount" thousandth
                        :size="12" color="#888" />
                </div>
            </div>

            <!-- 购买人数 -->
            <div class="flex align-items-center mtop5">
                <!-- 购买人数 真实购买人数 -->
                <div class="flex1"
                    v-if="props.groupInfo.isShowCount == 1 && props.groupInfo.groupOrderCount >= 10 && props.groupInfo.isShowVirtual == 0">
                    <p class="fontW  group-order-font">
                        {{ props.groupInfo.groupOrderCount }}
                        {{ $t('otherWords.people') }}
                    </p>
                    <div class="target-Amount ">
                        {{ $t('groupAct.alreadyPurchased') }}
                    </div>
                </div>
                <!-- 虚拟购买人数   -->
                <div class="flex1"
                    v-if="props.groupInfo.isShowCount == 1 && props.groupInfo.groupVirtualOrderCount >= 10 && props.groupInfo.isShowVirtual == 1">
                    <p class="fontW group-order-font">
                        {{ props.groupInfo.groupVirtualOrderCount }}
                        {{ $t('otherWords.people') }}
                    </p>
                    <div class="target-Amount ">
                        {{ $t('groupAct.alreadyPurchased') }}
                    </div>
                </div>
                <!-- 活动结束时间 -->
                <div style="flex: 1;">
                    <p class="fontW group-order-font">
                        {{ formatDates(props.groupInfo.endTime) }}
                    </p>
                    <!-- 预购显示结束 -->
                    <div class="target-Amount " v-if="props.groupInfo.isPre == 1 && props.groupInfo.groupType !== 2">
                        {{ $t('groupAct.ActEndTime') }}
                    </div>
                    <!-- 募资结束 -->
                    <div class="target-Amount "
                        v-else-if="props.groupInfo.isPre == 1 && props.groupInfo.groupType == 2">
                        {{ $t('groupAct.muZiEndTime') }}
                    </div>
                    <!-- 一般团购显示 -->
                    <div class="target-Amount" v-else>
                        {{ $t('groupAct.groupActEndTime') }}
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script setup>
import Circle from "@/components/Circle/index.vue"
import CnMoney from "@/components/CnMoney/index.vue";
import  { accDiv,accMul,formatDate}  from '@/composables/utils/tools';
import { onMounted } from "vue";
const props = defineProps({
    groupInfo: {
        type: [Object, String],
        required: true,
        default: {}
    }
})
let layout = useState("layout");

const formatDates = (time) => {
    if (time == null || time === '') {
        return ''
    }
    const date = new Date(time)
    return formatDate(date, 'yyyy/MM/dd ')
}
// 计算目标
let targetAmount = computed(() => {
    let saleAmount = 0
    if (props.groupInfo.isShowVirtual == 0) {
        saleAmount = props.groupInfo?.saleAmount !== null && props.groupInfo?.saleAmount > 0 ? props.groupInfo?.saleAmount : 0
    } else {
        saleAmount = props.groupInfo?.groupVirtualSaleAmount !== null && props.groupInfo?.groupVirtualSaleAmount > 0 ? props.groupInfo?.groupVirtualSaleAmount : 0
    }
    if (saleAmount > 0) {
        return Number(accMul(accDiv(saleAmount, props.groupInfo?.preTargetAmount), 100).toFixed(0))
    } else {
        return 0
    }
})
</script>
<style lang="scss" scoped>
@import "@/assets/css/group/actGoods";
</style>
 