<template>
	<div class="pay-">
		<div class="pay-a">填写并核对订单信息</div>
		<div class="pay-b">
			<div class="pay-c">收货人信息</div>
			<div class="pay-d">
				<div class="pay-e pay-active">{{cart.json['orderAddress.consignee']}}</div>
				<div class="pay-ea">{{cart.json['orderAddress.province']}}&nbsp;</div>
				<div class="pay-ea">{{cart.json['orderAddress.city']}}&nbsp;</div>
				<div class="pay-ea">{{cart.json['orderAddress.district']}}&nbsp;</div>
				<div class="pay-ea">{{cart.json['orderAddress.address']}}&nbsp;</div>
				<div class="pay-ea">{{cart.json['orderAddress.phone']}}</div>
				<router-link to="Address" class="pay-f cursor" style="text-decoration: none;"
					@click="selected()">修改地址信息</router-link>
			</div>
		</div>
		<div class="pay-g">
			<div class="pay-h">配送清单</div>
			<div class="pay-i">
				<div class="pay-j">商品</div>
				<div class="pay-k">单价</div>
				<div class="pay-k">数量</div>
				<div class="pay-k">小计</div>
			</div>
			<template 
				v-for="(a,b) of cart.spu"
				:key="a.cart_name + a.car_id">
				<div class="pay-l" v-if="a.cart_count != 0">
					<div class="pay-m"><img :src="http + a.cart_thumburl" alt=""></div>
					<div class="pay-n">
						<div class="pay-p">{{a.cart_name}}</div>
						<div class="pay-o">{{cart.listed[b]}}</div>
					</div>
					<div class="pay-r">¥ {{a.cart_price}}</div>
					<div class="pay-s">{{a.cart_count}}</div>
					<div class="pay-t">¥ {{a.cart_count*a.cart_price}}</div>
				</div>
			</template>
			
		</div>
		<div class="pay-u">
			<div class="pay-v">
				<div class="pay-w">商品总金额：</div>
				<div class="pay-x">¥ {{cart.price}}</div>
			</div>
			<div class="pay-v">
				<div class="pay-w">配送费：</div>
				<div class="pay-x">¥ 0</div>
			</div>
			<div class="pay-v">
				<div class="pay-w">订单总金额：</div>
				<div class="pay-x">¥ {{cart.price}}</div>
			</div>
			<div class="pay-v">
				<div class="pay-w">优惠金额：</div>
				<div class="pay-x">¥ 0</div>
			</div>
			<div class="pay-y">
				<div class="pay-z">应付总金额：</div>
				<div class="pay-aa">¥ {{cart.price}}</div>
			</div>
			<div class="pay-ab">
				配送至：{{cart.json['orderAddress.province']}}&nbsp; {{cart.json['orderAddress.city']}}&nbsp; {{cart.json['orderAddress.district']}}&nbsp; {{cart.json['orderAddress.address']}}&nbsp;  收货人：{{cart.json['orderAddress.consignee']}}&nbsp; {{cart.json['orderAddress.phone']}}
			</div>
			<div class="pay-ac">
				<button class="cursor"
					@click="sub()">提交订单</button>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapActions,mapState} from 'vuex'
	export default{
		data() {
			return{
				http : 'http://localhost:8001/img/',
			}
		},
		computed : {
			...mapState(['cart'])
		},
		methods : {
			...mapActions({
				useraddress : 'cart/useraddress',
				skuCheck : 'cart/skuCheck',
				address	: 'cart/useraddress',
				orderGet : 'cart/orderGet'
			}),
			selected(){
				this.cart.index = true
			},
			sub(){
				this.orderGet()
			},
		},
		mounted() {
			this.address(localStorage.getItem('num'))
			localStorage.setItem('num',-1)
			this.skuCheck()
		}
	}
</script>

<style>
</style>