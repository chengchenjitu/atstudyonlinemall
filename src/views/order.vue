<template>
	<div class="pay-">
		<div class="pay-a">我的订单</div>
		<div class="pay-g" style="padding: 15px 20px;"
			v-for="(a,b) of cart.order"
			:key="a.createtime + b">
			<div class="order-">
				<div class="order-a">{{a.createtime}}</div>
				<div class="order-a">订单号：{{a.order_no}}</div>
				<div class="order-a" v-if="a.order_status == 0">订单状态：已下单</div>
				<div class="order-a" v-if="a.order_status == 2">订单状态：已付款</div>
				<div class="order-a" v-if="a.order_status == 4">订单状态：已配货</div>
				<div class="order-a" v-if="a.order_status == 6">订单状态：已发货</div>
				<div class="order-a" v-if="a.order_status == 8">订单状态：已收款</div>
				<div class="order-a">支付金额：¥{{a.order_payamount}}</div>
			</div>
			<div class="pay-i">
				<div class="pay-j">商品</div>
				<div class="pay-k">单价</div>
				<div class="pay-k">数量</div>
				<div class="pay-k">小计</div>
			</div>
			<div class="pay-l" 
				v-for='(c,d) of a.orderDetailList'
				:key="d + c.odtails_name">
				<div class="pay-m"><img :src="http + c.odtails_thumburl" alt=""></div>
				<div class="pay-n">
					<div class="pay-p">{{c.odtails_name}}</div>
					<div class="pay-o">{{cart.version[b][d]}}</div>
				</div>
				<div class="pay-r">¥ {{c.odtails_price}}</div>
				<div class="pay-s">{{c.odtails_count}}</div>
				<div class="pay-t">¥ {{c.odtails_price*c.odtails_count}}</div>
			</div>
			<div class="order-b">
				<div class="order-c">收货人：{{a.orderAddress.consignee}}</div>
				<div class="order-c">联系电话：{{a.orderAddress.phone}}</div>
				<div class="order-c">配送地址：{{a.orderAddress.province}} {{a.orderAddress.city}} {{a.orderAddress.district}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapActions,mapState} from'vuex'
	export default {
		data() {
			return{
				http : 'http://localhost:8001/img/',
			}
		},
		methods : {
			...mapActions({
				getOrder : 'cart/getOrder'
			})
		},
		computed : {
			...mapState(['cart'])
		},
		mounted() {
			this.getOrder()
		},
	}
</script>

<style>
</style>