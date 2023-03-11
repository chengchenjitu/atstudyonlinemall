// import qs from 'qs'
import axios from 'axios'
export default {
	namespaced : true,
	state : {
		category : [],
		cate_id : 0,
		name_push : [],
		pid : 0,
		pid_list : 0,
		id : [],
	},
	mutations : {
		
	},
	actions : {
		kind_list(){
			return axios.get( "/api/category" , { params : { category : "" } } )
			.then(response => {
				return response
			})
		},
		category_list(context){
			axios.get( "/api/attr" , { params : { 
				cate_id : `${context.state.cate_id}`,
				key_issku : "0",
				key_ishigh : "0"
				} } )
			.then(response => {
				context.state.category = response.data
				for(let i = 0; i <= context.state.category.data.length; i++){
					context.state.id.push([])
				}
			})
		},
		pid(context){
			axios.get( "/api/category" , { params : {
				pid : `${context.state.pid}`,
				} } )
			.then(response => {
				context.state.pid_list = response.data
			})
		}
	},
}