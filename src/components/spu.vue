<template>
	<div class="spu-" 
		v-for="(a,c) of data"
		:key = "a.spu_id + a.spu_name +c"
		@click.capture = "index1 = c">
		<div class="spu-a" v-if = "active[c] == undefined"><img :src="http+a.attrKeyList[0].attrValueList[0].value_images[0]" alt=""></div>
		<div class="spu-a" v-if = 'active[c] != undefined'><img :src="http+active[c]" alt=""></div>
		<div class="spu-b">
			<div class="spu-c "
				v-for="(b,d) of a.attrKeyList[0].attrValueList"
				:key = "b+d"
				@click = "index2 = d;img(b.value_images[0])">
				<img :src="http+ b.value_images[0]" alt="" :class="{
					'spu-active' :b.value_images[0] == active[c],
					'spu-active1' :active[c] != b.value_images[0] && active[c] != undefined}">
			</div>
		</div>
		<div class="spu-d">&nbsp;¥<span>{{a.skuList[0].sku_price}}</span></div>
		<div class="spu-e">{{a.spu_name}}</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		props : ["data"],
		data() {
			return{
				http : 'http://localhost:8001/img/',
				index1 : '',
				index2 : '',
				active :[],
			}
		},
		methods : {
			img(x){
				this.active[this.index1] = x
			}
		},
		mounted() {
			
		},
		computed : {
			...mapState(['kind']),
		}
	}
</script>

<style>
</style>