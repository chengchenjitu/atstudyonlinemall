<template>
	<div class="cart-">
		<div class="cart-a">
			<div class="cart-b"><input type="checkbox" class="cursor"
				@click="all()" :checked="cart.mark"></div>
			<div class="cart-c">商品</div>
			<div class="cart-d">单价</div>
			<div class="cart-d">数量</div>
			<div class="cart-d">小计</div>
			<div class="cart-d">操作</div>
		</div>
		<div class="cart-e" 
			v-for="(a,b) of cart.sku"
			:key="a.cart_name">
			<div class="cart-f"><input type="checkbox" class="cursor"
				@click="revise(a.car_id,a.cart_count,a.cart_checked,b)"
				:checked="a.cart_checked==1? true:false"></div>
			<div class="cart-g"><img :src="http + a.cart_thumburl" alt=""></div>
			<div class="cart-h">
				<div class="cart-i">{{a.cart_name}}</div>
				<div class="cart-j">{{cart.list[b]}}</div>
			</div>
			<div class="cart-k">¥ {{a.cart_price}}</div>
			<div class="cart-l">
				<input type="text" v-model="a.cart_count"
					@keyup="count(a.car_id,a.cart_count,a.cart_checked,b)">
			</div>
			<div class="cart-t">¥ {{a.cart_count*a.cart_price}}</div>
			<div class="cart-s cursor" 
				@click="del({
					id : a.car_id,
					index : b})">删除</div>
		</div>
		<div class="cart-m">
			<div class="cart-z cursor" @click="remove()">清空购物车</div>
			<div class="cart-o">总价：</div>
			<div class="cart-p">¥ {{cart.price}}</div>
			<router-link to="/Pay" class="cart-q">
				<button class="cursor"
					@click="get()">去结算</button>
			</router-link>
		</div>
	</div>
</template>

<script>
	import {mapActions,mapState,mapMutations} from 'vuex'
	export default {
		data() {
			return{
				http : 'http://localhost:8001/img/',
			}
		},
		methods : {
			//添加订单的方法
			get(){
				//获取默认地址
				this.useraddress(localStorage.getItem('num'))
			},
			...mapMutations({
				all_price : 'cart/all_price',
				check : 'cart/check'
			}),
			...mapActions({
				skuGet : 'cart/skuGet',
				del : 'cart/del',
				revise_cart : 'cart/revise_cart',
				del_all : 'cart/del_all',
				orderGet : 'cart/orderGet',
				skuCheck : 'cart/skuCheck',
				useraddress : 'cart/useraddress'
			}),
			//发送请求变更选中状态
			revise(x,y,z,o){
				if(z == 0){
					this.cart.cart_count = y
					this.cart.cart_checked = 1
					this.revise_cart({id : x,index : o})
				}
				else if(z == 1){
					this.cart.cart_count = y
					this.cart.cart_checked = 0
					this.revise_cart({id : x,index : o})
				}
				
			},
			//发送请求改变商品订购数量
			count(x,y,z,o){
				this.cart.cart_count = y
				this.cart.cart_checked = z
				this.revise_cart({id : x,index : o})
			},
			//所有商品全选
			all(){
				let i = 0
				for(let a of this.cart.sku){
					if(a.cart_checked == 0){
						this.cart.cart_count = a.cart_count
						this.cart.cart_checked = 1
						this.revise_cart({id : a.car_id,index : i})
					}
					i++
				}
				this.check()
			},
			remove(){
				this.del_all()
			}
		},
		mounted() {
			this.skuGet()
		},
		computed : {
			...mapState(['cart'])
		}
	}
</script>

<style>
</style>