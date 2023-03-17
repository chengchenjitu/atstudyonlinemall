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
		case 401 : console.log('请先登录');break;
		default : return response
	}
})
export default {
	namespaced: true,
	state: {
		username: undefined, //手机号码
		password: undefined, //密码
		user_phone: undefined, //注册手机号
		user_password: undefined, //注册密码
		user_name: undefined, //注册昵称
		token: undefined, //存放请求头
	},
	actions: {
		//发送登录请求
		login(context){
			request({
				url : '/api/login',
				method : 'POST',
				data : qs.stringify({
					username : `${context.state.username}`,
					password : `${context.state.password}`
				})
			}).then(responsed => {
				if(responsed.data.httpcode == 200){
					router.push({path : '/'})
					localStorage.setItem('token',responsed.data.data)
					context.state.token = responsed.data.data
				}
			})
		},
		regist(context) {
			axios.create()({
				url: '/api/login',
				method: 'POST',
				data: qs.stringify({
					user_phone: `${context.state.user_phone}`,
					user_password: `${context.state.user_password}`,
					user_name: `${context.state.user_name}`
				})
			}).then(response => {
				console.log(response)
			})
		},
	},
	mutations: {

	}
}
