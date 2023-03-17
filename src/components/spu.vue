<template>
	<div class="spu-" style="text-decoration: none;"
		v-for="(a,c) of data"
		:key = "a.spu_id + a.spu_name +c"
		@click.capture = "index1 = c;spu(a.spu_id)">
		<router-link to="/Detail" class="spu-a" v-if = "active[c] == undefined"><img :src="http+a.attrKeyList[0].attrValueList[0].value_images[0]" alt=""></router-link>
		<router-link to="/Detail" class="spu-a" v-if = 'active[c] != undefined'><img :src="http+active[c]" alt=""></router-link>
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
	import {mapState,mapActions} from 'vuex'
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
			},
			...mapActions({
				detail : 'kind/detail'
			}),
			// 点击时候传入spu_id,发送请求获得商品详情
			spu(x){
				this.kind.spu_id = x
				this.detail(x)
				//缓存id
				localStorage.setItem('bbb',JSON.stringify(this.kind.spu_id))
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