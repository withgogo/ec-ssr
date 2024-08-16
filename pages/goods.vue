<template>
	 <client-only>
		<div>Goods</div>
	 </client-only>
</template>

<script setup>
	console.log("start fetch")
	const route = useRoute();
	const params=reactive({
		storeId: route.query.storeId,
		id: route.query.id
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
		useSeoMeta({
			title:  seo.title,
			ogTitle:  seo.title,
			description:  seo.seoDescription,
			ogDescription: seo.seoDescription,
			ogImage:  seo.imagePath,
			twitterCard: 'summary_large_image',
		})
	}
	onMounted(() => {
		console.log("onMounted")
		console.log('data',data.value)
	});
</script>