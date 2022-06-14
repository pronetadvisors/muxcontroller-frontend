import { createApp } from 'vue';
import App from './App.vue';
import './index.css';

import router from './router';
import { createPinia } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';

const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

/* Icons */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

createApp(App)
	.component('font-awesome-icon', FontAwesomeIcon)
	.use(pinia)
	.use(router)
	.mount('#app');