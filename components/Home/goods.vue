<template>
    <div class="flex flex-wrap" :class="[layout !== 'pc' ? 'just-between' : '']">
        <div v-for="goods in props.goodsList" :key="goods.id"  class="product-goods"
            :class="[layout == 'pc' ? 'pc-product-more-other' : '', 'pointer']" :style="{ width: props.width }"
            @click="addBuyGoods(goods)">
            <div class="image-wrapper-goods">
                <img :style="{ width: '100%', height: layout == 'pc' ? '282px' : '171px' }" mode="scaleToFill"
                    v-if="goods && goods.goodsMainPhoto !== null" :alt="goods.goodsName"
                    :src="goods.goodsMainPhoto.fullPath" />
                <div class="goods-tips flex">
                    <Tips v-if="goods.goodsChoiceType == 5" :text="$t('goodsDetail.serviceTips')" :position="false" bgColor="red" />
                    <Tips v-if="goods.goodsChoiceType == 7" :text="$t('packageGoods.packageText')" :position="false"
                        bgColor="#f0ad4e" />
                    <Tips v-if="goods.extraIsBuy == 2" :text="$t('extraGoods.extra')" :position="false"
                        bgColor="#ff7601" />
                    <Tips v-if="goods.goodsTransfee == 1" :text="$t('home.transfee')" :position="false" bgColor="red" />
                </div>
            </div>
            <!-- pc 展示 -->
            <div :class="[layout == 'pc' ? 'pc-cover-product-more' : 'h5-product-more h5-goods-info-box']">
                <div v-if="layout == 'pc'" class="act-slogan slogan">{{ goods.goodsAdWords }}</div>
                <div class="goods-name fontW" :class="[layout == 'pc' ? 'pc-goods-name' : 'h5-goods-name']">
                    {{ goods.goodsName }}
                </div>
                <!-- pc 展示 -->
                <div v-if="layout == 'pc'" class="act-description default-text" style="height: 40px;">
                    {{ goods.goodsService }}
                </div>
                <!-- 会员价格 -->
                <div v-if="goods.rebatePrice > 0">
                    <memberTips v-if="goods.currentLevel && goods.currentLevel.rebate < 1"></memberTips>
                    <div v-else :class="[layout == 'pc' ? 'pc-place-member' : 'h5-place-member']"></div>
                    <!-- pc h5 展示的价格位子不一样所以做了区分 pc:售价，默认价格 在一行 h5:是默认价格在上面 ，售价在下面 2行 -->
                    <div :class="[layout == 'pc' ? 'flex' : '']">
                        <!-- h5 -->
                        <!-- 商品金额 default金额 style="min-height:16px" -->
                        <div  v-if="layout !== 'pc'">
                            <div class="default-text default-act-goods-price on-line-text"
                                v-if="goods.storePrice !== goods.rebatePrice">
                                {{ $t('groupAct.originalPrice') }}{{ $t('moneyUnit') }}{{ goods.storePrice }}
                            </div>
                        </div>
                        <!-- 售价 -->
                        <div class="price flex align-items-center fontW act-goods-price "
                            :class="[layout == 'pc' ? 'pc-big-goods-price' : '']">
                            <div>{{ $t('moneyUnit') }}</div>
                            <div>{{ goods.rebatePrice }}</div>
                        </div>
                        <!-- pc 展示 -->
                        <!-- 商品金额 default金额 -->
                        <div style="margin-left: 10px;" v-if="layout == 'pc'">
                            <div class="default-text default-act-goods-price on-line-text pc-default-price-line-height pc-default-act-goods-price"
                                v-if="goods.storePrice !== goods.rebatePrice">
                                {{ $t('groupAct.originalPrice') }}{{ $t('moneyUnit') }}{{ goods.storePrice }}
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 一般价格 -->
                <div v-else>
                    <memberTips v-if="goods.discountType && goods.discountType != ''" :discountType="goods.discountType">
                    </memberTips>
                    <div v-else :class="[layout == 'pc' ? 'pc-place-member' : 'h5-place-member']"></div>
                    <!-- pc h5 展示的价格位子不一样所以做了区分 pc:售价，默认价格在一行 h5:是默认价格在上面 ，售价在下面 2行 -->
                    <div :class="[layout == 'pc' ? 'flex' : '']">
                        <!-- h5 展示 -->
                        <!-- 商品金额 default金额 -->
                        <div style="min-height:16px" v-if="layout !== 'pc'">
                            <div class="default-text default-act-goods-price on-line-text"
                                v-if="goods.storePrice !== goods.goodsPrice">
                                {{ $t('groupAct.originalPrice') }}{{ $t('moneyUnit') }}{{ goods.goodsPrice }}
                            </div>
                        </div>
                        <!-- 售价 -->
                        <div class="price flex align-items-center fontW act-goods-price"
                            :class="[layout == 'pc' ? 'pc-big-goods-price ' : '']">
                            <div>{{ $t('moneyUnit') }}</div>
                            <div>{{ goods.storePrice }}</div>
                        </div>

                        <!-- pc 展示 -->
                        <!-- 商品金额 default金额 -->
                        <div style="margin-left: 10px;" v-if="layout == 'pc'">
                            <div class="default-text default-act-goods-price on-line-text pc-default-price-line-height pc-default-act-goods-price"
                                v-if="goods.storePrice !== goods.goodsPrice">
                                {{ $t('groupAct.originalPrice') }}{{ $t('moneyUnit') }}{{ goods.goodsPrice }}
                            </div>
                        </div>
                    </div>
                </div>
                <!-- pc 展示 -->
                <div style="margin-top: 8px;" v-if="layout == 'pc'">
                    <!-- 立即购买 -->
                    <div class="buy-btn buy pointer" @click.stop="addBuyGoods(goods)">
                        {{ $t('button.buy') }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>

import memberTips from "@/components/Member/memberTip.vue"
import { onMounted } from "vue";
const props = defineProps({
    goodsList: {
        type: Array,
        required: true,
        default: []
    },
    width: {
        type: String,
        default: ''
    }
})
let layout = useState("layout");
const emit = defineEmits(['addBuyGoods']) //获取父组件的方法emit
const addBuyGoods = (goods) => {
    emit('addBuyGoods', goods)
}

</script>
<style lang="scss" scoped>
@import "@/assets/css/group/goodsItem";
</style>