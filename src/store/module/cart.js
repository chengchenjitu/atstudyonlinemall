import qs from 'qs'
import axios from 'axios'
// 配置请求，此时request <=> axios.create()
const request = axios.create({
	// baseURL: "/api/",
	// transformRequest(data) {
	// 	return qs.stringify(data)
	// }
})
//请求拦截器
request.interceptors.request.use(config => {
	//令牌存入本地，拿到令牌说明登录成功，处于登录状态
	//（有些端口访问时需要验证令牌，访问时会自动验证config本地令牌）
	config.headers.Authorization = localStorage.getItem("token")
	//更新令牌
	return config
})

//响应拦截器
request.interceptors.response.use(response => {
	switch (response.data.httpcode) {
		case 401 : alert("请先登录");break;
		default : return response
	}
})
export default {
	namespaced : true,
	state : {
		cart_spuid : undefined,		//获取spuid
		cart_name : undefined,		//获取spu名称
		cart_skuid : undefined,		//获取skuid
		cart_sku : undefined,		//获取sku的json
		cart_thumburl : undefined,	//获取img地址
		cart_price : undefined,		//获取sku单价
		cart_count : 1,				//获取订购数量
		cart_checked : 0,			//获取是否选中
		sku : undefined,			//sku信息
		list : [],					//存放版本及颜色
		price : 0,					//存总价
		mark : false,				//判断全部按钮是否选中
		
		//订单列表所需变量
		json : {},					//发送请求所需的json
		index : false,				//判断地址选择按钮是否显示
		spu : [],					//存放选中商品
		listed : [],				//存放版本及颜色
		order : undefined,			//所有订单信息
		version : [],				//所有订单版本信息
	},
	actions : {
		//获取订单列表
		getOrder(context){
			request({
				url: '/api/customer/order',
				method: 'GET',
			}).then(response=>{
				let i = 0
				context.state.order = response.data.data
				console.log(context.state.order)
				for(let x of context.state.order){
					context.state.version[i] = []
					for(let a of x.orderDetailList){
						let b = JSON.parse(a.odtails_sku)
						let d = ''
						for(let c of b){
							d = d+c.value_name + '  '
						}
						//将遍历出来的数据放于数组中
						context.state.version[i].push(d)
					}
					i++
				}
				console.log(context.state.version)
			})
		},
		//添加订单
		orderGet(context){
			context.state.json.order_spuamount = context.state.price
			context.state.json.order_expressfee = 0
			context.state.json.order_totalamount = context.state.price
			context.state.json.order_discountamount = 0
			context.state.json.order_payamount = context.state.price
			request({
				url: '/api/customer/order',
				method: 'POST',
				data: qs.stringify(context.state.json)
			}).then(response=>{
				console.log(response)
				alert("提交成功")
			})
		},
		//获取购物车列表，并筛选出勾选的商品
		skuCheck(context) {
			request({
				url: '/api/customer/cart',
				method: 'GET',
			}).then(response => {
				let i = 0
				for(let a of response.data.data){
					if(a.cart_checked == 1){
						//获取颜色版本
						let b = JSON.parse(a.cart_sku)
						let d = ''
						for(let c of b){
							d = d+c.value_name + '  '
						}
						//将遍历出来的数据放于数组中
						context.state.listed.push(d)
						context.state.json[`orderDetailList[${i}].odtails_name`]=a.cart_name
						context.state.json[`orderDetailList[${i}].odtails_thumburl`]=a.cart_thumburl
						context.state.json[`orderDetailList[${i}].odtails_price`]=a.cart_price
						context.state.json[`orderDetailList[${i}].odtails_count`]=a.cart_count
						context.state.json[`orderDetailList[${i}].odtails_amount`]=a.cart_count*a.cart_price+0.00
						context.state.json[`orderDetailList[${i}].odtails_scorestatus`]=0
						context.state.json[`orderDetailList[${i}].odtails_spu_id`]=a.cart_spuid
						context.state.json[`orderDetailList[${i}].odtails_sku`]=a.cart_sku
						//存入选中商品
						context.state.spu[i] = a
						i++
					}
				}
				//调用计算总价的方法
				this.commit('cart/all_priced')
			})
		},
		//获取地址及默认地址
		useraddress(context,payload){
			request({
				url : '/api/customer/useraddress',
				method : 'GET',
			}).then(response => {
				if(payload == -1){
					for(let a of response.data.data){
						if(a.uaddr_isdefault == 0){
							context.state.json[`orderAddress.consignee`] = a.uaddr_name
							context.state.json[`orderAddress.phone`] = a.uaddr_phone
							context.state.json[`orderAddress.province`] = a.uaddr_province
							context.state.json[`orderAddress.city`] = a.uaddr_district
							context.state.json[`orderAddress.district`] = a.uaddr_city
							context.state.json[`orderAddress.address`] = a.uaddr_address
						}
					}
				}
				else{
					let a = response.data.data[payload]
					context.state.json[`orderAddress.consignee`] = a.uaddr_name
					context.state.json[`orderAddress.phone`] = a.uaddr_phone
					context.state.json[`orderAddress.province`] = a.uaddr_province
					context.state.json[`orderAddress.city`] = a.uaddr_district
					context.state.json[`orderAddress.district`] = a.uaddr_city
					context.state.json[`orderAddress.address`] = a.uaddr_address
				}
			})
		},
		
		
		//发送增加购物车请求
		sku(context) {
			request({
				url: '/api/customer/cart',
				method: 'POST',
				data: qs.stringify({
					cart_spuid: `${context.state.cart_spuid}`,
					cart_name: `${context.state.cart_name}`,
					cart_skuid: `${context.state.cart_skuid}`,
					cart_sku: `${context.state.cart_sku}`,
					cart_thumburl: `${context.state.cart_thumburl}`,
					cart_price: `${context.state.cart_price}`,
					cart_count: `${context.state.cart_count}`,
					cart_checked: `${context.state.cart_checked}`,
				})
			}).then(response => {
				if(response.data.httpcode == 200){
					alert("添加成功")
				}
			})
		},
		//获取购物车列表
		skuGet(context) {
			request({
				url: '/api/customer/cart',
				method: 'GET',
			}).then(response => {
				if(response.data.httpcode == 200){
					context.state.sku = response.data.data
					for(let a of context.state.sku){
						let b = JSON.parse(a.cart_sku)
						let d = ''
						for(let c of b){
							d = d+c.value_name + '  '
						}
						//将遍历出来的数据放于数组中
						context.state.list.push(d)
						//计算总价
						if(a.cart_checked == 1){
							context.state.price += a.cart_price*a.cart_count
						}
					}
				}
				this.commit('cart/check')
			})
		},
		del(context,payload) {
			request({
				url: `/api/customer/cart/${payload.id}`,
				method: 'DELETE',
			}).then(response => {
				if(response.data.httpcode == 200){
					context.state.sku.splice(payload.index,1)
					//调用计算总价的方法
					this.commit('cart/all_price')
				}
			})
		},
		del_all(context){
			let flag = window.confirm('确认清除？')
			if(flag){
				request({
					url: `/api/customer/cart`,
					method: 'DELETE',
				}).then(response => {
					if(response.data.httpcode == 200){
						context.state.sku=[]
						//调用计算总价的方法
						this.commit('cart/all_price')
						//调用判断是否全选方法
						this.commit('cart/check')
					}
				})
			}
		},
		revise_cart(context,payload){
			//修改本地数据中的选中项
			context.state.sku[payload.index].cart_checked = context.state.cart_checked
			//修改本地数据中的购买数量
			context.state.sku[payload.index].cart_count = context.state.cart_count
			//调用计算总价的方法
			this.commit('cart/all_price')
			//调用判断是否全选方法
			this.commit('cart/check')
			request({
				url: `/api/customer/cart`,
				method: 'PUT',
				data: qs.stringify({
					cart_count: context.state.cart_count,
					cart_checked: context.state.cart_checked,
					car_id: payload.id,
				})
			})
		}
	},
	mutations : {
		//定义方法计算总价
		all_price(context){
			context.price = 0
			for(let a of context.sku){
				if(a.cart_checked == 1){
					context.price = a.cart_price*a.cart_count + context.price
				}
			}
		},
		all_priced(context){
			context.price = 0
			for(let a of context.spu){
				if(a.cart_checked == 1){
					context.price = a.cart_price*a.cart_count + context.price
				}
			}
		},
		//判断是否全选
		check(context){
			let index = 0
			for(let a of context.sku){
				if(a.cart_checked == 1){
					index++
				}
			}
			if(index == context.sku.length){
				context.mark = true
			}else{
				context.mark = false
			}
			if(context.sku.length == 0){
				context.mark = false
			}
		}
	}
}