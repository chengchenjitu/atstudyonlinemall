<template>
	<div class="detail-" v-if='kind.spu_detail != undefined'>
		<div class="detail-a">
			<div class="detail-b"><img :src="http + kind.active"
					alt=""></div>
			<div class="detail-c">
				<div class="detail-d cursor" @click="img_left()">&lt;</div>
				<div class="detail-e">
					<div class="detail-g" :style="{'margin-left' : `${index*-110}px`}">
						<div class="detail-f cursor"
							v-for="a of kind.spu_img.value_images" :key='a'
							@click="kind.active = a">
							<img :src="http + a"
								:class = "{'detail-active' : a == kind.active}">
						</div>
					</div>
				</div>
				<div class="detail-d cursor" @click="img_right()">&gt;</div>
			</div>
		</div>
		<div class="context-">
			<div  class="context-a">{{kind.spu_detail.spu_name}}</div>
			<div class="context-b">
				<div class="context-c">现价：</div>
				<div class="context-d">¥{{kind.price}}</div>
				<div class="context-e">原价：</div>
				<div class="context-f">&nbsp;¥{{kind.originalprice}}&nbsp;</div>
			</div>
			<div class="context-g"  style="margin-bottom: 25px;">库存：{{kind.quantity}}</div>
			<div class="context-h">
				<div class="context-g">颜色</div>
				<div class="context-n">
					<div class="context-j cursor"
						v-for = "a of kind.color[0].attrValueList"
						:key = 'a.value_id+a.value_name'
						@click="img(a);price()"
						:class ="{'context-active' : a.value_id == kind.active1 }" >
						<div class="context-k"><img :src="http + a.value_images[0]" alt=""></div>
						<div class="context-l">{{a.value_name}}</div>
					</div>
				</div>
			</div>
			<div class="context-h" v-if="kind.color[1] != undefined">
				<div class="context-g">版本</div>
				<div class="context-n">
					<div class="context-j cursor" style = 'padding : 0px 10px 0px'
						v-for = "a of kind.color[1].attrValueList"
						:key = 'a.value_id+a.value_name'
						@click="version(a);price()"
						:class ="{'context-active' : a.value_id == kind.active2 }">{{a.value_name}}</div>
				</div>
			</div>
			<div class="context-h" v-if="kind.color[2] != undefined">
				<div class="context-g">购买方式</div>
				<div class="context-i">
					<div class="context-j cursor" style = 'padding : 0px 10px 0px'
						v-for = "a of kind.color[2].attrValueList"
						:key = 'a.value_id+a.value_name'
						@click="way(a);price()"
						:class ="{'context-active' : a.value_id == kind.active3 }">{{a.value_name}}</div>
				</div>
			</div>
			<div class="context-t">
				<div class="context-u1"><input value="1"></div>
				<div class="context-u cursor"><button>加入购物车</button></div>
				<div class="context-u cursor"><button>立即购买</button></div>
			</div>
		</div>
		
	</div>
	<div style="width: 1200px;margin: 0px auto;">
		<img src="../assets/spu_introduce_01.jpg" alt="" style="width: 1200px;">
	</div>
</template>

<script>
	import {mapState,mapActions} from 'vuex'
	export default {
		data() {
			return {
				http: 'http://localhost:8001/img/',
				index: 0, //缩略图移动的像素倍数
			}
		},
		methods: {
			//图片左右移动方法
			img_right() {
				if(this.kind.lenghts-this.index-4 > 0){
					this.index++
				}
			},
			img_left() {
				if(this.index > 0){
					this.index--
				}
			},
			//点击更换展示图片方法
			img(x){
				this.kind.spu_img = x
				this.kind.active = x.value_images[0]
				this.kind.active1 = x.value_id
			},
			//点击更换版本
			version(x){
				this.kind.active2 = x.value_id
			},
			//点击更换购买方式
			way(x){
				this.kind.active3 = x.value_id
			},
			//确定价格的方法
			price(){
				let index = []
				for(let a of this.kind.spu_detail.skuList){
					let b = JSON.parse(a.sku_spuattr)
					let i = 0
					for (let c of b){
						index[i] = c.value_id
						i++
					}
					if(index[0] == this.kind.active1 && index[1] == this.kind.active2 && index[2] == this.kind.active3){
						//确定符合条件后改变价格
						this.kind.price = a.sku_price
						this.kind.originalprice = a.sku_originalprice
					}
				}
			},
			...mapActions({
				detail : 'kind/detail'
			})
		},
		mounted() {
			//页面刷新从新发送请求
			this.detail(JSON.parse(localStorage.getItem('bbb')))
		},
		computed: {
			...mapState(['kind'])
		}
	}
</script>

<style>
</style>
