<template>
    <div class="h5-bank-list">
        <div :class="{ 'pc-flex-wrap': layout == 'pc' }">
            <!-- cardStatus == 0 已经过期了 -->
            <div :class="['h5-bank-list-item', card.cardStatus == 0 ? 'bank-card-over-bg' : 'bank-card-bg', layout != 'pc' ? '' : 'pc-bank-width']"
                v-for="card, index in props.bankList" :key="card.id">
                <!-- 点击选中 用于周期性订单信用卡扣款失败，换卡扣款的 check-->
                <div class="checkbox-box" @click="selectedCard(card)" v-if="props.isReplaceCard">
                    <div class="checkbox">
                        <div :class="[card.id == props.bankCardId ? 'on' : '']"></div>
                    </div>
                </div>
                <div class="card-content">
                    <!-- 信用卡过期展示的 -->
                    <Tips v-if="card.cardStatus == 0" :text="$t('bindCard.cardOutDated')" :position="true"
                        bgColor="#999" />
                    <!-- 换卡 当前扣款卡-->
                    <Tips v-else-if="props.isReplaceCard && card.id == props.bankCardId && props.type == 'changePay'"
                        :text="$t('bindCard.curentPayCard')" :position="true" bgColor="rgb(255,118,1)" />
                    <div v-else>
                        <!-- 默认 -->
                        <Tips v-if="card.isDefault == 1 && !props.isReplaceCard" :text="$t('bindCard.isDefaultCard')"
                            :position="true" bgColor="rgb(255,118,1)" />
                        <!--  设为默认-->
                        <div class="h5-default-bank click-btn" v-if="card.isDefault == 0 && !props.isReplaceCard"
                            @click="setDefaultBank(card)">{{ $t("bindCard.setDefaultCard") }}
                        </div>
                    </div>
                    <!-- 别名 -->
                    <div class="bank-number" style="margin-top: 10px;">
                        <span class="card-alias">{{ card.cardAlias }}</span>
                        <span class="click-btn" v-if="!props.isReplaceCard" @click="editAlias(card)">{{
                            $t("bindCard.editAlias") }}</span>
                    </div>
                    <!-- 卡号 -->
                    <div class="bank-number " :class="[layout != 'pc' ? 'font14' : 'font-font14']" style="margin: 15px 0;">
                        {{ cardSplice(card.cardNo) }}</div>
                    <!-- 有效期 -->
                    <div class="bank-number " :class="[layout != 'pc' ? 'font14' : 'font-font14']" style="margin: 15px 0;">
                        {{ $t("bindCard.validityTime") }}:{{ filterValidityTime(card.validTo) }}</div>
                    <div class="change-card">
                        <!--  换新卡 编辑-->
                        <span class="click-btn" style="margin-right: 10px;"
                            v-if="!props.isReplaceCard && (showFormatDate(card.validTo) || card.cardStatus == 0)"
                            @click="changeCard(card)">{{ $t("bindCard.editCardText") }}</span>
                        <!-- 解绑 删除 -->
                        <span v-if="!props.isReplaceCard" class="click-btn" @click="unbindCard(card)">{{
                            $t("bindCard.deleteCard") }}</span>
                        <!-- 换卡 到期換新卡並扣款  -->
                        <span class="click-btn"
                            v-if="props.isReplaceCard && card.cardStatus == 0 && props.type == 'changePay'"
                            @click="useNewPay()">{{ $t("bindCard.useNewPay") }}</span>
                    </div>
                </div>
            </div>
            <!-- 新增信用卡 pc的信用卡列表样式-->
            <div v-if="props.type == 'list'" class="pc-border-card-add flex  flex-center " @click="addBindCard()">
                <div class="pc-text-size">
                    <p style="font-size: 50px;">
                        <el-icon>
                            <CirclePlus />
                        </el-icon>
                    </p>
                    <p>{{ $t("bindCard.addBindCard") }}</p>
                </div>
            </div>
        </div>
        <!-- 换卡并支付--新增 -->
        <div style="color: #00b1c9" v-if="props.isReplaceCard && props.type == 'changePay'" @click="useNewPay"
            class="use-card-add pointer">+
            <!-- 新信用卡扣款 -->
             {{ $t('bindCard.useCardAdd') }}
        </div>
        <!-- 换卡 -- 新增 -->
        <div style="color: #00b1c9" v-if="props.isReplaceCard && props.type == 'change'" @click="useNewPay"
            class="use-card-add pointer">
            <!-- 换新信用卡 -->
            +{{$t('bindCard.changeNewCard')}}
        </div>
    </div>
</template>
<script setup>
import { bankCardSplice } from "@/composables/utils/tools.js";
import Tips from "@/components/Tips/index.vue";
const props = defineProps({
    bankList: {
        type: Array,
        default: []
    },
    isReplaceCard: {
        type: Boolean,
        default: false,
        required: false,
    },
    type: {
        type: String,
        default: '',
        required: false,
    },
    bankCardId: {
        type: [String, Number],
        default: '',
        required: false,
    },
})

let layout = useState("layout");
const filterValidityTime = (time) => {
    if (time == null || time === '') {
        return ''
    }
    let dataAll = time.split('-')

    return `${dataAll[1]}/${dataAll[0]}`
}
const cardSplice = (val) => {
    return bankCardSplice(val)

}
const emit = defineEmits(["setDefaultBank", "unbindCard", "changeCard", "selectedCard", "useNewPay", "editAlias","addBindCard"]);
const addBindCard=(item)=>{
    
    emit("addBindCard", item);
}

//设置默认
const setDefaultBank = (item) => {
    emit("setDefaultBank", item);
}
const unbindCard = (item) => {
    // 解除绑定 删除
    emit("unbindCard", item);
}
// 转卡 编辑
const changeCard = (item) => {
    emit("changeCard", item);
}
// check 
const selectedCard = (item) => {
    emit("selectedCard", item);
}
// 新信用卡扣款
const useNewPay = (item) => {

    emit("useNewPay");
}
// 改更别名
const editAlias = (item) => {
    emit("editAlias", item);
}

const showFormatDate = (time) => {
    if (time == null || time === '') {
        return false
    }
    // 后台返回 24-12 年在前面月在后面
    let dateAll = time.split('-').map(Number)
    const currentTime = new Date();
    const year = currentTime.getFullYear();
    const month = currentTime.getMonth() + 1;
    // 取年份的最后2位 
    let yearLastTwo = String(year).match(/.{1,2}/g).map(Number)[1];
    // console.log(yearLastTwo)
    // 如果当前年份是相同的 那就判断月份是不是相同的
    if (yearLastTwo == dateAll[0]) {
        // 相同月
        if (month == dateAll[1]) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/pc-style.scss";
@import "@/assets/css/card";
</style>