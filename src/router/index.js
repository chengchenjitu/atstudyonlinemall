import { createRouter, createWebHistory } from 'vue-router'
import Kind from '../views/kind.vue'
import Category from '../views/category.vue'
import Detail from '../views/detail.vue'
const routes = [
	{
		path : '/',
		name : 'Kind',
		component : Kind
	},
	{
		path : '/Category',
		name : 'Category',
		component : Category
	},
	{
		path : '/Detail',
		name : 'Detail',
		component : Detail
	},
	// {
	// 	path : '/',
	// 	name : '',
	// 	component : 
	// },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
