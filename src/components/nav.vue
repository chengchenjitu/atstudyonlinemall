<template>
	<div class="nav">
		<div class="nav-a" >
			<router-link @click="nav =-1" class="nav-b" :class="{'nav-active' : nav ==-1}" to="/">学掌门商城</router-link>
			<router-link @click="nav = 0"  class="nav-b" :class="{'nav-active' : nav == 0}" to="/login">你好，请登录</router-link>
			<router-link @click="nav = 1"  class="nav-b" :class="{'nav-active' : nav == 1}" to="/regist">免费注册</router-link>
			<router-link @click="nav = 2"  class="nav-b" :class="{'nav-active' : nav == 2}" to="/">我的订单</router-link>
			<router-link @click="nav = 3"  class="nav-b" :class="{'nav-active' : nav == 3}" to="/">我的会员</router-link>
			<router-link @click="nav = 4"  class="nav-b" :class="{'nav-active' : nav == 4}" to="/">收货信息</router-link>
			<router-link @click="nav = 5"  class="nav-b" :class="{'nav-active' : nav == 5}" to="/">客户服务</router-link>
			<router-link @click="nav = 6"  class="nav-b" :class="{'nav-active' : nav == 6}" to="/" style="border: none;">手机学掌门</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return{
				nav : -1,
			}
		},
	}
</script>

<style>
	/*  login
		regist
		order
		vip
		get
		address
		phone*/
</style>