<template>
	<view class="uni-countdown">
		<text v-if="props.showDay && state.d != '00'"
			:style="{ borderColor: props.borderColor, color: props.color, backgroundColor: props.backgroundColor, fontSize: props.size + 'px', width: props.countdownWidth + 'px' }"
			class="uni-countdown__number">{{ state.d }}
		</text>
		<text v-if="props.showDay && state.d != '00'" :style="{ color: props.splitorColor, fontSize: props.size + 'px' }"
			class="uni-countdown__splitor">天</text>
		<text
			:style="{ borderColor: props.borderColor, color: props.color, backgroundColor: props.backgroundColor, fontSize: props.size + 'px', width: props.countdownWidth + 'px' }"
			class="uni-countdown__number">{{ state.h }}</text>
		<text :style="{ color: props.splitorColor, fontSize: props.size + 'px' }" class="uni-countdown__splitor">{{
			props.showColon ? ':' :
			'時'
		}}</text>
		<text
			:style="{ borderColor: props.borderColor, color: props.color, backgroundColor: props.backgroundColor, fontSize: props.size + 'px', width: props.countdownWidth + 'px' }"
			class="uni-countdown__number">{{ state.i }}</text>
		<text :style="{ color: props.splitorColor, fontSize: props.size + 'px' }" class="uni-countdown__splitor">{{
			props.showColon ? ':' :
			'分'
		}}</text>
		<text
			:style="{ borderColor: props.borderColor, color: props.color, backgroundColor: props.backgroundColor, fontSize: props.size + 'px', width: props.countdownWidth + 'px' }"
			class="uni-countdown__number">{{ state.s }}</text>
		<text v-if="!props.showColon" :style="{ color: props.splitorColor, fontSize: props.size + 'px' }"
			class="uni-countdown__splitor">秒</text>
	</view>
</template>

<script setup >
import  { countDownFn }  from '@/composables/utils/tools';
import {
	onMounted,
	reactive,
	watch,
	onUnmounted
} from "vue";
const props = defineProps({
	time: {
		type: [String,Number],
		default: 0
	},
	showDay: {
		type: Boolean,
		default: true
	},
	showColon: {
		type: Boolean,
		default: true
	},
	backgroundColor: {
		type: String,
		default: '#FFFFFF'
	},
	borderColor: {
		type: String,
		default: '#000000'
	},
	color: {
		type: String,
		default: '#000000'
	},
	splitorColor: {
		type: String,
		default: '#000000'
	},
	// day: {
	// 	type: Number,
	// 	default: 0
	// },
	// hour: {
	// 	type: Number,
	// 	default: 0
	// },
	// minute: {
	// 	type: Number,
	// 	default: 0
	// },
	// second: {
	// 	type: Number,
	// 	default: 0
	// },
	size: {
		type: [String,Number],
		default: 14
	},
	countdownWidth: {
		type: Number,
		default: 20
	},
	pc: {
		type: Boolean,
		default: false
	}
})
const state = reactive({
	timer: null,
	syncFlag: false,
	d: '00',
	h: '00',
	i: '00',
	s: '00',
	leftTime: 0,
	seconds: 0,
	oldTime: "",
	nowTime: "",
	day: 0,
	hour: 0,
	minute: 0,
	second: 0,
})
// 监听 数据变化时，清空
watch(
	() => state.day, () => {
		changeFlag()
	},
	() => state.hour, (val) => {
		changeFlag()
	},

	() => state.minute, () => {
		changeFlag();
	},
	() => state.second, () => {
		changeFlag();
	},
)
const emit = defineEmits(['timeup']) //获取父组件的方法emit

onMounted(() => {
	countDownTime()
	window.addEventListener('visibilitychange', diffTime)
});
onUnmounted(() => {
	clearInterval(state.timer)
	window.removeEventListener('visibilitychange', diffTime)
})
let countDownTime = () => {
	console.log(props.time)
	let Date = countDownFn(props.time)
	if (Date) {
		// console.log(Date)
		state.day = Date.days
		state.hour = Date.hours
		state.minute = Date.minutes
		state.second = Date.seconds
		startData();
	}
}

let toSeconds = (day, hours, minutes, seconds) => {
	return day * 60 * 60 * 24 + hours * 60 * 60 + minutes * 60 + seconds
}

let timeUp = () => {
	clearInterval(state.timer)
	emit('timeup')
}
let countDown = () => {
	let seconds = state.seconds
	let [day, hour, minute, second] = [0, 0, 0, 0]
	if (seconds > 0) {
		day = Math.floor(seconds / (60 * 60 * 24))
		hour = Math.floor(seconds / (60 * 60)) - (day * 24)
		minute = Math.floor(seconds / 60) - (day * 24 * 60) - (hour * 60)
		second = Math.floor(seconds) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60)
	} else {
		timeUp()
	}
	if (day < 10) {
		day = '0' + day
	}
	if (hour < 10) {
		hour = '0' + hour
	}
	if (minute < 10) {
		minute = '0' + minute
	}
	if (second < 10) {
		second = '0' + second
	}
	state.d = day
	state.h = hour
	state.i = minute
	state.s = second

}

let startData = () => {
	state.seconds = toSeconds(state.day, state.hour, state.minute, state.second)
	if (state.seconds <= 0) {
		return
	}
	countDown()
	state.timer = setInterval(() => {
		state.seconds--
		if (state.seconds < 0) {
			timeUp()
			return
		}
		state.oldTime = Date.now();
		countDown();
	}, 1000)
}
let changeFlag = () => {
	if (!state.syncFlag) {
		state.seconds = toSeconds(state.day, state.hour, state.minute, state.second)
		startData();
		state.syncFlag = true;
	}
}
// 处理锁屏时间差
let diffTime = () => {
	if (document.tVisibilityState != 'hidden') {
		state.seconds = state.seconds - (Date.now() - state.oldTime) / 1000;
	}
}

</script>

<style lang="scss" scoped>
.uni-countdown {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	padding: 1px 0;
}

.uni-countdown__splitor {
	display: flex;
	justify-content: center;
	line-height: 24px;
	padding: 2px;
	font-size: 26px;
}

.uni-countdown__number {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 24px;
	line-height: 24px;
	margin: 2px;
	text-align: center;
	font-size: 26px;
}
</style>
