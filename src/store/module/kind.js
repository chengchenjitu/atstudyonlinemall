// import qs from 'qs'
import axios from 'axios'
export default {
	namespaced : true,
	state : {
		aaa : 2
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
	},
}