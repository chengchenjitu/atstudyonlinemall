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
	//请求响应前将本地令牌放入请求头中，然后在发送请求
	//（有些端口访问时需要请求头才能成功，
	//若发送原生请求，请求时增加参数：headers : {Authorization : localStorage.getItem("token")}）
	config.headers.Authorization = localStorage.getItem("token")
	//更新令牌
	return config
})
//响应拦截器
request.interceptors.response.use(response => {
	switch (response.data.httpcode) {
		case 401 : alert('请先登录');break;
		default : return response
	}
})

export default {
	namespaced : true ,
	state : {
		mark2 : false,		//绑定增加界面显隐藏
		mark3 : true,		//判断区县信息是否显示
		address : [],		//存放全国城市信息
		province : '---请选择省份---',		//存放省份信息
		city : "---请选择城市/区---",		//存放城市/区信息
		district : "---请选择区/县---",		//存放区县信息
		//添加，修改收获信息
		uaddr_name : undefined,			//收货人姓名
		uaddr_phone : undefined,		//收货人电话
		uaddr_address : undefined,		//详细地址
		uaddr_isdefault : 1,			//是否默认
		//收获地址信息
		add : [],						//存放收货地址
		uaddr_id : [],					//存放地址id
	},
	actions : {
		//获取行政地区
		location(context){
			request({
				url : '/api/china',
				method : 'GET',
				params : {
					pid : ''
				}
			}).then(response => {
				context.state.address = response.data.data
				
			})
		},
		//添加地址
		add_to(context){
			request({
				url : '/api/customer/useraddress',
				method : 'POST',
				data: qs.stringify({
					uaddr_name: `${context.state.uaddr_name}`,
					uaddr_phone: `${context.state.uaddr_phone}`,
					uaddr_province: `${context.state.province.name}`,
					uaddr_city: `${context.state.city.name}`,
					uaddr_district: `${context.state.district.name}`,
					uaddr_address : `${context.state.uaddr_address}`,
					uaddr_isdefault: `${context.state.uaddr_isdefault}`,
				})
			}).then(response => {
				if(response.data.httpcode == 200){
					this.commit('add/empty')
				}
			})
		},
		//获取地址
		useraddress(context){
			request({
				url : '/api/customer/useraddress',
				method : 'GET',
			}).then(response => {
				context.state.add = response.data.data
			})
		},
		//删除地址
		deleted(context,payload){
			request({
				url : `/api/customer/useraddress/${payload}`,
				method : 'DELETE',
			})
		},
		//修改地址
		add_revise(context,payload){
			request({
				url : '/api/customer/useraddress',
				method : 'PUT',
				data: qs.stringify({
					uaddr_name: `${context.state.uaddr_name}`,
					uaddr_phone: `${context.state.uaddr_phone}`,
					uaddr_province: `${context.state.province.name}`,
					uaddr_city: `${context.state.city.name}`,
					uaddr_district: `${context.state.district.name}`,
					uaddr_address : `${context.state.uaddr_address}`,
					uaddr_isdefault: `${context.state.uaddr_isdefault}`,
					uaddr_id: payload,
				})
			}).then(response => {
				if(response.data.httpcode == 200){
					this.commit('add/empty')
				}
			})
		},
	},
	mutations: {
		//定义方法清空信息
		empty(context){
			context.province = '---请选择省份---'
			context.city = "---请选择城市/区---"
			context.district = "---请选择区/县---"
			context.uaddr_name = undefined
			context.uaddr_phone = undefined
			context.uaddr_address = undefined
		},
		//添加地址
		addTo(context){
			let to = {}
			to.uaddr_name=context.uaddr_name
			to.uaddr_phone=context.uaddr_phone
			to.uaddr_province=`${context.province.name}`
			to.uaddr_city=`${context.city.name}`
			to.uaddr_district=`${context.district.name}`
			to.uaddr_address=context.uaddr_address
			to.uaddr_isdefault=context.uaddr_isdefault
			to.uaddr_id=-1
			context.add.push(to)
		},
		//修改地址
		resve(context,payload){
			let to = {}
			to.uaddr_name=context.uaddr_name
			to.uaddr_phone=context.uaddr_phone
			to.uaddr_province=`${context.province.name}`
			to.uaddr_city=`${context.city.name}`
			to.uaddr_district=`${context.district.name}`
			to.uaddr_address=context.uaddr_address
			to.uaddr_isdefault = context.uaddr_isdefault
			to.uaddr_id=-2
			context.add[payload] = to
			context.uaddr_isdefault = 1
		}
	},
}