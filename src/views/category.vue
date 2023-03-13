<template>
	<div class="cate-">
		<div class="cate-a">
			<div class="cate-b">商品类型 :</div>
			<div class="cate-c cursor" :class="{'cate-click' : index4 == undefined}"
				@click = "index4 = undefined;this.kind.number=undefined;index3 = undefined"
				:a="index4=this.kind.number">全部</div>
			<div class="cate-d" v-if="kind.pid_list != 0">
				<div class="cate-e cursor"
					@click = "index3 = a.cate_id;list(a.cate_id);id = [];this.kind.number=0 "
					:class="{'cate-click' : index3 == a.cate_id}"
					v-for = "a of kind.pid_list"
					:key = "a">{{a.cate_name}}</div>
			</div>
		</div>
		<div class="cate-a" 
		@click.capture="index1= c;"
		v-for = "(a,c) of kind.category.data"
		:key = "a.key_name+a.key_id">
			<div class="cate-b">{{a.key_name}} : </div>
			<div class="cate-c cursor"
			@click=" id[c] = undefined;this.kind.lista = [];this.spu() " :class="{'cate-click':id[c] == undefined }">全部</div>
			<div class="cate-d">
				<div class="cate-e cursor"
				@click="index2 = d;id_function(b.id);" 
				:class="{'cate-click' : id[c] == b.id}"
				v-for="(b,d) of a.spuAttrValueList"
				:key="b.id+b.value_name">{{b.value_name}}</div>
			</div>
		</div>
	</div>
	<div class="spu-f">
		<Spu :data = "kind.spu"></Spu>
	</div>
</template>
<script>
	import {mapActions,mapState} from 'vuex'
	import Spu from '../components/spu.vue'
	export default {
		components : {
			Spu
		},
		data() {
			return {
				index1 : 0,
				index2 : 0,
				id : [],
				index3 : undefined,
				index4 : undefined,
			}
		},
		methods : {
			list(x){
				this.kind.cate_id = x
				this.category_list()
			},
			id_function(x){
				this.kind.search = ''
				this.id[this.index1] = x
				this.kind.lista = x
				this.spu()
				console.log(this.lista)
				// this.lista = []
			},
			...mapActions({
				category_list : "kind/category_list",
				pid : "kind/pid",
				spu : "kind/spu"
			})
		},
		mounted() {
			this.pid()
			this.index3 = this.kind.name_push
			this.category_list()
			this.spu()
		},
		unmounted() {
			this.kind.search = ''
		},
		computed : {
			...mapState(['kind']),
		}
	}
</script>

<style>
</style>