<template>
    <div class="flex flex-wrap" :class="[layout !== 'pc' ? 'just-between' : '']">
        <div v-for="goods in props.goodsList" :key="goods.id" class="product-goods"
            :class="[layout == 'pc' ? 'pc-product-more' : '']"   :style="{ width: props.width }">
            <div class="image-wrapper-goods">
                <img class="img"
                    :style="{ width: '100%', height: layout == 'pc' ? '244px' : '171px' }"
                    mode="scaleToFill" v-if="props.actInfo.groupType != 1 && goods.ggImg" :src="goods.ggImg.fullPath" />
                <img class="img"
                    :style="{ width: '100%', height: layout == 'pc' ? '244px' : '171px' }"
                    mode="scaleToFill" v-if="props.actInfo.groupType == 1 && goods.groupAcc"
                    :src="goods.groupAcc.fullPath" />
                <div class="goods-tips flex">
                    <Tips v-if="goods.goodsChoiceType == 5" :text="$t('goodsDetail.serviceTips')" :position="false" bgColor="red" />
                    <Tips v-if="goods.goodsChoiceType == 7" :text="$t('packageGoods.packageText')" :position="false"
                        bgColor="#f0ad4e" />
                    <Tips v-if="goods.goodsTransfee == 1" :text="$t('home.transfee')" :position="false" bgColor="red" />
                </div>
            </div>
            <!-- <div class="act-slogan ">{{ goods.goodsAdWords }} slogan</div> -->
            <div :class="[layout == 'pc' ? 'pc-cover-product-more' : 'h5-product-more']">
                <div class="goods-name fontW" :class="[layout == 'pc' ? 'pc-goods-name' : 'h5-goods-name']">
                    {{ goods.ggName }}
                </div>
                <div>
                    <!-- 商品金额 default金额 -->
                    <div style="min-height:20px;">
                        <div class="default-text default-act-goods-price pc-default-act-goods-price"
                            v-if="(props.actInfo.groupType == 0 || props.actInfo.groupType == 2) && goods.goodsPrice > goods.ggPrice">
                            {{ props.actInfo.groupType == 0 ? $t('groupAct.originalPrice') :
                                $t('groupAct.futurePrice') }}
                            {{ $t('moneyUnit') }}{{ goods.goodsPrice }}
                        </div>
                    </div>
                    <div class="price flex align-items-center fontW act-goods-price"
                        :class="[layout == 'pc' ? 'pc-big-goods-price' : '']"
                        v-if="props.actInfo.groupType == 0 || props.actInfo.groupType == 2">
                        <div>{{ $t('moneyUnit') }}</div>
                        <div>{{ goods.ggPrice }}</div>
                    </div>
                    <div class="price flex align-items-center fontW act-goods-price"
                        :class="[layout == 'pc' ? 'pc-big-goods-price' : '']" v-if="props.actInfo.groupType == 1">
                        <div>{{ $t('moneyUnit') }}</div>
                        <div>{{ goods.groupPrice }}</div>
                    </div>
                </div>
                <div style="margin-top: 8px;">
                    <!-- 立即购买 -->
                    <div class="buy-btn buy pointer" :class="[layout == 'pc' ? 'act-buy-btn' : '']"
                        v-if="props.actInfo.status !== -2 && props.actInfo.status !== 2"
                        @click.stop="addBuyGoods(goods)">
                        {{ $t('button.buy') }}
                    </div>
                    <!-- 活动已结束  -->
                    <div class="buy-btn activity-end  pointer" :class="[layout == 'pc' ? 'act-buy-btn' : '']"
                        v-if="props.actInfo.status == -2">
                        {{ $t('member.activitiyEnd') }}
                    </div>
                    <!-- 活动即将开始  -->
                    <div class="buy-btn buy " :class="[layout == 'pc' ? 'act-buy-btn' : '']"
                        v-if="props.actInfo.status == 2">
                        {{ $t('groupAct.actAboutBegin') }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted } from "vue";
const props = defineProps({
    goodsList: {
        type: Array,
        required: true,
        default: []
    },
    actInfo: {
        type: [Object, String],
        required: true,
        default: {}
    },
    width: {
        type: [Object, String],
        required: true,
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