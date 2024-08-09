<template>
       <!-- 一排一个 -->
    <div v-if="props.bigShow">
        <div class="product-goods border flex" :class="[layout == 'pc' ? 'pc-product-one' : 'h5-product-one']"
            v-for="goods in props.goodsList" :key="goods.goodsInfoDto?.id">
            <div class="flex-col justify-content-center">
                <img :class="[layout == 'pc' ? 'pc-img-size-one' : 'h5-img-size-one']" mode="scaleToFill"
                    :src="goods.goodsInfoDto?.imgUrl" />
            </div>
            <div class="goods-info">
                <div class="goods-name fontW" :class="[layout == 'pc' ? 'pc-goods-name' : 'h5-goods-name']"
                    style="padding: 0;">
                    {{ goods.goodsInfoDto?.goodsName }}
                </div>
                <div>
                    <div class="flex">
                        <Tips v-if="goods.goodsChoiceType == 7" :text="$t('packageGoods.packageText')" :position="false"
                            bgColor="#f0ad4e" />
                        <Tips v-if="goods.goodsTransfee == 1" :text="$t('home.transfee')" :position="false"
                            bgColor="#D44F49" />
                    </div>

                    <div class="flex  align-items-center just-between">
                        <div class="flex  align-items-center ">
                            <!--商品金额  -->
                            <memberTips
                                v-if="goods.goodsInfoDto?.currentLevel && goods.goodsInfoDto?.currentLevel.rebate < 1">
                            </memberTips>
                            <div v-else :class="[layout == 'pc' ? 'pc-place-member' : 'h5-place-member']">
                            </div>
                            <!-- 会员价 -->
                            <div class="flex align-items-center price fontW act-goods-price"
                                :class="[layout == 'pc' ? 'pc-big-goods-price' : '']"
                                v-if="goods.goodsInfoDto?.rebatePrice > 0">
                                <div>{{ $t('moneyUnit') }}</div>
                                <div>{{ goods.goodsInfoDto?.rebatePrice }}
                                </div>
                            </div>
                            <!-- 一般价格 -->
                            <div class="flex align-items-center price fontW act-goods-price"
                                :class="[layout == 'pc' ? 'pc-big-goods-price' : '']" v-else>
                                <div>{{ $t('moneyUnit') }}</div>
                                <div>{{ goods.goodsInfoDto?.storePrice }}
                                </div>
                            </div>
                        </div>

                        <!-- 活动进行中 -->
                        <div class="buy-btn buy pointer"
                            v-if="props.actInfo.status !== -2 && props.actInfo.status !== 2"
                            @click.stop="addBuyGoods(goods)">
                            {{ $t('button.buy') }}
                        </div>
                        <!-- 活动即将开始   -->
                        <div class="buy-btn buy pointer" v-if="props.actInfo.status == 2">
                            {{ $t('groupAct.actAboutBegin') }}
                        </div>
                        <!-- 活动已结束  -->
                        <div class="buy-btn  activity-end " v-if="props.actInfo.status == -2" style="margin-top: 1px;">
                            {{ $t('member.activitiyEnd') }}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- 一排多个 -->
    <div v-else class="flex flex-wrap" :class="[layout !== 'pc' ? 'just-between' : '']">
        <div v-for="goods in props.goodsList" :key="goods.goodsInfoDto?.id" class="product-goods border"
            :class="[layout == 'pc' ? 'pc-product-more' : '']" :style="{ width: props.width }">
            <div class="image-wrapper-goods">
                <img class="img" :style="{ width: layout == 'pc' ? '242px' : '171px' , height: layout == 'pc' ? '242px' : '171px' }"
                    mode="scaleToFill" :src="goods.goodsInfoDto?.imgUrl" />

                <div class="goods-tips flex">
                    <Tips v-if="goods.goodsChoiceType == 7" :text="$t('packageGoods.packageText')" :position="false"
                        bgColor="#f0ad4e" />
                    <Tips v-if="goods.goodsTransfee == 1" :text="$t('home.transfee')" :position="false" bgColor="red" />
                </div>
            </div>
            <!-- <div class="act-slogan ">{{ goods.goodsInfoDto?.goodsAdWords }} slogan</div> -->
            <div :class="[layout == 'pc' ? 'pc-cover-product-more' : 'h5-product-more']">
                <div class="goods-name fontW" :class="[layout == 'pc' ? 'pc-goods-name' : 'h5-goods-name']">
                    {{ goods.goodsInfoDto?.goodsName }}
                </div>
                <div>
                    <memberTips v-if="goods.goodsInfoDto?.currentLevel && goods.goodsInfoDto?.currentLevel.rebate < 1">
                    </memberTips>
                    <div v-else :class="[layout == 'pc' ? 'pc-place-member' : 'h5-place-member']"></div>
                    <!-- 会员价 -->
                    <div class="price flex align-items-center fontW act-goods-price"
                        :class="[layout == 'pc' ? 'pc-big-goods-price' : '']" v-if="props.actInfo.rebatePrice > 0">
                        <div>{{ $t('moneyUnit') }}</div>
                        <div>{{ goods.goodsInfoDto?.rebatePrice }}</div>
                    </div>
                    <!-- 一般价格 -->
                    <div class="price flex align-items-center fontW act-goods-price"
                        :class="[layout == 'pc' ? 'pc-big-goods-price' : '']" v-else>
                        <div>{{ $t('moneyUnit') }}</div>
                        <div>{{ goods.goodsInfoDto?.storePrice }}</div>
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
import memberTips from "@/components/Member/memberTip.vue"
import Tips from "@/components/Tips/index.vue"
import { onMounted ,toRefs} from "vue";
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
    bigShow:{
        type: Boolean,
        default: false
    }
})
let layout = useState("layout");
const emit = defineEmits(['addBuyGoods']) //获取父组件的方法emit
const addBuyGoods = (goods) => {
    emit('addBuyGoods', goods)
}

</script>
<style lang="scss" scoped>
:deep(.van-badge--top-right) {
    top: 7px !important;
    right: 5px !important;
}

@import "@/assets/css/group/actGoods";
@import "@/assets/css/earlyBird/index";
@import "@/assets/css/group/goodsItem";
@import "@/assets/css/goods/packGoodsSpec";
</style>