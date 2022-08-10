import axios from 'axios';
import { useUserStore } from '@/stores/user.js';

const Api = axios.create({
	//Change back to /api once nginx reverse proxy is up
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true
});

Api.interceptors.request.use(
	(config) => {
		const userStore = useUserStore();
		config.headers["Authorization"] = userStore.getToken;

		return config;
	}
);


export { Api };4;