<template>
    <div v-for="(goods, index) in props.goodsAllsList" :key="index" class="h5-pay-confirm bgfff">
        <div class="h5-goods-title-tag flex" style="padding-bottom: 0;">
            <!-- 赠品 -->
            <van-tag v-if="goods.type == 'proGift'" class="mright5" type="primary" size="medium" color="#f06c7a"
                text-color="#fff">
                {{ $t("order.gift") }}
            </van-tag>
            <!-- 服务商品 -->
            <van-tag v-if="goods.serviceTypeName" class="mright5" type="primary" size="medium" color="#f06c7a"
                text-color="#fff">
                {{ goods.serviceTypeName }}
            </van-tag>
            <!-- 套餐 -->
            <van-tag v-if="goods.goods_choice_type == 7" class="mright5" type="primary" size="medium" color="#f06c7a"
                text-color="#fff">
               {{ $t("packageGoods.packageText") }}
            </van-tag>
        </div>
        <!-- 商品 -->

        <div class="h5-goods-content">
            <!-- 商品数据 -->
            <div class="flex1">
                <div class="flex flex">
                    <!-- 商品图片 -->
                    <van-image v-if="goods.fullPath" :src="goods.fullPath" class="h5-goods-img">
                    </van-image>
                    <div class="flex h5-goods-item flex1">
                        <!-- 商品名称 -->
                        <div class="h5-goods-name">{{ goods.goods_name }}</div>
                        <!-- 商品规格 -->
                        <div class="h5-goods-spec-info" v-if="goods.goods_gsp_val !== ''">
                            <span v-html="goods.goods_gsp_val"></span>
                        </div>
                        <div>
                            <!-- 原价 -->
                            <div class="default-text on-line-text default-act-goods-price">
                                {{ $t('moneyUnit') }} {{ goods.goods_price }}
                            </div>
                            <!-- 价格 -->
                            <div class="flex align-items-center just-between">
                                <div class="price font14">
                                    <span> {{ $t('moneyUnit') }}{{ goods.goods_price * goods.goods_count
                                        }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 套餐 -->
                <div v-if="goods.packageInfoList && goods.packageInfoList.length > 0"
                    class="flex align-items-center  h5-goods-content" v-for="packages in goods.packageInfoList"
                    :key="packages.id">
                    <div class="flex flex1" style="margin-left: 5px;">
                        <!-- 商品图片 -->
                        <van-image v-if="packages.fullPath" :src="packages.fullPath" class="h5-goods-img-extra">
                        </van-image>
                        <div class="flex h5-goods-item flex1">
                            <!-- 商品名称 -->
                            <div class="h5-goods-name">{{ packages.goods_name }}</div>
                            <!-- 商品规格 -->
                            <div class="h5-goods-spec-info" v-if="packages.spec && packages.spec.length > 0"
                                v-for="spec in packages.spec" :key="spec.goods_gsp_ids + 's'">
                                <span v-html="spec.goods_gsp_val"> </span>
                                <div style="color: #333; margin-left: 20rpx;" v-if="packages.inventory_type == 'spec'">
                                    x{{ spec.goods_count }}</div>
                            </div>
                        </div>
                        <div class="h5-goods-limit-count" v-if="packages.inventory_type == 'all'">
                            x{{ packages.goods_count }}
                        </div>
                    </div>
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
const props = defineProps({
    goodsAllsList: {
        type: Array,
        required: true,
        default: []
    },
})
</script>

<style lang="scss" scoped>
@import "@/assets/css/cart/index";
@import "@/assets/css/payment/TWConfirmation";
</style>
