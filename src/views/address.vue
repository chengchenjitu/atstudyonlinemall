<template>
	<div class="add-">
		<!-- 收获地址 -->
		<div class="add-a" 
			v-for="(a,b) of add.add"
			:key="a.uaddr_address + a.uaddr_name"
			:class="{'add-active' : a.uaddr_isdefault == 0}">
			<template  v-if = 'add.uaddr_id[b] == undefined'>
				<div class="add-h">
					<div class="add-j">{{a.uaddr_name}}&nbsp; {{a.uaddr_province}}</div>
					<div class="add-i cursor"
						@click="del(a.uaddr_id,b)">×</div>
				</div>
				<div class="add-z">
					<div class="add-b">
						<div class="add-c">收货人：</div>
						<div class="add-c">所在地区：</div>
						<div class="add-c">地址：</div>
						<div class="add-c">手机：</div>
					</div>
					<div class="add-d">
						<div class="add-c">{{a.uaddr_name}}</div>
						<div class="add-c" 
							v-if="a.uaddr_district == 'undefined'">{{a.uaddr_province}}{{a.uaddr_city}}</div>
						<div class="add-c"
							v-if="a.uaddr_district != 'undefined'">{{a.uaddr_province}}{{a.uaddr_city}}{{a.uaddr_district}}</div>
						<div class="add-c">{{a.uaddr_address}}</div>
						<div class="add-c">{{a.uaddr_phone}}</div>
					</div>
					<div class="add-f">
						<div class="add-g cursor" style="margin-bottom: 10px;"
							@click='display1(a.uaddr_id,b)'>编辑</div>
						<div class="add-g cursor"
							@click="defaul(a.uaddr_id,b)">设为默认</div>
					</div>
				</div>
			</template>
			<!-- 修改页面 -->
			<template v-if = 'add.uaddr_id[b] == a.uaddr_id'>
				<div class="address-a"><input v-model="add.uaddr_name" type="text" placeholder="请填写收货人"></div>
				<div class="address-a"><input v-model="add.uaddr_phone" type="text" placeholder="请填写手机号"></div>
				<div class="address-b">
					<div class="address-c">
						<select v-model="add.province " @change="change_province()">
							<option class="selcet" value="---请选择省份---">---请选择省份---</option>
							<option class="selcet" :value= 'a'
								v-for="a of add.address"
								:key="a.id+a.name">{{a.name}}</option>
						</select>
					</div>
					<div class="address-c" >
						<select v-model="add.city" @change="change_city ()">
							<option class="selcet" value="---请选择城市/区---" selected>---请选择市/区---</option>
							<option class="selcet" :value= 'a'
								v-for="a of add.province.children"
								:key="a.id+a.name">{{a.name}}</option>
						</select>
					</div>
					<div class="address-c" v-if="add.mark3">
						<select v-model="add.district" @change="change_district ()">
							<option class="selcet" value="---请选择区/县---" selected>---请选择区/县---</option>
							<option class="selcet" :value= 'a'
								v-for="a of add.city.children"
								:key="a.id+a.name">{{a.name}}</option>
						</select>
					</div>
				</div>
				<div class="address-d">
					<input type="text" v-model="add.uaddr_address" placeholder="请填写详细地址">
					<button style="background-color: limegreen;"
						@click="revise(a.uaddr_id,b)">保存</button>
					<button style="background-color: #e11;"
						@click="display3(b)">取消</button>
				</div>
			</template>
		</div>
		
		<!-- 增加地址 -->
		<div class="add-l">
			<template v-if="!add.mark2">
				<div class="add-m cursor" @click='display5()'>
					<div class="add-n">+</div>
				</div>
			</template>
			<!-- 增加页面 -->
			<template  v-if="add.mark2">
				<div class="address-">
					<div class="address-a"><input v-model="add.uaddr_name" type="text" placeholder="请填写收货人"></div>
					<div class="address-a"><input v-model="add.uaddr_phone" type="text" placeholder="请填写手机号"></div>
					<div class="address-b">
						<div class="address-c">
							<select v-model="add.province" @change="change_province()">
								<option class="selcet" value="---请选择省份---">---请选择省份---</option>
								<option class="selcet" :value= 'a'
									v-for="a of add.address"
									:key="a.id+a.name">{{a.name}}</option>
							</select>
						</div>
						<div class="address-c" >
							<select v-model="add.city" @change="change_city ()">
								<option class="selcet" value="---请选择城市/区---" selected>---请选择市/区---</option>
								<option class="selcet" :value= 'a'
									v-for="a of add.province.children"
									:key="a.id+a.name">{{a.name}}</option>
							</select>
						</div>
						<div class="address-c" v-if="add.mark3">
							<select v-model="add.district" @change="change_district()">
								<option class="selcet" value="---请选择区/县---" selected>---请选择区/县---</option>
								<option class="selcet" :value= 'a'
									v-for="a of add.city.children"
									:key="a.id+a.name">{{a.name}}</option>
							</select>
						</div>
					</div>
					<div class="address-d">
						<input type="text" v-model="add.uaddr_address" placeholder="请填写详细地址">
						<button style="background-color: limegreen;"
							@click="display2()">保存</button>
						<button style="background-color: #e11;"
							@click="display4()">取消</button>
					</div>
				</div>
			</template>
		</div>
	</div>
