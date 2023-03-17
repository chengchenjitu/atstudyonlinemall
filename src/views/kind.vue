<template>
	<div class="kind-" >
		<!-- 轮播图 -->
		<div class="img-" >
			<div class="img-a" :style="push">
				<div class="img-b"><img src="../assets/carousel01.jpg" alt=""></div>
				<div class="img-b"><img src="../assets/carousel02.jpg" alt=""></div>
				<div class="img-b"><img src="../assets/carousel03.jpg" alt=""></div>
				<div class="img-b"><img src="../assets/carousel04.jpg" alt=""></div>
				<div class="img-b"><img src="../assets/carousel05.jpg" alt=""></div>
			</div>
			<div class="img-d">
				<div class="img-c" @mouseover="active(0)" :class="{'img-active' : img == 0}"></div>
				<div class="img-c" @mouseover="active(1)" :class="{'img-active' : img == 1}"></div>
				<div class="img-c" @mouseover="active(2)" :class="{'img-active' : img == 2}"></div>
				<div class="img-c" @mouseover="active(3)" :class="{'img-active' : img == 3}"></div>
				<div class="img-c" @mouseover="active(4)" :class="{'img-active' : img == 4}"></div>
			</div>
			
		</div>
		<!-- 商品种类 -->
		<div class="kind-a cursor" v-if = "kinds != undefined" 
			@mouseover="tip = true"
			@mouseout="tip = false">
			<div class="kind-b" 
				v-for = "a of kinds.data.data"
				:key = "a.cate_id+a.cate_name"
				@mouseover="kind_cate = a.children;">{{a.cate_name}}</div>
		</div>
		<div style="width: 10px;" @mouseover="tip = true"
			@mouseout="tip = false"></div>
		<div class="kind-c cursor" v-show = "tip"
			@mouseover="tip = true"
			@mouseout="tip = false">
			<template v-if = "kinds !=undefined">
				<div class="kind-d"
					v-for = "a of kind_cate"
					:key ="a.cate_id+a.cate_name">
					<div class="kind-e">{{a.cate_name}}></div>
					<div class="kind-g" v-if = "a.children != undefined">
						<router-link to="/Category" class="kind-f hover"
						v-for = "b of a.children"
						:key ="b.cate_id+b.cate_name"
						@click="id(b.cate_id);
						name_push(b.cate_id);
						this.kind.number = 0">{{b.cate_name}}</router-link>
					</div>
				</div>
			</template>
			
		</div>
		<div class="img-e">
			<div class="img-f"><img src="../assets/carousel-right01.jpg" alt=""></div>
			<div class="img-f"><img src="../assets/carousel-right02.jpg" alt=""></div>
			<div class="img-f"><img src="../assets/carousel-right03.jpg" alt=""></div>
		</div>
	</div>
	<div class="title-">
		<div class="title-a">4K超清电视 专场</div>
	</div>
	<div class="spu-f">
		<Spu :data = "kind.spu1[0]"></Spu>
	</div>
	<div class="title-">
		<div class="title-a">手机 专场</div>
	</div>
	<div class="spu-f">
		<Spu :data = "kind.spu1[1]"></Spu>
	</div>
	<div class="title-">
		<div class="title-a">笔记本 专场</div>
	</div>
	<div class="spu-f">
		<Spu :data = "kind.spu1[2]"></Spu>
	</div>
	<div class="title-">
		<div class="title-a">变频空调 专场</div>
	</div>
	<div class="spu-f">
		<Spu :data = "kind.spu1[3]"></Spu>
	</div>
</template>

<script>

	import {mapActions,mapState,mapMutations} from 'vuex'
	import Spu from '../components/spu.vue'
	export default {
		components : {
			Spu
		},
		data() {
			return{
				kinds : undefined,
				kind_cate : undefined,
				tip : false,
				img : 0,
				push : undefined,
				cate_id : undefined,
				list : [],
			}
		},
		methods: {
			name_push(x){
				this.list.push(x)
				this.kind.name_push = this.list
				this.list = []
			},
			id(x){
				this.kind.tips = false
				this.kind.search = ''
				this.kind.cate_id = x
				this.kind.length = 10
			},
			active(x){
				this.img = x
				this.push = {'margin-left' : `${-x*790}px`}
			},
			...mapActions({
				kind_list : "kind/kind_list",
				spu1 : "kind/spu1"
			}),
			...mapMutations({
				
			})
		},
		computed : {
			...mapState(['kind'])
		},
		async mounted(){
			this.kind_cate = JSON.parse(localStorage.getItem('bbb'))
			this.kinds = await this.kind_list()
			this.kind_cate = this.kinds.data.data[0].children
			this.spu1()
			this.kind.lista = ''
			// localStorage.setItem('bbb',JSON.stringify(this.kind_cate))
			// this.kind_cate = JSON.parse(localStorage.getItem('bbb'))
		},
		beforeUnmount() {
			sessionStorage.setItem('aaa',JSON.stringify(this.kind.cate_id))
		}
	}
</script>

<style>
</style>
