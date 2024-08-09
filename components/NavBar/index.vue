
<template>
    <div class="tabr flex flex-between">
        <div class="tabr-box" @click="switchType(nav.val)" v-for="nav in props.navList">
            <div :class="{ on: props.typeClass == nav.val }" class="tab-text">{{ nav.text}}</div>
            <div class="border" :class="{ invalids: props.typeClass == nav.val }"></div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
const props = defineProps({
    navList: {
        type: Array,
        required: true,
        default: []
    },
    typeClass:{
        type: [String,Number] ,
        required: true,
        default: 1
    }
})
const emit = defineEmits(['switchType']) //获取父组件的方法emit
// 点击 
const switchType = (type: any) => {
    emit('switchType', type)
}
</script>
<style lang="scss" scoped>
.tabr {
    background-color: #eef3f4;
    height: 50px;
    padding: 0 20px;
    border-bottom: solid 1px #dedede;
    z-index: 10;
    box-sizing: border-box;
    position: -webkit-sticky;
    position: sticky;
    top: 46px;
}
.tab-text {
    color: var(--main-text-color);
    text-align: center;
    font-style: normal;
    font-weight: 400;
    letter-spacing: 0.5px;
    font-size: 16px;
}
.on {
    color: var(--main-color);
}
.tabr-box {
    width: 50%;
    height: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
   
}
.border {
    width: 100%;
    height: 3px;
    border-radius: 4px;
    margin: 12px auto 0 auto;

    &.invalids {
        background:  var(--main-color);
    }
}
</style>
 