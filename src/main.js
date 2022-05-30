import { createApp } from 'vue';
import App from './App.vue';
import './index.css';

import router from './router';
import store from './store';

/* Icons */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

createApp(App)
	.component('font-awesome-icon', FontAwesomeIcon)
	.use(store)
	.use(router)
	.mount('#app');