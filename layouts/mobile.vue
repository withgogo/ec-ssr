<template>
	<div>
		<slot></slot>
	</div>
</template>
<script  setup>
const router = useRouter()
let TabActive = useState("TabActive")
let onChangeTabbar = (type)=>{
	  useState("TabActive", () => TabActive);
}
</script>
<style scoped>
:deep(.van-tabbar-item--active) {
    color: var(--main-color);
}
</style>