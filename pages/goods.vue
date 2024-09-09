<template>
	 <client-only>
		<h1>Goods</h1>
		<div v-if="state.goodsInfo">
			<div >title: {{state.goodsInfo.goodsName}}</div>
			<div >description:{{state.goodsInfo.seoDescription}}</div>
			<img :src="state.goodsInfo?.goodsMainPhoto?.fullPath" width="100" height="100"/>
		</div>
		<el-button @click="anotherGoodsId()">getAnotherGoodsId</el-button>
		<el-button @click="back()">Back</el-button>
		
	 </client-only>
</template>

<script setup>
	console.log("start fetch")
	const route = useRoute();
	const router = useRouter();
	const params=reactive({
		storeId: route.query.storeId,
		id: route.query.id
	})
	const state=reactive({
		goodsInfo:null,
		goodsKey:''
	})
	console.log("params",params)
	useAsyncData(state.goodsKey, async () => {
		console.log("useAsyncData")
		let seo=null
		console.log("useFetch")
		const {data} =await $fetch('/api/h5/goods/items', {query:params})
		console.log("data",data)
		console.log("end fetch")
		if(data!=null){
			seo=data.obj
			state.goodsInfo=seo
			useServerSeoMeta({
				title:  ()=>seo.goodsName,
				ogTitle:  ()=>seo.goodsName,
				description:  ()=>seo.seoDescription,
				ogDescription: ()=>seo.seoDescription,
				ogImage:  ()=>seo?.goodsMainPhoto?.fullPath,
				twitterCard: 'summary_large_image',
			})
		}
	})
	const anotherGoodsId=()=>{
		params.id='1333'
		console.log("params",params)
	}
	const back=()=>{
		router.push({path:'/'})
	}
	onMounted(() => {
		console.log("onMounted")
		// console.log('data',data.value)
	});
</script>