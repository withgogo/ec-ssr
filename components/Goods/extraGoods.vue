<template>
    <div class="swiperBox  flex just-between align-items-center">
        <svg-icon name="pre" size="32" @click="clickLeft"></svg-icon>
        <div class="swiper">
            <ul class="flex swiperList" :style="{
                transform: 'translateX(' + translate + 'px)',
                transition: swiper.tsion ? 'all 0.5s' : 'none',
            }" v-if="props.goodsList && props.goodsList.length > 0">
                <li class="pc-product-goods border " v-for="goods in props.goodsList" @click="addBuyGoods(goods)"
                    :key="swiper.id">
                    <div class="image-wrapper-goods">
                        <img :style="{ width: '100%', height: '210px' }" mode="scaleToFill"
                            v-if="goods && goods.accessoryDto !== null" :alt="goods.goodsName"
                            :src="goods.accessoryDto.fullPath" />
                    </div>
                    <!-- pc 展示 -->
                    <div class="pc-cover-product-more">
                        <div  class="act-slogan slogan">{{ goods.goodsAdWords }}</div>
                        <div class="goods-name fontW pc-goods-name">
                            {{ goods.goodsName }}
                        </div>
                        <div class="flex">
                            <!-- 售价 -->
                            <div class="price flex align-items-center fontW act-goods-price pc-big-goods-price">
                                <div>{{ $t('moneyUnit') }}</div>
                                <div>{{ goods.extraPrice }}</div>
                            </div>
                            <!-- 商品金额 default金额 -->
                            <div style="margin-left: 10px;">
                                <div class="default-text default-act-goods-price on-line-text pc-default-price-line-height"
                                    v-if="goods.storePrice !== goods.extraPrice">
                                    {{ $t('groupAct.originalPrice') }}{{ $t('moneyUnit') }}{{ goods.storePrice }}
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <svg-icon name="next" size="32" @click="clickRight"></svg-icon>
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

let translate = computed(() => {
    // 每次平移的宽度
    return swiper.translateX * 225;
})
let swiper = reactive({
    translateX: 0,
    tsion: true,
})
//图片轮播点击
let clickLeft = () => {
    if (Math.abs(swiper.translateX) >= props.goodsList.length - 1) {

    } else {
        if (props.goodsList.length > 3) {
            swiper.translateX--;
        }
    }
    swiper.tsion = true;
    // console.log(swiper.translateX)
    if (swiper.translateX < 0) {
        setTimeout(() => {
            swiper.tsion = false;
        }, 500);
    }
}

let clickRight = () => {
    if (swiper.translateX == 0) { } else {
        swiper.translateX++;
    }
    swiper.tsion = true;
    // console.log(swiper.translateX)
    if (swiper.translateX > props.goodsList.length - 1) {
        setTimeout(() => {
            swiper.tsion = false;
        }, 500);
    }
}
</script>

<style lang="scss" scoped>
.swiperBox {
    height: 320px;
    width: 100%;
    position: relative;
}

.imgright {
    right: 0;
    top: 0;
}


.swiper {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
}

.swiperList {
    height: 100%;
    padding: 0;
    margin: 0;
    position: absolute;
    top: 0;
    overflow: hidden;
}

.swiperList li {
    padding: 0;
    margin: 0;
    width: 210px;
    margin-right: 15px;
    list-style: none;
    cursor: pointer;
}

.pc-product-goods {
    border-radius: 7px;
    background-color: #fafafa;
    margin: 0 0 10px 0;
    box-shadow: 0px 4px 7px 0px #D8D8D8;
    overflow: hidden;
    margin-bottom: 10px;
}

@import "@/assets/css/group/goodsItem";
</style>