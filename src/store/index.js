import { createStore } from 'vuex'
import kind from './module/kind.js'
import customer from './module/customer.js'
export default createStore({
	modules: {
		kind,
		customer
	}
})
