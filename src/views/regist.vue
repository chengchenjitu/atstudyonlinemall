<template>
	<div class="login">
		<div class="login-img"><img src="../assets/login_bg.png" alt=""></div>
		<div class="login1">
			<div class="login0">客户注册账户</div>
			<div class="login2">
				<input type="text" placeholder="请输出手机号"
					v-model="customer.user_phone">
			</div>
			<div class="login2">
				<input type="password" placeholder="请输入登录密码"
					v-model="customer.user_password">
			</div>
			<div class="login2">
				<input type="password" placeholder="请在此确认密码">
			</div>
			<div class="login2">
				<input type="text" placeholder="请输入客户昵称"
					v-model="customer.user_name">
			</div>
			<div class="login3 cursor"
				@click="regists()">立即注册</div>
		</div>
	</div>
</template>

<script>
	import {mapActions,mapState} from 'vuex'
	export default {
		methods : {
			...mapActions({
				regist : 'customer/regist'
			}),
			//注册时发送请求
			regists() {
				this.regist()
				this.customer.nav = 0
			}
		},
		mounted() {
			
		},
		computed : {
			...mapState(['customer'])
		}
	}
</script>

<style>
</style>