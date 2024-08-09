<template>
	<div class="cn-money-box" :class="props.original ? 'cn-money-original' : ''"
		:style="{ padding: props.padding, margin: props.margin, fontSize: props.size + state.sizeQuantity, color: props.color }">
		<div v-if="props.rmb">
			<text class="cn-money-text" v-if="props.showUnit">{{ state.rmbUnit }}</text>
			<text class="cn-money-text">{{ state.rmbText }}</text>
		</div>
		<div v-else>
			<text class="cn-money-unit" v-if="props.showUnit && props.unitPosition == 'left'">{{ state.unit }}</text>
			<text class="cn-money-text">{{ state.moneyData }}</text>
			<text class="cn-money-decimal" v-if="props.showZeroDecimal || state.decimalData != '00'">.{{ state.decimalData
				}}</text>
			<text class="cn-money-unit" v-if="props.showUnit && props.unitPosition == 'right'">{{ state.unitText }}</text>
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
	money: {
		type: Number,
		default: 0.0
	},
	//padding
	padding: {
		type: String,
		default: '0'
	},
	margin: {
		type: String,
		default: '0'
	},
	//文字大小 px
	size: {
		type: Number,
		default: 28
	},
	color: {
		type: String,
		default: '#e41f19'
	},
	unit: {
		type: String,
		default: '¥'
	},
	showUnit: {
		type: Boolean,
		default: true
	},
	unitPosition: {
		type: String,
		default: 'left'	// right
	},
	showZeroDecimal: {
		type: Boolean,
		default: true
	},
	thousandth: {
		type: Boolean,
		default: false
	},
	original: {
		type: Boolean,
		default: false
	},
	rmb: {
		type: Boolean,
		default: false
	},
	pc: {
		type: Boolean,
		default: false
	}
})
const state = reactive({
	moneyData: '0',
	decimalData: '00',
	unitText: '元',
	rmbUnit: '人民币',
	rmbText: '',
	sizeQuantity: 'px'
})
// 监听 数据变化时，清空
watch(
	() => props.money, () => {

		splitMoney();

	},
	() => props.unit, (val) => {
		if ('$' == val) {
			state.rmbUnit = '美金';
			state.unitText = '美元';
		} else if ('£' == val) {
			state.rmbUnit = '英镑';
			state.unitText = '镑';
		} else if ('€' == val) {
			state.rmbUnit = '欧元';
			state.unitText = '欧';
		} else if ('₩' == val) {
			state.rmbUnit = '韩元';
			state.unitText = '韩元';
		} else {
			state.rmbUnit = '人民币';
			state.unitText = '元';
		}
	}
)
onMounted(() => {
	splitMoney();
	state.sizeQuantity = 'px'
});

let splitMoney = () => {
	var m = props.money;
	if (!m) {
		m = 0.0;
	}
	var p = m.toFixed(2).toString();
	if (p.indexOf('.') > -1) {
		var pps = p.split('.');
		state.moneyData = pps[0];
		state.decimalData = pps[1];
	} else {
		state.moneyData = p;
		state.decimalData = '00';
	}
	if (props.thousandth) {
		state.moneyData = parseInt(state.moneyData).toLocaleString();
	}
	if (state.rmb) {
		toRmb();
	}
}
let toRmb = () => {
	const fraction = ['角', '分'];
	const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
	const unit = [
		['圆', '万', '亿'],
		['', '拾', '佰', '仟'],
	];
	let num = Math.abs(parseFloat(props.money));
	let s = '';
	fraction.forEach((item, index) => {
		s += (digit[Math.floor(num * 10 * (10 ** index)) % 10] + item).replace(/零./, '');
	});
	s = s || '整';
	num = Math.floor(num);
	for (let i = 0; i < unit[0].length && num > 0; i += 1) {
		let p = '';
		for (let j = 0; j < unit[1].length && num > 0; j += 1) {
			p = digit[num % 10] + unit[1][j] + p;
			num = Math.floor(num / 10);
		}
		s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
	}

	state.rmbText = s.replace(/(零.)*零圆/, '圆').replace(/(零.)+/g, '零').replace(/^整$/, '零圆整');
}

</script>

<style lang="scss" scoped>
/* font start */
@font-face {
	font-family: 'moneyFont';
	src: url('./cnMoney.ttf') format('truetype');
	font-weight: normal;
	font-style: normal;
}

/* font end */
/* color start*/
.cn-money-box {
	box-sizing: border-box;
	font-family: moneyFont, "Microsoft Yahei", "Helvetica Neue", Helvetica, Arial, sans-serif;
	display: inline-flex;
	align-items: flex-end;
	justify-items: flex-end;
	justify-content: flex-start;

	.cn-money-unit {
		font-size: 0.65rem;
		margin: 0;
		padding: 0;
	}

	.cn-money-text {
		margin: 0;
		padding: 0;
	}

	.cn-money-decimal {
		font-size: 0.75rem;
		margin: 0;
		padding: 0;
	}
}

.cn-money-original {
	text-decoration: line-through;
}
</style>
