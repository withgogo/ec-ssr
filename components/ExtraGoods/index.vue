<template>

    <!-- 加价购 商品 -->
    <van-popup v-model:show="props.extraPlanClass" @close="hideExtra()" @closed="hideExtra()" round position="bottom"
        :style="{ height: '70%' }">
        <div class="extra-plan">
            <div class="h5-extra-goods font14" v-if="props.extraGoodsAllItem">
                <!-- 可选购商品数量 -->
                {{ $t('extraGoods.selectedGoods') }} {{
                    props.extraGoodsAllItem.extra_msg?.choiceNum }},
                <!-- 已选购 -->
                {{ $t('extraGoods.selected') }}
                {{ props.choiceExtraGoods.length }}
            </div>
            <div class="h5-goods-content" v-for="goods, indexAll in props.extraGoodsDtoList" :key="indexAll">
                <!-- 商品数据 -->
                <div class="flex1 border-b" style="padding-bottom: 10px;">
                    <div class="flex flex">
                        <!-- 商品图片 -->
                        <van-image v-if="goods.accessoryDto && goods.accessoryDto.fullPath"
                            :src="goods.accessoryDto?.fullPath" class="h5-goods-img">
                        </van-image>
                        <div class="flex h5-goods-item flex1">
                            <!-- 商品名称 -->
                            <div class="h5-goods-name">{{ goods.goodsName }}</div>
                            <!-- 商品规格 -->
                            <div class="h5-goods-spec-info" style="background-color: #fff;"
                                v-if="props.choiceExtraGoods.find(item => Number(item.goodsId) == Number(goods.goodsId))">
                                <span v-if="goods.spec_info" v-html="goods.spec_info"></span>
                                <span v-if="goods.count > 0">
                                    <!-- 数量 -->
                                    {{ $t('order.goodsCount') }}{{ goods.count }}</span>
                            </div>
                            <!-- 价格 -->
                            <div class="flex align-items-center">
                                <div class="flex align-items-center mright5">
                                    <div class="price">
                                        <span class="money-unit">{{ $t('moneyUnit') }} </span>
                                        <span class="money-unit-price">{{ goods.extraPrice }} </span>
                                    </div>
                                </div>
                                <div v-if="goods.storePrice < goods.extraPrice"
                                    class="default-text on-line-text default-act-goods-price">
                                    {{ $t('moneyUnit') }} {{ goods.storePrice }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex  justify-content-end">
                        <div></div>
                        <van-tag size="large" color="#00ACC8" text-color="#00ACC8"
                            v-if="props.choiceExtraGoods.find(item => Number(item.goodsId) == Number(goods.goodsId))"
                            plain @click="showExtraSpec(goods, 'delete')">
                            <!-- 取消选择 -->
                            {{ $t('extraGoods.cancelExtraSpec') }}</van-tag>
                        <van-tag size="large" color="#00ACC8" text-color="#fff" v-else
                            @click="showExtraSpec(goods, 'add')">
                            <!-- 选择 -->
                            {{ $t('extraGoods.chooseGoods') }}</van-tag>
                    </div>
                </div>
            </div>
        </div>
    </van-popup>
</template>
<script setup>
import {
    onMounted,
    reactive,
    watch
} from "vue";

const router = useRouter()
const route = useRoute()

const props = defineProps({
    extraPlanClass: {
        type: Boolean,
        default: false,
    },
    extraGoodsAllItem: {
        type: Object,
        default: {},
    },
    extraGoodsDtoList: {
        type: Array,
        default: [],
    },
    choiceExtraGoods: {
        type: Array,
        default: [],
    }
})
let layout = useState("layout");
const emit = defineEmits(["showExtraSpec", "hideExtra"]);

const showExtraSpec = (item, type) => {
    emit("showExtraSpec", item, type);
}
const hideExtra = () => {
    emit("hideExtra");
}

</script>
<style lang="scss" scoped>
@import "@/assets/css/cart/index";
</style>