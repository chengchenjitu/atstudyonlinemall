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
		case 401 : console.log('请先登录');break;
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
		order_spuamount : undefined,		//商品总金额
		order_expressfee : undefined,		//配送费
		order_totalamount : undefined,		//订单总金额
		order_discountamount : undefined,	//折扣金额
		order_payamount : undefined,		//实际付款金额
		orderAddress : {},					//地址信息
		orderDetailList : [],				//商品信息
	},
	actions : {
		//添加订单
		orderGet(context){
			context.state.order_spuamount = context.state.price
			context.state.order_expressfee = 0
			context.state.order_totalamount = context.state.price
			context.state.order_discountamount = 0
			context.state.order_payamount = context.state.price
			request({
				url: '/api/customer/order',
				method: 'POST',
				data: qs.stringify({
					order_spuamount: `${context.state.cart_name}`,
					order_expressfee: `${context.state.cart_name}`,
					order_totalamount: `${context.state.cart_name}`,
					order_discountamount: `${context.state.cart_name}`,
					order_payamount: `${context.state.cart_name}`,
					//orderAddress: `${context.state.cart_skuid}`,
					//orderDetailList: `${context.state.cart_sku}`,
				})
			}).then(response=>{
				console.log(response)
			})
		},
		//获取购物车列表，并筛选出勾选的商品
		skuCheck(context) {
			request({
				url: '/api/customer/cart',
				method: 'GET',
			}).then(response => {
				//let i = 0
				for(let a of response.data.data){
					if(a.cart_checked == 1){
						context.state.orderDetailList[0] = {}
						context.state.orderDetailList[0].odtails_name=a.cart_name
						context.state.orderDetailList[0].odtails_thumburl=a.cart_thumburl
						context.state.orderDetailList[0].odtails_price=a.cart_price
						context.state.orderDetailList[0].odtails_count=a.cart_count
						context.state.orderDetailList[0].odtails_amount=a.cart_count*a.cart_price+0.00
						context.state.orderDetailList[0].odtails_scorestatus=0
						context.state.orderDetailList[0].odtails_spu_id=a.cart_spuid
						context.state.orderDetailList[0].odtails_sku=a.cart_sku
						//i++
					}
				}
				console.log(context.state.orderDetailList)
			})
		},
		//获取地址及默认地址
		useraddress(context){
			request({
				url : '/api/customer/useraddress',
				method : 'GET',
			}).then(response => {
				for(let a of response.data.data){
					if(a.uaddr_isdefault == 0){
						context.state.orderAddress.consignee = a.uaddr_name
						context.state.orderAddress.phone = a.uaddr_phone
						context.state.orderAddress.province = a.uaddr_province
						context.state.orderAddress.city = a.uaddr_district
						context.state.orderAddress.district = a.uaddr_city
						context.state.orderAddress.address = a.uaddr_address
					}
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