</template>

<script>
	import {mapState,mapActions,mapMutations} from 'vuex'
	export default {
		data() {
			return {
				mark : true,		//定义标记确保只能打开一个修改页面
			}
		},
		computed : {
			...mapState(['add'])
		},
		methods : {
			//设为默认
			defaul(x,y){
				this.add.uaddr_name = this.add.add[y].uaddr_name
				this.add.uaddr_phone = this.add.add[y].uaddr_phone
				for(let a of this.add.address){
					for(let b of a.children){
						if(b.children.length>0){
							this.add.mark3 = true
							for(let c of b.children){
								if(c.name == this.add.add[y].uaddr_district){
									this.add.district=c
									break
								}
							}
						}
						if(b.name == this.add.add[y].uaddr_city){
							this.add.city=b
							if(b.children.length==0){
								this.add.mark3 = false
							}
							break
						}
					}
					if(a.name == this.add.add[y].uaddr_province){
						this.add.province=a
						break
					}
				}
				this.add.uaddr_address = this.add.add[y].uaddr_address
				for(let a of this.add.add){
					if(a.uaddr_isdefault == 0){
						this.mark = false
						break
					}else{
						this.mark = true
					}
				}
				
				if(this.mark){
					this.add.uaddr_isdefault = 0
				}else{
					this.add.uaddr_isdefault = 1
				}
				this.add_revise(x)
				this.resve(y)
			},
			//删除地址
			del(x,y){
				this.deleted(x)
				this.add.add.splice(y,1)
			},
			//保存修改地址
			revise(x,y){
				this.add.uaddr_id[y] = undefined
				this.add_revise(x)
				this.resve(y)
				
			},
			//修改地址显隐
			display1(x,y){
				//显示修改界面
				this.add.uaddr_id[y]=this.add.add[y].uaddr_id
				//复原既有信息
				this.add.uaddr_name=this.add.add[y].uaddr_name
				this.add.uaddr_phone=this.add.add[y].uaddr_phone
				for(let a of this.add.address){
					for(let b of a.children){
						if(b.children.length>0){
							this.add.mark3 = true
							for(let c of b.children){
								if(c.name == this.add.add[y].uaddr_district){
									this.add.district=c
									break
								}
							}
						}
						if(b.name == this.add.add[y].uaddr_city){
							this.add.city=b
							if(b.children.length==0){
								this.add.mark3 = false
							}
							break
						}
					}
					
					if(a.name == this.add.add[y].uaddr_province){
						this.add.province=a
						break
					}
				}
				this.add.uaddr_address=this.add.add[y].uaddr_address
				this.add.uaddr_isdefault=this.add.add[y].uaddr_isdefault
			},
			display3(y){
				this.add.uaddr_id[y] = undefined
				this.empty()
			},
			//新增地址显隐
			display2(){
				this.add.mark2 = !this.add.mark2
				if(this.add.uaddr_name != undefined){
					this.addTo()
					this.add_to()
				}
				this.useraddress()
			},
			display4(){
				this.empty()
				this.add.mark2 = !this.add.mark2
			},
			display5(){
				this.add.mark2 = !this.add.mark2
			},
			//导入方法
			...mapMutations({
				addTo : 'add/addTo',
				empty : 'add/empty',
				resve : 'add/resve'
			}),
			...mapActions({
				location : 'add/location',
				add_to : 'add/add_to',
				useraddress : 'add/useraddress',
				deleted : 'add/deleted',
				add_revise : 'add/add_revise'
				
			}),
			//定义方法重新选择地区后清空选项
			change_province(){
				//选择直辖市没有区县选县
				if(this.add.province.id==110000 || this.add.province.id==120000 || this.add.province.id==310000 
				|| this.add.province.id==500000 || this.add.province.id==990000){
					this.add.mark3 = false
				}else{
					this.add.mark3 = true
				}
				//省份改变清空其他两项
				this.add.district =  "---请选择区/县---"
				this.add.city = "---请选择城市/区---"
			},
			change_city(){
				//城市/区改变清空其他一项
				this.add.district = "---请选择区/县---"
			},
			change_district(){
				
			},
		},
		mounted() {
			this.location()
			this.useraddress()
		}
	}
</script>

<style>
</style>