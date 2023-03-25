<template>
	<div class="nav">
		<div class="nav-a" >
			<router-link @click="nav(-1)" class="nav-b" :class="{'nav-active' : customer.nav ==-1}" to="/">学掌门商城</router-link>
			<router-link @click="nav(0)"  class="nav-b" :class="{'nav-active' : customer.nav == 0}" to="/Login" v-if="mark != undefined">
				{{customer.name}}
			</router-link>
			<router-link @click="nav(0)"  class="nav-b" :class="{'nav-active' : customer.nav == 0}" to="/Login" v-if="mark == undefined">
				你好，请登录
			</router-link>
			<router-link @click="nav(1)"  class="nav-b" :class="{'nav-active' : customer.nav == 1}" to="/Regist">免费注册</router-link>
			<router-link @click="nav(2)"  class="nav-b" :class="{'nav-active' : customer.nav == 2}" to="/Order">我的订单</router-link>
			<router-link @click="nav(3)"  class="nav-b" :class="{'nav-active' : customer.nav == 3}" to="/">我的会员</router-link>
			<router-link @click="nav(4)"  class="nav-b" :class="{'nav-active' : customer.nav == 4}" to="/Address">收货信息</router-link>
			<router-link @click="nav(5)"  class="nav-b" :class="{'nav-active' : customer.nav == 5}" to="/">客户服务</router-link>
			<router-link @click="nav(6)"  class="nav-b" :class="{'nav-active' : customer.nav == 6}" to="/" style="border: none;">手机学掌门</router-link>
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return{
				mark : undefined
			}
		},
		methods : {
			nav(x){
				this.customer.nav = x
			}
		},
		mounted() {
			
			this.customer.name = localStorage.getItem("name")
			this.mark = localStorage.getItem("name")
		},
		computed : {
			...mapState(['customer'])
		}
	}
</script>

<style>
</style>