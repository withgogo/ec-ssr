<template>
    <div class="member-tips">
        <!-- <svg-icon icon-class="member-price"  :width="1"  :height="1"/> -->
        <!-- 这里不使用svg-icon 是因为它的默认高度 且高度大范围超出，无法设置成标准样 -->
        <img v-if="props.discountType == 'activity'"  src="/img/member/activity-price.png" 
            :class="layout=='pc' ? 'member-price-img-pc' : 'member-price-img-h5'"/>
        <img v-else-if="props.discountType == 'first'" src="/img/member/first-price.png" 
            :class="layout=='pc' ? 'member-price-img-pc' : 'member-price-img-h5'"/>
        <img v-else src="/img/member/member-big.png" 
            :class="layout=='pc' ? 'member-price-img-pc' : 'member-price-img-h5'"/>
    </div>
</template>
<script setup>
import { onMounted } from "vue";
let layout = useState("layout");
const props = defineProps({
    discountType: {
        type: String,
        required: false,
        default: ''
    }
})

</script>

<style lang="scss" scoped>
.member-tips {
    display: inline-flex;
    // font-size: 35px;
    align-items: flex-start;
    border-radius: 16px;
    color: #fff;
}

.member-price-img-pc {
    width: 60px;
    height: 17px;
    cursor: pointer;
}

.member-price-img-h5 {
    width: 50px;
    height: 15px;
}</style>
