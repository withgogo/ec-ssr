<template>
	<client-only>
	   <component :is="layout == 'pc' ? PcGoodsDetail : MbGoodsDetail" />
	</client-only>
</template>

<script setup>
   // import { ref } from "vue";
   import MbGoodsDetail from "./mb/goodsDetail.vue"; 
   import PcGoodsDetail from "./pc/goodsDetail.vue"; 
   let layout = useState("layout");  //是pc 还是 mobile

</script>