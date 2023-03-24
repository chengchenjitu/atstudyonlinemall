<template>
	<div class="pay-">
		<div class="pay-a">填写并核对订单信息</div>
		<div class="pay-b">
			<div class="pay-c">收货人信息</div>
			<div class="pay-d">
				<div class="pay-e pay-active">张三</div>
				<div class="pay-ea">江苏省</div>
				<div class="pay-ea">南京市</div>
				<div class="pay-ea">市辖区</div>
				<div class="pay-ea">详细地址</div>
				<div class="pay-ea">17355240529</div>
				<div class="pay-f">修改收货信息</div>
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
			<div class="pay-l">
				<div class="pay-m"><img src="../assets/aaa.jpg" alt=""></div>
				<div class="pay-n">
					<div class="pay-p">APPLE</div>
					<div class="pay-o">黑色 公开版 64g</div>
				</div>
				<div class="pay-r">¥ 4899</div>
				<div class="pay-s">1</div>
				<div class="pay-t">¥ 4899</div>
			</div>
		</div>
		<div class="pay-u">
			<div class="pay-v">
				<div class="pay-w">商品总金额：</div>
				<div class="pay-x">¥ 4899</div>
			</div>
			<div class="pay-v">
				<div class="pay-w">配送费：</div>
				<div class="pay-x">¥ 0</div>
			</div>
			<div class="pay-v">
				<div class="pay-w">订单总金额：</div>
				<div class="pay-x">¥ 4899</div>
			</div>
			<div class="pay-v">
				<div class="pay-w">优惠金额：</div>
				<div class="pay-x">¥ 0</div>
			</div>
			<div class="pay-y">
				<div class="pay-z">应付总金额：</div>
				<div class="pay-aa">¥ 4899</div>
			</div>
			<div class="pay-ab">
				配送至：江苏省 南京市 市辖区 详细地址  收货人：张三 17355240529
			</div>
			<div class="pay-ac">
				<button>提交订单</button>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapActions} from 'vuex'
	export default{
		methods : {
			...mapActions({
				useraddress : 'cart/useraddress'
			})
		},
		mounted() {
			this.useraddress()
		}
	}
</script>

<style>
</style>