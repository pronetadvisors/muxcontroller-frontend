import axios from 'axios';
import store from '../store';

export const Api = axios.create({
	//Change back to /api once nginx reverse proxy is up
	baseURL: 'http://localhost:3000/api',
	withCredentials: true,
	headers: {'Authorization': store.getters['user/getToken']}
});