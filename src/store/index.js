import { createStore } from 'vuex'
import kind from './module/kind.js'
import customer from './module/customer.js'
import add from './module/add.js'
import cart from './module/cart.js'
export default createStore({
	modules: {
		kind,
		customer,
		add,
		cart
	}
})
