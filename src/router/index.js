import { createRouter, createWebHistory } from 'vue-router';
import { Api } from '@/helpers/axios';
import { useUserStore } from '@/stores/user.js';
import { useOrganizationStore } from '@/stores/organization.js';


import Master from '@/views/layout/Master.vue';
import MasterAdmin from '@/views/admin/layout/Master.vue';
import {notify} from "@kyvg/vue3-notification";

const routes = [
	{
		path: '/',
		component: () => import('@/views/page/Index.vue')
	},
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
				path: 'streams',
				component: () => import('@/views/dashboard/Streams.vue')
			}
		]
	},
	{
		path: '/admin/',
		component: MasterAdmin,
		meta : { isAdmin: true },
		children: [
			{
				path: '',
				component: () => import('@/views/admin/Index.vue')
			},
			{
				path: 'organizations',
				component: () => import('@/views/admin/Organizations.vue')
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

router.beforeEach(async (to, from) => {
	const userStore = useUserStore();
	const organizationStore = useOrganizationStore();
	window.scrollTo({
		top: 0
	});
	const date = new Date();
	if(userStore.getLoggedIn){
		if(userStore.getJwtExp < (Math.floor(date.getTime() / 1000))){
			organizationStore.logout();
			userStore.logout().then(() => {
				router.push('/login');
			});
		}
		if(to.path.includes('login') || to.path.includes('register')) {
			return '/dashboard';
		}
	}
	if(to.meta.loggedIn) {
		if(!userStore.getLoggedIn) {
			return '/login';
		}
	}
	else if(to.meta.isAdmin) { // Route is an admin route.
		const {data: user} = await Api.get('/user');
		if(user.role < 4) {
			notify({
				title: 'Admin Only',
				text: "You do not have permission to access this page!",
			});
			return from.path;
		}
	}
});

export default router;