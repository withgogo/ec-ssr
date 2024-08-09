<template>
    <div class="bgfff h5-order-list h5-goods-content " style="box-shadow: 0px 4px 14px 0px #d8d8d8;">
        <div v-for="(giftMember, indexs) in props.orderMemberCardGiftInfoDtoList" :key="indexs"
            class="h5-goods-row-list">
            <div class="mbottom5 mtop10">
                <van-tag class=" mright5"
                    v-if="giftMember.type == 'season_gift' && giftMember.goodsList && giftMember.goodsList.length > 0"
                    type="primary" size="medium" color="#f06c7a" text-color="#fff">
                    <!-- 季禮禮品 -->
                    {{ $t('order.seasonGift') }}
                </van-tag>
                <van-tag class=" mright5"
                    v-if="giftMember.type == 'member_card_gift' && giftMember.goodsList && giftMember.goodsList.length > 0"
                    type="primary" size="medium" color="#f06c7a" text-color="#fff">
                    <!-- 入會禮禮品 -->
                    {{ $t('order.memberCardGift') }}
                </van-tag>
                <van-tag class=" mright5"
                    v-if="giftMember.type == 'upgrade_gift' && giftMember.goodsList && giftMember.goodsList.length > 0"
                    type="primary" size="medium" color="#f06c7a" text-color="#fff">
                    <!-- 升等禮禮品 -->
                    {{ $t('order.upgradeGift') }}
                </van-tag>
            </div>
            <div class="flex" v-for="goodsGift, indexG in giftMember.goodsList" :key="indexG">
                <van-image :src="goodsGift.fullPath" @click.stop="goLookDetail(goodsGift)" class="h5-goods-img">
                </van-image>
                <div class="flex h5-goods-item flex1" @click.stop="lookGoods()">
                    <!-- 商品名称 -->
                    <div class="h5-goods-name">{{ goodsGift.goods_name }}</div>
                    <!-- 商品规格 -->
                    <div class="h5-goods-spec-info">
                        <span v-if="goodsGift.goods_gsp_val !== ''" v-html="goodsGift.goods_gsp_val"></span>
                        <div>
                            <!-- 数量 -->
                            {{ $t('order.goodsCount') }}:{{ goodsGift.goods_count }}
                        </div>
                    </div>

                    <div class="flex font14 justify-content-end ">
                        <div class="price">{{ $t('moneyUnit') }}{{ useMathCeil(goodsGift.goods_all_price) }}
                        </div>
                        x<div>{{ goodsGift.goods_count }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
const props = defineProps({
    orderMemberCardGiftInfoDtoList: {
        type: Array,
        required: true,
        default: []
    },
    orderId: {
        type: [String, Number],
        required: true,
        default: 1
    }
})
const emit = defineEmits(['lookGoods', 'goLookDetail']) //获取父组件的方法emit
// 点击 
const lookGoods = () => {
    emit('lookGoods', props.orderId)
}
const goLookDetail = (row) => {
    emit('goLookDetail', row)
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/cart/index";
@import "@/assets/css/order/orderDetail";
</style>
