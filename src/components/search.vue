<template>
	<div class="search-">
		<div class="search-a"><img src="../assets/logo.png" alt=""></div>
		<div class="search-b">
			<div class="search-c">
				<div class="search-d"><input type="text" 
					placeholder="商品名称、品牌、规格属性......"
					v-model = 'kind.search'></div>
				<router-link to="/Category" class="search-i"  >
					<button @click="aaa(); kind.tips = true;kind.tap = false;this.kind.break=true" class="cursor">搜索</button>
				</router-link>
				<router-link to="/car" class="search-j"><button class="cursor">我的购物车</button></router-link>
			</div>
			<div class="search-e">
				<div @click="search1 = 0" :class="{'search-active' : search1 == 0}" class="search-f">春日环游记</div>
				<div @click="search1 = 1" :class="{'search-active' : search1 == 1}"  class="search-f">iphone12</div>
				<div @click="search1 = 2" :class="{'search-active' : search1 == 2}"  class="search-f">小米</div>
				<div @click="search1 = 3" :class="{'search-active' : search1 == 3}"  class="search-f">榴莲尝鲜</div>
				<div @click="search1 = 4" :class="{'search-active' : search1 == 4}"  class="search-f">生鲜五折</div>
				<div @click="search1 = 5" :class="{'search-active' : search1 == 5}"  class="search-f">品质家电</div>
				<div @click="search1 = 6" :class="{'search-active' : search1 == 6}"  class="search-f">新品激光</div>
				<div @click="search1 = 7" :class="{'search-active' : search1 == 7}"  class="search-f">春茶</div>
				<div @click="search1 = 8" :class="{'search-active' : search1 == 8}"  class="search-f">正平农贸</div>
				<div @click="search1 = 9" :class="{'search-active' : search1 == 9}"  class="search-f">嗨9购了</div>
				<div @click="search1 =10" :class="{'search-active' : search1 ==10}"  class="search-f">鱼人节好物</div>
			</div>
			<div class="search-g">
				<div @click="search2 = 0" :class="{'search-active' : search2 == 0}" class="search-h">秒杀</div>
				<div @click="search2 = 1" :class="{'search-active' : search2 == 1}" class="search-h">优惠卷</div>
				<div @click="search2 = 2" :class="{'search-active' : search2 == 2}" class="search-h">学掌门会员</div>
				<div @click="search2 = 3" :class="{'search-active' : search2 == 3}" class="search-h">品牌闪购</div>
				<div @click="search2 = 4" :class="{'search-active' : search2 == 4}" class="search-h">拍卖</div>
				<div @click="search2 = 5" :class="{'search-active' : search2 == 5}" class="search-h">家电数码</div>
				<div @click="search2 = 6" :class="{'search-active' : search2 == 6}" class="search-h">超市日用</div>
				<div @click="search2 = 7" :class="{'search-active' : search2 == 7}" class="search-h">蔬果生鲜</div>
				<div @click="search2 = 8" :class="{'search-active' : search2 == 8}" class="search-h">国际好货</div>
				<div @click="search2 = 9" :class="{'search-active' : search2 == 9}" class="search-h">潮流服饰</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {mapState,mapActions} from 'vuex'
	export default {
		data() {
			return{
				search1 : 0,
				search2 : 0,
			}
		},
		methods : {
			aaa(){
				this.kind.lista = []
				this.kind.cate_id = ''
				this.spu()
				this.kind.number = undefined
				this.kind.category = []
				this.kind.length = 10
			},
			...mapActions({
				spu : 'kind/spu',
			})
		},
		computed : {
			...mapState(['kind'])
		}
	}
</script>

<style>
</style>