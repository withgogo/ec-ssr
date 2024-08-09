<template>
    <ClientOnly>
        <div v-if="props.goods?.goodsInfo" class="pc-order-goods-border">
            <div class="flex">
                <div style="width: 360px; " class="pc-order-border flex flex-center">
                    <!-- 商品 -->
                    {{ $t('earlyBirdGift.goods') }}
                </div>
                <div style="width: 120px; " class="pc-order-border flex flex-center">
                    <!-- 商品图片 -->
                    {{ $t('earlyBirdGift.goods') }}{{ $t('groupAct.goodsPhoto') }}
                </div>
                <div style="width: 100px; " class="pc-order-border flex flex-center">
                    <!-- 单价 -->
                    {{ $t('groupAct.goodsPrice') }}
                </div>
                <div style="width: 100px; " class="pc-order-border flex flex-center">
                    <!-- 数量  -->
                    {{ $t('groupAct.goodsCount') }}
                </div>
                <div style="width: 140px; " class="pc-order-border flex flex-center">
                    <!-- 规格  -->
                    {{ $t('groupAct.spec') }}
                </div>
                <div style="width: 100px; " class="pc-order-border flex flex-center">
                    <!-- 总价   -->
                    {{ $t('groupAct.goodsAmount') }}
                </div>
            </div>

            <!-- 主商品 -->
            <div v-for="item in props.goods?.goodsInfo">
                <!-- 主商品 -->
                <div class="flex">
                    <!-- 名字 -->
                    <div style="width: 360px; " class="pc-order-border  align-items-center">
                        <Tips style="display: inline" v-if="item.serviceTypeName" :text="item.serviceTypeName"
                            :position="false" bgColor="#f0ad4e" />
                        <!-- 赠品 -->
                        <Tips style="display: inline" v-if="item.type == 'proGift'" :text="$t('order.gift')"
                            :position="false" bgColor="#f06c7a" />
                        <!-- 加购 -->
                        <Tips style="display: inline" v-if="item.extraActStatus == 1" :text="$t('order.extraGoodsTips')"
                            :position="false" bgColor="#f06c7a" />
                        <!-- 套餐 -->
                        <Tips style="display: inline" v-if="item.goods_choice_type == 7"
                            :text="$t('packageGoods.packageText')" :position="false" bgColor="#f06c7a" />
                        <div class="flex">
                            <el-popover v-if="item.goods_name" placement="top-start" title="" width="200"
                                trigger="hover" :content="item.goods_name">
                                <template #reference>
                                    <span link>
                                        <el-button text type="primary" @click="toGoodsInfo(item)">
                                            {{ item.goods_name && item.goods_name.length > 15 ?
                                                item.goods_name.substring(0, 15) + '...' : item.goods_name }}
                                        </el-button>
                                    </span>
                                </template>
                            </el-popover>
                        </div>

                    </div>
                    <!-- 图片 -->
                    <div style="width: 120px; " class="flex flex-center pc-order-border">
                        <img v-if="props.type == 'posPay'" :src="item.fullPath" class="pc-order-img-size" />
                        <img v-else :src="props.orderInfo?.path_header + item.goods_mainphoto_path"
                            class="pc-order-img-size" />

                    </div>
                    <!-- 单价 -->
                    <div style="width: 100px; " class="flex flex-center pc-order-border">
                        {{ $t("moneyUnit") }}{{ useMathCeil(item.goods_price) }}
                        <!-- / 折扣价格 -->
                        <div v-if="item.rebate_price > 0">
                            <img style="width: 30px;height: 30px;" :src="item.rebate_level_info.levelIcon" />
                            {{ item.rebate_level_info.levelName }}
                            {{ $t("moneyUnit") }}
                            <div class="price">{{ useMathCeil(item.rebate_price) }}</div>
                        </div>
                    </div>
                    <!-- 数量 -->
                    <div style="width: 100px; " class="flex flex-center pc-order-border">
                        {{ item.goods_count }}
                    </div>
                    <!-- 规格 -->
                    <div style="width: 140px; " class="flex flex-center pc-order-border pc-font12 default-text">
                        <p v-html="item.goods_gsp_val"></p>
                    </div>
                    <!-- 总价 -->
                    <div style="width: 100px; " class="flex flex-center pc-order-border">
                        {{ $t("moneyUnit") }} {{ useMathCeil(item.goods_count * item.goods_price) }}
                    </div>
                </div>
                <!-- 套餐 子商品 -->
                <div v-if="item.packGoodsInfo">
                    <div v-for="packages, indexP in item.packGoodsInfo">
                        <div class="flex">
                            <!-- 名字 -->
                            <div class="pc-order-border flex align-items-center pc-child-width">
                                <el-popover v-if="packages.goods_name" placement="top-start" title="" width="200"
                                    trigger="hover" :content="packages.goods_name">
                                    <template #reference>
                                        <span link>
                                            {{ packages.goods_name && packages.goods_name.length > 15 ?
                                                packages.goods_name.substring(0, 15) + '...' : packages.goods_name }}
                                        </span>
                                    </template>
                                </el-popover>
                            </div>
                            <!-- 图片 -->
                            <div style="width: 120px; " class="flex flex-center pc-order-border">
                                <img v-if="packages.fullPath" :src="packages.fullPath" class="pc-order-img-size" />
                            </div>
                            <!-- 不显示套餐子商品价格 -->
                            <div style="width: 100px; " class="flex flex-center pc-order-border">
                            </div>
                            <!-- 数量 -->
                            <div style="width: 100px; " class="pc-order-border flex flex-center">
                                <!-- v-if="packages.inventory_type=='all'" -->
                                <p>{{ Number(packages.goods_count) }}</p>
                            </div>
                            <!-- 规格 -->
                            <div style="width: 140px; " class="pc-order-border pc-font12 default-text">
                                <p v-if="packages.spec && packages.spec.length > 0" v-for="spec in packages.spec"
                                    :key="spec.goods_gsp_ids + 's'">
                                <div class="flex default-text align-items-center pc-font12 ">
                                    <!-- 规格 -->
                                    <p v-html="spec.goods_gsp_val"></p>
                                    <!-- 数量 -->
                                    <p style="margin:0 10px;">x{{ spec.goods_count }}</p>
                                </div>
                                </p>
                            </div>
                            <!-- 总价 -->
                            <div style="width: 100px; " class="pc-order-border flex flex-center">
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 组合 子商品 -->
                <div v-if="item.combin_suit_info">
                    <div v-for="(zhuhe, gIndex) in JSON.parse(item.combin_suit_info).goods_list">
                        <div class="flex">
                            <!-- 名字 -->
                            <div class="pc-order-border  align-items-center pc-child-width">
                                <Tips style="display: inline" v-if="JSON.parse(item.combin_suit_info).suit_name"
                                    :text="JSON.parse(item.combin_suit_info).suit_name" :position="false"
                                    bgColor="#f0ad4e" />
                                <div class="flex">
                                    <el-popover v-if="zhuhe.name" placement="top-start" title="" width="200"
                                        trigger="hover" :content="zhuhe.name">
                                        <template #reference>
                                            <span link>
                                                {{ zhuhe.name && zhuhe.name.length > 15 ?
                                                    zhuhe.name.substring(0, 15) + '...' : zhuhe.name }}
                                            </span>
                                        </template>
                                    </el-popover>
                                </div>

                            </div>
                            <!-- 图片 -->
                            <div style="width: 120px; " class="flex flex-center pc-order-border">
                                <img :src="zhuhe.img" class="pc-order-img-size" />
                            </div>
                            <!-- 价格 -->
                            <div style="width: 100px; " class="flex flex-center pc-order-border">
                                {{ $t("moneyUnit") }} {{ useMathCeil(zhuhe.price) }}
                            </div>
                            <!-- 数量 -->
                            <div style="width: 100px; " class="pc-order-border flex flex-center">
                                {{ item.goods_count }}
                            </div>
                            <!-- 规格 -->
                            <div style="width: 140px; " class="pc-order-border pc-font12 default-text">
                                <p v-if="zhuhe.spec && zhuhe.spec.length > 0" v-for="spec, indexSpec in zhuhe.spec"
                                    :key="spec.spec_id">
                                <div class="flex default-text pc-font12  align-items-center">
                                    <!-- 规格 -->
                                    <p v-html="spec.spec_property"></p>
                                </div>
                                </p>
                            </div>
                            <!-- 总价 -->
                            <div style="width: 100px; " class="pc-order-border flex flex-center">
                                {{ $t("moneyUnit") }}{{ useMathCeil(item.goods_count * zhuhe.price) }}
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 只有不是加购订单的才可以   不是子订单，不是pos支付  -->
                <div v-if="props.type != 'child' && props.type != 'posPay' && (!item.type || item.type !== 'proGift')
                    && !item.serviceTypeName
                    && (props.orderInfo?.order_main !== 0 || props.orderInfo?.order_cat == 14)
                    && props.orderInfo?.childList?.length == 0">
                    <div v-if="props.orderInfo && props.orderInfo?.order_status == 40 && (!props.orderInfo?.childList || props.orderInfo?.childList.length == 0)"
                        style="padding:20px 0;border-bottom:1px solid #DDD;" class="flex justify-content-end ">
                        <!-- 加入购物车 -->
                        <div v-if="props.orderInfo?.order_type !== 'POS'" class="mright5">
                            <el-button style="padding: 4px 10px;" @click="addCart(item)">
                                {{ $t('button.addCart') }}
                            </el-button>
                        </div>
                        <!-- 我要退貨退款 -->
                        <div v-if="(item.goods_return_status == null || !item.goods_return_status || item.goods_return_status == -1)"
                            class="mright5">
                            <el-button style="padding: 4px 10px;" @click="goSalesReturn(item, props.orderInfo)"
                                type="danger">
                                {{ $t('order.needReturn') }}
                            </el-button>
                        </div>
                        <div v-else-if="item.goods_return_status == 8" class="mright5">
                            <el-button style="padding: 4px 10px;">
                                {{ $t('order.goodsRefund') }}
                            </el-button>
                        </div>
                        <div v-else>
                            <el-button style="padding: 4px 10px;">
                                {{ $t('order.returnOrder.salesReturn') }}
                            </el-button>
                        </div>
                    </div>
                </div>

            </div>
            <!-- 季礼/入会礼,只有子订单时才展示，不展示在主订单上 -->
            <div
                v-if="props.orderInfo && props.orderInfo?.order_main == 0 && props.orderInfo?.orderMemberCardGiftInfoDtoList && props.orderInfo?.orderMemberCardGiftInfoDtoList.length > 0">
                <div v-for="giftMember, indexs in props.orderInfo?.orderMemberCardGiftInfoDtoList">
                    <div v-if="giftMember.goodsList && giftMember.goodsList.length > 0"
                        v-for="goodsGift, indexG in giftMember.goodsList">
                        <div class="flex">
                            <!-- 名字 -->
                            <div style="width: 360px; " class="pc-order-border  align-items-center">
                                <!-- season_gift  季礼 -->
                                <Tips style="display: inline" :position="false"
                                    v-if="giftMember.type == 'season_gift' && giftMember.goodsList && giftMember.goodsList.length > 0"
                                    :text="$t('order.seasonGift')" bgColor="#f06c7a" />
                                <!-- member_card_gift  入会礼 -->
                                <Tips style="display: inline" :position="false"
                                    v-if="giftMember.type == 'member_card_gift' && giftMember.goodsList && giftMember.goodsList.length > 0"
                                    :text="$t('order.memberCardGift')" bgColor="#f06c7a" />
                                <!-- upgrade_gift  升等礼 -->
                                <Tips style="display: inline" :position="false"
                                    v-if="giftMember.type == 'upgrade_gift' && giftMember.goodsList && giftMember.goodsList.length > 0"
                                    :text="$t('order.upgradeGift')" bgColor="#f06c7a" />
                                <div class="flex">

                                    <el-popover v-if="goodsGift.goods_name" placement="top-start" title="" width="200"
                                        trigger="hover" :content="goodsGift.goods_name">
                                        <template #reference>
                                            <span link>
                                                {{ goodsGift.goods_name && goodsGift.goods_name.length > 15 ?
                                                    goodsGift.goods_name.substring(0, 15) + '...' : goodsGift.goods_name }}
                                            </span>
                                        </template>
                                    </el-popover>
                                </div>
                            </div>
                            <!-- 图片 -->
                            <div style="width: 120px; " class="flex flex-center pc-order-border">
                                <img v-if="goodsGift.fullPath" :src="goodsGift.fullPath" class=" pc-order-img-size" />
                            </div>
                            <!-- 单价 -->
                            <div style="width: 100px; " class="flex flex-center pc-order-border">
                                {{ $t("moneyUnit") }}{{ useMathCeil(goodsGift.goods_all_price) }}
                            </div>
                            <!-- 数量 -->
                            <div style="width: 100px; " class="flex flex-center pc-order-border">
                                {{ goodsGift.goods_count }}
                            </div>
                            <!-- 规格 -->
                            <div style="width: 140px; " class="flex flex-center pc-order-border pc-font12 default-text">
                                <p v-html="goodsGift.goods_gsp_val"></p>
                            </div>
                            <!-- 总价 -->
                            <div style="width: 100px; " class="flex flex-center pc-order-border">
                                {{ $t("moneyUnit") }} {{ useMathCeil(goodsGift.goods_count * goodsGift.goods_all_price)
                                }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 早鸟礼 -->
            <div v-if="props.orderInfo?.earlyBirdsJson?.length > 0">
                <div v-for="(birdItem, gIndex) in props.orderInfo?.earlyBirdsJson">
                    <div class="flex">
                        <!-- 名字 -->
                        <div class="pc-order-border  align-items-center pc-child-width">
                            <Tips style="display: inline" :text="$t('earlyBirdGift.birdGiftTitle')" :position="false"
                                bgColor="#f0ad4e" />
                            <div class="flex">
                                <!--type:0商品 1:积分 2:其他  -->
                                <el-popover v-if="birdItem.type == 0 && birdItem.goodsName" placement="top-start"
                                    title="" width="200" trigger="hover" :content="birdItem.goodsName">
                                    <template #reference>
                                        <span link>
                                            {{ birdItem.goodsName && birdItem.goodsName.length > 15 ?
                                                birdItem.goodsName.substring(0, 15) + '...' : birdItem.goodsName }}
                                        </span>
                                    </template>
                                </el-popover>
                                <!-- 积分 -->
                                <div v-if="birdItem.type == 1">
                                    {{ $t('earlyBirdGift.rewardPoints') }}:{{ birdItem.integral }}{{
                                        $t('earlyBirdGift.fen')
                                    }}
                                </div>
                                <!-- 其他 -->
                                <div v-if="birdItem.type == 2 && birdItem.desc"
                                    style="word-wrap: break-word;width:320px">
                                    <div class="" v-html="birdItem.desc"></div>
                                </div>
                            </div>


                        </div>
                        <!-- 图片 -->
                        <div style="width: 120px; " class="flex flex-center pc-order-border">
                            <img v-if="birdItem.type == 0" :src="birdItem.photoPath" class="pc-order-img-size" />
                        </div>
                        <!-- 价格 -->
                        <div style="width: 100px; " class="flex flex-center pc-order-border">

                        </div>
                        <!-- 数量 -->
                        <div style="width: 100px; " class="pc-order-border flex flex-center">
                            {{ Number(birdItem.onceQty) }}
                        </div>
                        <!-- 规格 -->
                        <div style="width: 140px; " class="pc-order-border ">

                        </div>
                        <!-- 总价 -->
                        <div style="width: 100px; " class="pc-order-border flex flex-center">

                        </div>
                    </div>
                </div>
            </div>
            <!-- 满赠 -->
            <div v-if="props.orderInfo?.gift_infos?.length > 0">
                <div v-for="(gift, gIndex) in props.orderInfo?.gift_infos">
                    <div class="flex">
                        <!-- 名字 -->
                        <div class="pc-order-border  align-items-center pc-child-width">
                            <Tips style="display: inline" :text="$t('order.gift')" :position="false"
                                bgColor="#f0ad4e" />
                            <div class="flex">
                                <!--type:0商品 1:积分 2:其他  -->
                                <el-popover v-if="gift.goods_name" placement="top-start" title="" width="200"
                                    trigger="hover" :content="gift.goods_name">
                                    <template #reference>
                                        <span link>
                                            {{ gift.goods_name && gift.goods_name.length > 15 ?
                                                gift.goods_name.substring(0, 15) + '...' : gift.goods_name }}
                                        </span>
                                    </template>
                                    x{{ gift.goods_count }}
                                </el-popover>
                            </div>


                        </div>
                        <!-- 图片 -->
                        <div style="width: 120px; " class="flex flex-center pc-order-border">
                            <img v-if="gift.goods_main_photo" :src="gift.goods_main_photo" class="pc-order-img-size" />
                        </div>
                        <!-- 价格 -->
                        <div style="width: 100px; " class="flex flex-center pc-order-border">

                        </div>
                        <!-- 数量 -->
                        <div style="width: 100px; " class="pc-order-border flex flex-center">
                            {{ gift.give_count }}
                        </div>
                        <!-- 规格 -->
                        <div style="width: 140px; " class="pc-order-border ">

                        </div>
                        <!-- 总价 -->
                        <div style="width: 100px; " class="pc-order-border flex flex-center">

                        </div>
                    </div>
                </div>
            </div>

            <!-- 综合计算 -->
            <div style="width:1000px;padding: 10px 0" class="flex just-between ">
                <div style="width: 50%;word-wrap: break-word;">
                    <span> {{ $t('otherWords.note') }}:{{ props.orderInfo?.storeNote }}</span>
                </div>
                <div style="width: 30%; ">

                    <!-- 运费 -->
                    <div>
                        <span
                            v-if="(props.type == 'child' || props.goods?.type == 'normal') && (props.orderInfo?.ship_price && useMathCeil(props.orderInfo?.ship_price) > 0)">
                            <span class="pc-text-line"> {{ $t('order.shipPrice') }}:</span>
                            <span class="price">
                                + {{
                                    $t("moneyUnit")
                                }}{{
                                    useMathCeil(props.orderInfo?.ship_price) }}
                            </span>
                        </span>
                        <!-- 加购 -->
                        <span
                            v-if="(props.goods?.type == 'extra') && (props.extraOrderFormDto && props.extraOrderFormDto?.ship_price && useMathCeil(props.extraOrderFormDto?.ship_price) > 0)">
                            <span class="pc-text-line">{{ $t('order.shipPrice') }}:</span>
                            <span class="price">
                                +{{ $t("moneyUnit") }}{{
                                    useMathCeil(props.extraOrderFormDto?.ship_price) }}
                            </span>
                        </span>
                    </div>

                    <!-- 优惠券 -->
                    <p
                        v-if="props.orderInfo?.couponDiscountAmount && useMathCeil(props.orderInfo?.couponDiscountAmount) > 0">
                        <span class="pc-text-line">{{ $t("coupon.coupon") }}:</span>
                        -{{ $t("moneyUnit") }} {{ useMathCeil(props.orderInfo?.couponDiscountAmount) }}
                    </p>
                    <!-- 优惠码 -->
                    <p
                        v-if="props.orderInfo?.couponCodeDiscountAmount && useMathCeil(props.orderInfo?.couponCodeDiscountAmount) > 0">
                        <span class="pc-text-line">{{ $t("coupon.couponCode") }}:</span>
                        -{{ $t("moneyUnit") }} {{ useMathCeil(props.orderInfo?.couponCodeDiscountAmount) }}
                    </p>
                    <!-- 积分 -->
                    <div>
                        <span
                            v-if="(props.type == 'child' || props.goods?.type == 'normal') && (props.orderInfo?.integral_deduct_amount && useMathCeil(props.orderInfo?.integral_deduct_amount) > 0)">
                            <span class="pc-text-line">{{ $t("order.integralDeduct") }}:</span>
                            <span class="price">
                                -{{ $t("moneyUnit") }}{{ props.orderInfo?.integral_deduct_amount }}
                            </span>
                        </span>
                        <span
                            v-if="props.goods?.type == 'extra' && (props.extraOrderFormDto && props.extraOrderFormDto?.integral_deduct_amount && useMathCeil(props.extraOrderFormDto?.integral_deduct_amount) > 0)">
                            <span class="pc-text-line">{{ $t("order.integralDeduct") }}:</span>
                            <span class="price">
                                -{{ $t("moneyUnit") }}{{ props.extraOrderFormDto?.integral_deduct_amount }}
                            </span>
                        </span>
                    </div>
                    <!-- 实际支付 -->
                    <h3><span class="pc-text-line">{{ $t('otherWords.actualPay') }}:</span>
                        <!-- pos结账 金额为商品金额 -->
                        <span v-if="props.type == 'posPay'">
                            <span class="price" v-if="(props.orderInfo && props.goods?.type == 'normal')">{{
                                $t("moneyUnit") }}{{
                                    useMathCeil(props.orderInfo?.goodsAmount) }}</span>
                            <span class="price" v-if="props.extraOrderFormDto && props.goods?.type == 'extra'"> {{
                                $t("moneyUnit") }}{{
                                    useMathCeil(props.extraOrderFormDto?.goodsAmount) }}</span>
                        </span>
                        <span v-else>
                            <span class="price"
                                v-if="props.type == 'child' || (props.orderInfo && props.goods?.type == 'normal')">{{
                                    $t("moneyUnit") }}{{
                                    useMathCeil(props.orderInfo?.totalPrice) }}</span>
                            <span class="price" v-if="props.extraOrderFormDto && props.goods?.type == 'extra'"> {{
                                $t("moneyUnit") }}{{
                                    useMathCeil(props.extraOrderFormDto?.totalPrice) }}</span>

                        </span>


                    </h3>
                </div>
            </div>
        </div>
    </ClientOnly>
</template>

<script setup>
const router = useRouter()
const route = useRoute()
const props = defineProps({
    goods: {
        type: Object,
        required: true,
        default: []
    }, orderInfo: {
        type: Object,
        required: true,
        default: []
    },
    extraOrderFormDto: {
        type: Object,
        required: false,
        default: []
    },
    // 主订单是有加购订单的，子订单没有加购订单，为子订单时，显示原始的运费/积分/实际金额，主订单时，有加购的显示，加购的
    type: {
        type: String,
        required: false,
        default: null
    },
})
const emit = defineEmits(["addCart", "goSalesReturn","toGoodsInfo"]);
// 到商品详情
const toGoodsInfo = (goods) => {
    emit("toGoodsInfo", goods);
}

// 加入购物车 
const addCart = (item) => {
    emit("addCart", item);
}
const goSalesReturn = (item, goodsInfo) => {
    emit("goSalesReturn", item, goodsInfo);
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/pc-style.scss";
@import "@/assets/css/order/orderList";

.el-table__row.warning-row {
    background: var(--main-color);
}

.el-table__row.warning-row>td.el-table__cell {
    background: var(--main-color);
}
</style>