<template>
	 <client-only>
		<h1 >home</h1>
		<div @click="goToGoods()" style="border:1px firebrick solid; color:#ffffff;background-color: lightcoral; text-align:center; width:200px;"> go to Goods</div>
	 </client-only>
</template>

<script setup>
	const route=useRoute();
	const router = useRouter();
	const goToGoods=()=>{
		router.push({path:'/goods',query: {
                storeId: 37,
				id:1237
            }})
	}
	onMounted(() => {
	});
</script>