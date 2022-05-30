import { createRouter, createWebHistory } from 'vue-router';
import { Api } from '../helpers/axios';

import Master from '../views/layout/Master.vue';

const routes = [
	{
		path: '/login',
		component: () => import('../views/page/Login.vue')
	},
	{
		path: '/register',
		component: () => import('../views/page/Register.vue')
	},
	{
		path: '/dashboard',
		component: Master,
		children: [
			{
				path: '',
				component: () => import('../views/dashboard/Home.vue')
			},
			{
				path: '/dashboard/:catchAll(.*)',
				component: () => import('../views/page/404.vue')
			}
		]
	},
	{
		path: '/:catchAll(.*)',
		component: () => import('../views/page/404.vue')
	}
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes
});

router.beforeEach(async (to, from, next) => {
	window.scrollTo({
		top: 0
	});
	if(to.meta.loggedIn) {
		const {data: user} = await Api.get('/user');
		if(user.ret_det.code === 200 && user.data.member === true) {
			next();
		} else {
			next('/');
		}
	}
	else if(to.meta.isAdmin) { // Route is an admin route.
		const {data: user} = await Api.get('/user');
		if(user.ret_det.code === 200 && user.data.isStaff === true) {
			next();
		} else {
			next('/');
		}
	} else {
		next();
	}
});

export default router;