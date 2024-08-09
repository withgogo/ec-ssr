
<template>
	<div>
		<span class="tipsBaoyou" :class="props.position?'position':''" :style="{ backgroundColor: props.bgColor
        ,color:props.color,border:`1px solid ${props.borderColor}`,top: props.position? props.top+'px':'',right:props.position?props.right+'px':''}">{{props.text}}</span>
	</div>
</template>

<script setup>

const props = defineProps({
    position:{
        type: Boolean,
        default: true,
    },
    bgColor:{
        type: String,
        default: ''
    },
    color:{
        type: String,
        default: ''
    },
    borderColor:{
        type: String,
        default: ''
    },
    text:{
        type: String,
        default: ''
    },
    top:{
        type: Number,
        default: 0
    },
    right:{
        type: Number,
        default: 0
    }
})
	
</script>

<style lang="scss" scoped>
	.position{
	  position: absolute;
	}
	.tipsBaoyou{
		font-size: 11px;
		top: 5px; 
		right: 5px; 
		border-radius: 4px;
        padding:2px 5px;
		color: #FFFFFF;
		z-index: 1;
		display: inline-flex;
		justify-content: center;
		align-items: center;
	}
</style>
