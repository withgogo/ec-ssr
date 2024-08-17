<template>
	 <client-only>
		<h1>Goods</h1>
		<div>
			<div>{{state.goodsInfo.title}}</div>
			<div>{{state.goodsInfo.seoDescription}}</div>
			
		</div>
	 </client-only>
</template>

<script setup>import { START_ALIGNMENT } from 'element-plus/es/components/virtual-list/src/defaults.mjs';

	console.log("start fetch")
	const route = useRoute();
	const params=reactive({
		storeId: route.query.storeId,
		id: route.query.id
	})
	const state=reactive({
		goodsInfo:null
	})
	console.log("params",params)
	const {data} = await useFetch('/api/h5/goods/items', {
	  query: params,
	  key: params.id,
	  watch:[params],
	  getCachedData: (key) => useNuxtApp().payload.data[key] || useNuxtApp().static.data[key]
	})
	console.log("data",data.value)
	console.log("end fetch")
	if(data.value!=null){
		let seo=data.value.data.obj
		state.goodsInfo=seo
		useSeoMeta({
			title:  seo.goodsName,
			ogTitle:  seo.goodsName,
			description:  seo.seoDescription,
			ogDescription: seo.seoDescription,
			ogImage:  seo?.goodsMainPhoto?.fullPath,
			twitterCard: 'summary_large_image',
		})
	}
	onMounted(() => {
		console.log("onMounted")
		console.log('data',data.value)
	});
</script>