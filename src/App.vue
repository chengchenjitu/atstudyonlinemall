<template>
	<!-- 导航栏 -->
	<Nav></Nav>
	<!-- 搜索栏 -->
	<Search></Search>
	<!-- 页脚 -->
	<Foot></Foot>
</template>


<script>
	import Nav from '../src/components/nav.vue'
	import Search from '../src/components/search.vue'
	import Foot from '../src/components/foot.vue'
	export default {
		components : {
			Nav,
			Search,
			Foot
		}
	}
</script>

<style>
	@import url(./index.css);
</style>
