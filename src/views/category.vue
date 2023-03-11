<template>
	<div class="cate-">
		<div class="cate-a">
			<div class="cate-b">商品类型 :</div>
			<div class="cate-c cursor" :class="{'cate-click' : index3 == 0}"
				@click = "index3 = 0;pid()">全部</div>
			<div class="cate-d" >
				<div class="cate-e cursor"
					@click = "index3 = a.cate_id;list(a.cate_id)"
					:class="{'cate-click' : index3 == a.cate_id}"
					v-for = "a of kind.pid_list.data"
					:key = "a">{{a.cate_name}}</div>
			</div>
		</div>
		<div class="cate-a" 
		@click.capture="index1= c;"
		v-for = "(a,c) of kind.category.data"
		:key = "a.key_name+a.key_id">
			<div class="cate-b">{{a.key_name}} : </div>
			<div class="cate-c cursor"
			@click=" id[c] = 0 " :class="{'cate-click' :  id[c] == 0 }">全部</div>
			<div class="cate-d">
				<div class="cate-e cursor"
				@click="index2 = d;cate = b.id;id_function()" 
				:class="{'cate-click' : id[c][d] == b.id}"
				v-for="(b,d) of a.spuAttrValueList"
				:key="b.id+b.value_name">{{b.value_name}}</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {mapActions,mapState} from 'vuex'
	export default {
		data() {
			return {
				index1 : 0,
				index2 : 0,
				cate : undefined,
				id : [],
				index3 : 0,
			}
		},
		methods : {
			list(x){
				this.kind.cate_id = x
				this.category_list()
			},
			id_function(){
				this.id = this.kind.id
				this.id[this.index1] = []
				this.id[this.index1][this.index2] = this.cate
			},
			...mapActions({
				category_list : "kind/category_list",
				pid : "kind/pid"
			})
		},
		mounted() {
			this.id = this.kind.id
			this.pid()
			this.index3 = this.kind.name_push
			this.category_list()
		},
		computed : {
			...mapState(['kind']),
		}
	}
</script>

<style>
</style>