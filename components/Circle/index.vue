<template>
    <div>
        <div :style="cBox">
            <text style="font-size: 15px;">{{ state.animationPercent }}%</text>
            <div :style="faStyle">
                <div :style="leftBox">
                    <div :style="leftStyle"></div>
                </div>
                <div :style="rithStyle"></div>
            </div>
        </div>
    </div>
</template>

<script setup >
import {
    onMounted,
    reactive
} from "vue";
const props = defineProps({
    //大小
    size: {
        type: Number,
        default: 60
    },
    //进度条颜色
    circleColor: {
        type: String,
        default: '#00ACC8'
    },
    //圆环背景色
    defaultColor: {
        type: String,
        default: '#e9e9e9'
    },
    //圆环宽度
    circleWidth: {
        type: Number,
        default: 4
    },
    //百分比
    percent: {
        type: Number,
        default: 0
    },
    //动画效果
    animation: {
        type: Boolean,
        default: false
    },
    //帧动画间隔
    animationSpeed: {
        type: Number,
        default: 1
    },
    //动画方向
    clockwise: {
        type: Boolean,
        default: true
    },
    //自定义七点位置
    direction: {
        type: Number,
        default: 0
    }
})
const state = reactive({
    animationPercent: 0,
    circleColor:'#00ACC8',
})


const emit = defineEmits(["animationPercent", "onComplete"]); //获取父组件的方法emit
//动画加载方法
let loadAnimation= ()=>{
    state.animationPercent = 0;
    var i = setInterval(() => {
        if (state.animationPercent >= props.percent) {
            clearInterval(i);
            emit("onComplete");
        }
        else {
            state.animationPercent += 1;
            emit("animationPercent", state.animationPercent);
        }

    }, props.animationSpeed);
}

let sizeAdapter = computed(() => {
    return props.size % 2 == 0 ? props.size : (props.size - 1);
})

let cBox = computed(() => {
    var size = sizeAdapter.value;
    var circleWidth = props.circleWidth;
    var style =`	
            position:relative !important;
            height:${circleWidth * 2 + size}px !important;
            width:${circleWidth * 2 + size}px !important;
            display:flex !important;
            justify-content: center !important;
            align-items: center !important;
        `;
    return style;
})
let slotStyle = computed(() => {
    var size = sizeAdapter.value;
    var circleWidth = props.circleWidth;
    var style =`
            border-radius:50% !important;
            height:${size}px !important;
            width:${size}px !important;
            display:flex !important;
            justify-content: center !important;
            align-items: center !important;
        `;
    return style;
})
let faStyle = computed(() => {
    var size = sizeAdapter.value;
    var circleWidth = props.circleWidth;
    var defaultColor = props.defaultColor;
    var direction = props.direction;
    var clockwise = props.clockwise;
    var style = `
            position:absolute !important;
            border-radius:50% !important;
            display:flex !important;
            justify-content: center !important;
            align-items: center !important;
            top:0 !important;
            left:0 !important;
            height:${size}px !important;
            width:${size}px !important;
            border:${circleWidth}px ${defaultColor} solid !important;
            transform:rotate(${direction}deg) rotateY(${clockwise ? 0 : 180}deg) !important;
        `;
    return style;
})
let leftBox = computed(() => {
    var size = sizeAdapter.value;
    var circleWidth = props.circleWidth;
    var style = `
            height:${circleWidth * 2 + size}px !important;
            width:${circleWidth * 2 + size}px !important;
            position:absolute !important;
            top:-${circleWidth}px !important;
            left:-${circleWidth}px !important;
            opacity:1 !important;
            clip:rect(0 ${(circleWidth * 2 + size) / 2}px ${(circleWidth * 2 + size)}px 0) !important;
        `;
    return style;
})

let leftStyle = computed(() => {
    var top = props.top;
    var clockwise = props.clockwise;
    var size = sizeAdapter.value;
    var circleColor = state.circleColor;
    var circleWidth = props.circleWidth;
    var percent = props.animation ? state.animationPercent : props.percent;
    var style;
    style = `
            height:${size}px !important;
            width:${size}px !important;
            border:${circleWidth}px ${circleColor} solid !important;
            border-radius:50% !important; 
            z-index:0 !important;
            position:absolute !important;
            top:0px !important;
            left:0px !important;
            transform:rotate(${percent > 50 ? 180 : (percent / 100 * 360)}deg) !important;
            clip:rect(0 ${circleWidth * 2 + size}px ${circleWidth * 2 + size}px ${(circleWidth * 2 + size) / 2}px ) !important;
            `;
    return style;
})
let rithStyle = computed(() => {
    var direction = props.direction;
    var size = sizeAdapter.value;
    var circleColor = state.circleColor;
    var defaultColor = props.defaultColor;
    var circleWidth = props.circleWidth;
    var percent = props.animation ? state.animationPercent : props.percent;
    var rotate = percent >= 100 ? 0 : percent > 50 ? percent / 100 * 360 : 0
    var style = `
            height:${size}px !important;
            width:${size}px !important;
            position:absolute;
            border:${circleWidth}px ${percent > 50 ? circleColor : defaultColor} solid !important;
            border-radius:50% !important;
            z-index:${percent > 50 ? 0 : 100} !important;
            position:absolute !important;
            top:-${circleWidth}px;
            left:-${circleWidth}px;
            transform:rotate(${rotate}deg) !important;
            clip:rect(0 ${circleWidth * 2 + size}px ${circleWidth * 2 + size}px ${(circleWidth * 2 + size) / 2}px ) !important; 
        `;

    return style;
})
onMounted(() => {
    // if (props.animation) {
    //     loadAnimation();
    // }
    // else {
        state.animationPercent = props.percent;
        // console.log(props.percent);
        if (props.percent >= 100) {
            state.circleColor = '#28C76F'
        }
    // }
});
</script>

<style lang="scss" scoped></style>
