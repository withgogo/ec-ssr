<template>
	 <client-only>
		<component :is="layout == 'pc' ? PcHome : MbHome" />
	 </client-only>
</template>

<script setup>
	// import { ref } from "vue";
	import MbHome from "./mb/index.vue"; 
    import PcHome from "./pc/index.vue"; 
	const {
		locale
	} = useI18n()
	let layout = useState("layout");  //是pc 还是 mobile
	const language = useCookie('lang')
	language.value = locale.value
	// const pStore = usePluginStateStore()
	
	let theme = useState("theme")
	// 修改主题
	let changeColor = ()=>{
		useState("theme", () => theme.value);
	}
	let clearPState = ()=>{
		//  pStore.pState = 9
	}
	let storage = ()=>{
		//
		if (process.client) {
			// 存储数据
			localStorage.setItem('name', '刘梦月');
		}
	}
	onMounted(() => {
		// 过滤国际化使用
	  let Status = formatOrderStatus
	//   getQueryList()
	});
</script>