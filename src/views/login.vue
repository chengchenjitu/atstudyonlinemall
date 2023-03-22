<template>
	<div class="login">
		<div class="login-img"><img src="../assets/login_bg.png" alt=""></div>
		<div class="login1">
			<div class="login0">客户登录</div>
			<div class="login2" style="margin-top: 40px;">
				<input type="text" placeholder="请输出手机号"
					v-model="customer.username">
			</div>
			<div class="login2" style="margin-top: 10px;">
				<input type="password" placeholder="请输入登录密码"
					v-model="customer.password" >
			</div>
			<div class="login3 cursor" style="margin-top: 40px;"
				@click="logins()">立即登录</div>
		</div>
	</div>
</template>

<script>
	import {mapActions,mapState} from 'vuex'
	export default {
		methods : {
			...mapActions({
				login : 'customer/login'
			}),
			//点击登录时发送请求
			logins() {
				this.login()
				this.customer.nav = -1
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