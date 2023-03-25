import qs from 'qs'
import axios from 'axios'
import router from '@/router'
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
		case 401 :alert('请先登录');break;
		default : return response
	}
})
export default {
	namespaced: true,
	state : {
		nav : -1,			//导航栏索引
		username: undefined, //手机号码
		password: undefined, //密码
		user_phone: undefined, //注册手机号
		user_password: undefined, //注册密码
		user_name: undefined, //注册昵称
		token: undefined, //存放请求头
		name: '你好，请登录', //存放用户名
	},
	actions : {
		//发送登录请求
		login(context){
			request({
				url : '/api/login',
				method : 'POST',
				data : qs.stringify({
					username : `${context.state.username}`,
					password : `${context.state.password}`
				})
			}).then(response => {
				if(response.data.httpcode == 200){
					router.push({path : '/'})
					localStorage.setItem('token',response.data.data)
					context.state.token = response.data.data
					request({
						url : '/api/customer/user',
						method : 'get',
					}).then(response => {
						context.state.name = response.data.data.user_name
						localStorage.setItem('name',response.data.data.user_name)
						
					})
				}
			})
			
		},
		regist(context) {
			request({
				url: '/api/regist',
				method: 'POST',
				data: qs.stringify({
					user_phone: `${context.state.user_phone}`,
					user_password: `${context.state.user_password}`,
					user_name: `${context.state.user_name}`
				})
			}).then(response => {
				if(response.data.httpcode == 200){
					router.push({path : '/login'})
					localStorage.setItem('token',response.data.data)
					context.state.token = response.data.data
				}
			})
		},
	},
	mutations: {

	}
}
