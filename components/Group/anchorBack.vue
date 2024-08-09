<template>
    <!-- 新版本 -->
    <div class="flex-col">
        <!-- 倒计时 新版展示 -->
        <div class="flex align-items-center" v-if="props.groupInfo.status !==-2 ">
            <CountDown v-if="props.groupInfo && props.groupInfo.endTime" color="#EB6162" size="16"
                :time="props.groupInfo.endTime" background-color="#FFFFFF" :show-colon="false" />
            <span class="countDown-end-tips default-text">{{ $t('groupAct.countdownHotSelling') }}</span>
        </div>
        <!-- 活动结束提示  不要再错过其他好商品喔   新版展示 -->
        <div class="main-text  act-time-end-tips" v-if="props.groupInfo.status == -2">
            {{ $t('groupAct.ActEndText') }}！
        </div>
        <!-- 活动进行中 购买冒点锚点 新版展示 -->
        <div v-if="props.groupInfo.groupStyleId == 'ent_group_style_normal'">
            <!-- 活动进行中  -->
            <div class="act-go-buy pointer" v-if="props.groupInfo.status !== -2 && props.groupInfo.status !== 2"
                @click.stop="backBuyTop('buy')">{{ $t('groupAct.backBuy') }}
            </div>
            <!-- 活动即将开始  -->
            <div class="act-go-buy pointer" v-if="props.groupInfo.status == 2" @click.stop="backBuyTop('buy')">
                {{ $t('groupAct.actAboutBegin') }}
            </div>
            <!-- 活动结束 置回按钮 无法点击   -->
            <div class="act-go-buy activity-end pointer" v-if="props.groupInfo.status == -2">
                {{ $t('member.activitiyEnd') }}
            </div>
        </div>
    </div>

    <!-- 旧版本 锚点-->
    <div class="flex align-items-center just-around" v-if="props.groupInfo.groupStyleId == 'ent_group_promotion'">
        <!-- 倒计时 -->
        <div class="flex align-items-center">
            <CountDown v-if="props.groupInfo && props.groupInfo.endTime" color="#EB6162" size="16"
                :time="props.groupInfo.endTime" background-color="#FFFFFF" :show-colon="false" />
            <span class="countDown-end-tips default-text">{{ $t('groupAct.countdownHotSelling') }}</span>
        </div>
        <!-- 活动结束提示  不要再错过其他好商品喔   新版展示 -->
        <div class="main-text act-time-end-tips" v-if="props.groupInfo.status == -2">
            {{ $t('groupAct.ActEndText') }}！
        </div>

        <!-- 进行中 -->
        <div class="act-go-buy" v-if="props.groupInfo.status !== -2 && props.groupInfo.status !== 2"
            @click.stop="backBuyTop('buy')">
            {{ $t('groupAct.backBuy') }}
        </div>

        <!-- 活动即将开始   -->
        <div class="act-go-buy" v-if="props.groupInfo.status == 2" @click.stop="backBuyTop('buy')">
            {{ $t('groupAct.actAboutBegin') }}
        </div>

        <!-- 活动结束 置回按钮 无法点击   -->
        <div class="act-go-buy activity-end" v-if="props.groupInfo.status == -2">
            {{ $t('member.activitiyEnd') }}
        </div>

        <div class="back-buy-top" @click.stop="backBuyTop('top')">
            <svg-icon size="35" name="up-go-back" />
        </div>
    </div>
</template>
<script setup>
import { onMounted } from "vue";
const props = defineProps({
    groupInfo: {
        type: [Object, String],
        required: true,
        default: {}
    }
})
let layout = useState("layout");
const emit = defineEmits(['backBuyTop']) //获取父组件的方法emit
// 点击 
const backBuyTop = (type) => {
    emit('backBuyTop', type)
}
</script>
<style lang="scss" scoped>
.act-go-buy {
    // margin-top: 25rpx;
    width: 260px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    background-color: #FF6154;
    border-radius: 6px;
    color: #fff;
    padding: 10px 0;
}

.back-buy-anchor {
    width: 260px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    background-color: #FF6154;
    border-radius: 5px;
    color: #fff;
}

.activity-end {
    background-color: rgba(0, 0, 0, .12);
    color: rgba(0, 0, 0, .38);
}

.back-buy-top {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.countdown-box {
    display: flex;
    justify-content: center;
    align-items: center;
}

.countdown-text {
    font-size: 12px;
    color: #979797;
}
.countDown-end-tips{
    font-size: 12px;
}
.act-time-end-tips{
    font-size: 14px;
}
</style>
 