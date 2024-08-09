<template>
    <!-- 活动名称title -->
    <div v-if="props.groupInfo">
        <!-- 预购 -->
        <span class="act-tips " v-if="props.groupInfo.isPre == 1 && props.groupInfo.groupType !== 2">
            {{ $t('groupAct.preOrder') }}
        </span>
        <!-- 募资购 -->
        <span class="act-tips" v-if="props.groupInfo.isPre == 1 && props.groupInfo.groupType == 2
            ">
            {{ $t('groupAct.muZiLimitedTimeTopTips') }}
        </span>
        <div  class="main-text-other  fontW group-name">
            {{ props.groupInfo.groupName }}
        </div>
        <div  class="main-text-other group-title-dec mtop5 fontW ">
            {{ props.groupInfo.groupSubTitle }}
        </div>
        <div class="act-group-info main-text-other group-title-dec mtop5">
            {{ props.groupInfo.groupInfo }}
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
const props = defineProps({
    groupInfo: {
        type: [Object, String],
        required: true,
        default: {}
    }
})
let layout = useState("layout");

</script>
<style lang="scss" scoped>
@import "@/assets/css/group/actGoods";

</style>
 