import { createApp } from 'vue';
import App from './App.vue';
import './index.css';

import router from './router';
import { createPinia } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';
import Notifications from '@kyvg/vue3-notification';

const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

/* Icons */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

createApp(App)
	.component('font-awesome-icon', FontAwesomeIcon)
	.use(pinia)
	.use(router)
	.use(Notifications)
	.mount('#app');