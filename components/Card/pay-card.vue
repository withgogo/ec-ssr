<template>
    <!-- 信用卡列表 -->
    <div>
        <!-- 信用卡 站内付款 信用卡列表 -->
        <div v-if="props.bankCardList.length>0" class="h5-bank-box"  :style="{ 'height': props.bankListHeight }">
            <div class="h5-bank-list-item" v-for="card in props.bankCardList" :key="card.id">
                <div @click="selectedCard(card)">
                    <!-- 默认 -->
                    <Tips  v-if="card.isDefault == 1"  :text="$t('bindCard.isDefaultCard')" :position="true"
                    bgColor="rgb(255,118,1)" />
                    <!-- 卡号 -->
                    <div class="flex align-items-center">
                        <div class="checkbox-box">
                            <div class="checkbox">
                                <div :class="[card.id == props.bankCardId ? 'on' : '']"></div>
                            </div>
                        </div>
                        <div style="margin-left: 15px;">
                            <!-- 别名 -->
                            <div>
                                <span class="card-alias "  :class="[layout=='pc'?'pc-font14':'font14']">{{ card.cardAlias }}</span>
                            </div>
                            <div class=" validity-time " :class="[layout=='pc'?'pc-font14':'font14']">{{
                                cardSplice(card.cardNo) }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 展示更多信用卡 -->
        <div class="use-new-card" v-if="props.bankCardList && props.bankCardList.length > 1 && !props.bankListShowAll">
            <div class="mbottom10 flex justify-content-end ">
                <!-- 選擇其他卡片 -->
                <div @click="showMoreBank" style="margin-right: 60rpx;" class="h5-show-more-bank">{{$t('bindCard.showMoreBank')}}</div>
            </div>
        </div>
        <!-- 信用卡站内付款使用新卡 -->
        <div class="use-new-card" @click="useNewCard()">
            <div class="mbottom10 flex align-items-center">
                <div class="checkbox-box">
                    <div class="checkbox">
                        <div :class="[props.useNewCardShow ? 'on' : '']"></div>
                    </div>
                </div>
                <div class="h5-use-card" style="margin-left: 15px;">
                    {{$t('bindCard.newBindCard')}}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {
    onMounted,
    reactive,
    watch
} from "vue";
import {bankCardSplice} from "@/composables/utils/tools.js";
const props = defineProps({
    bankCardList: {
        type: Array,
        default:[]
    },
    bankCardId:{
        type: Number,
        default:0,
    },
    bankListShowAll:{
        type: Boolean,
        default:0,
    },
    useNewCardShow: {
        type: Boolean,
        default: false,
    },
    bankListHeight:{
        type: String ,
        default: '70px',
    }
})

let layout = useState("layout");
const emit = defineEmits(["useNewCard", "selectedCard", "showMoreBank"]);

onMounted(() => {

});
// 隐藏 信用卡前几位
const cardSplice = (val) => {
    return bankCardSplice(val)
}

// 使用新信用卡
const useNewCard = () => {
    // 当没有信用卡时 使用新卡选中
    emit('useNewCard')
}
const selectedCard = (card) => {
    emit('selectedCard',card)
}
// 展示更多银行卡
const showMoreBank = () => {
    emit('showMoreBank')
}

</script>

<style lang="scss" scoped>
@import "@/assets/css/card";
</style>
