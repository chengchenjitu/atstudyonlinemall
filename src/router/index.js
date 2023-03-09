import { createRouter, createWebHistory } from 'vue-router'
import Kind from '../views/kind.vue'
const routes = [
	{
		path : '/',
		name : 'Kind',
		component : Kind
	},
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
