
<template>
    <div class="bird-gift">
        <h4 style="font-size: 18px;">{{ $t('earlyBirdGift.birdGiftTitle') }}</h4>
        <div v-for="(birdItem, bIndex) in  props.earlyBirdList" :key="bIndex" class="bird-gift-list border-bottom">
            <div class="bird-gift-act-title-box">
                <div class="bird-gift-act-title">{{ birdItem.ebTitle }}</div>
            </div>
            <div class="bird-gift-act-title-box">
                <div class="bird-gift-rule bird-gift-time">{{ birdItem.ebStartDate }}～{{ birdItem.ebEndDate }}</div>
            </div>
            <!-- 商品 -->
            <div class="bird-gift-goods padding" v-if="birdItem.ebTypeId == 0">
                <img class="bird-gift-goods-cover" :src="birdItem.goodsInfoDto.imgUrl" />
                <div class="bird-gift-rule bird-gift-info">
                    <div class="bird-gift-goodsName">{{ birdItem.goodsInfoDto.goodsName }}</div>
                    <div> {{ $t('moneyUnit') }} {{ birdItem.goodsInfoDto.storePrice }}</div>
                </div>
            </div>
            <!-- 积分 -->
            <div class="bird-gift-rule  padding" v-if="birdItem.ebTypeId == 1">
                <div>{{ $t('earlyBirdGift.rewardPoints') }}:{{ birdItem.ebIntegral }}{{ $t('earlyBirdGift.fen') }}
                </div>
                <div>{{ $t('earlyBirdGift.useIntegralRule') }}</div>
            </div>
            <!-- 其他 -->
            <div class=" padding bird-gift-rule " v-if="birdItem.ebTypeId == 2">
                <div class="bird-gift-description rich-text-wrap" v-html="birdItem.ebDesc"></div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted } from "vue";
const props = defineProps({
    earlyBirdList: {
        type: Array,
        required: true,
        default: []
    },
})

</script>
<style lang="scss" scoped>
@import "@/assets/css/earlyBird/index";
</style>
 