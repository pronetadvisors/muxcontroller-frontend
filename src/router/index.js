import { createRouter, createWebHistory } from 'vue-router';
import { Api } from '@/helpers/axios';
import { useUserStore } from '@/stores/user.js';


import Master from '@/views/layout/Master.vue';

const routes = [
	{
		path: '/login/',
		component: () => import('@/views/page/Login.vue')
	},
	{
		path: '/register/',
		component: () => import('@/views/page/Register.vue')
	},
	{
		path: '/dashboard/',
		component: Master,
		meta: { loggedIn: true },
		children: [
			{
				path: '',
				component: () => import('@/views/dashboard/Index.vue')
			},
			{
				path: ':catchAll(.*)',
				component: () => import('@/views/page/404.vue')
			}
		]
	},
	{
		path: '/:catchAll(.*)',
		component: () => import('@/views/page/404.vue')
	}
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes
});

router.beforeEach(async (to) => {
	const userStore = useUserStore();
	window.scrollTo({
		top: 0
	});
	if(userStore.getLoggedIn){
		if(to.path.includes('login') || to.path.includes('register')) {
			return '/dashboard';
		}
	}
	if(to.meta.loggedIn) {
		if(!userStore.getLoggedIn) {
			return '/login';
		}
	}
	// else if(to.meta.isAdmin) { // Route is an admin route.
	// 	const {data: user} = await Api.get('/user');
	// 	if(user.ret_det.code === 200 && user.data.isStaff === true) {
	// 		next();
	// 	} else {
	// 		next('/');
	// 	}
	// } else {
	// 	next();
	// }
});

export default router;