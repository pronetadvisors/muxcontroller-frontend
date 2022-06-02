import { Api } from '../helpers/axios.js';

export default {
	namespaced: true,
	state: {
		userQueryComplete: false,
		isLoggedIn: false,
		user: {
			data: null,
			user_id: null,
			firstname: null,
			lastname: null,
			username: null,
			email: null,
			org_id: null,
		},
		token: null
	},
	actions: {
		getUser: async ({commit, state}) => {
			if(state.token != null) {
				return Api.get('/user')
					.then(response => {
						commit('setUser', response.data);
						commit('setLoggedIn', true);
					})
					.catch(() => {
						console.log("Authorization error");
					});
			}
			commit('setQuery', true);
		},
		logout: async ({commit}) => {
			Api.get('/user/logout').then(() => {
				commit('setUser', null);
				commit('setLoggedIn', false);
			}).catch((err) => {
				console.log(err);
			});
		}
	},
	mutations: {
		setToken (state, token) {
			state.token = token;
		},
		setUser (state, user) {
			state.user.data = user;
			state.user.user_id = user.user_id;
			state.user.firstname = user.firstname;
			state.user.lastname = user.lastname;
			state.user.username = user.username;
			state.user.email = user.email;
			state.user.org_id = user.org_id;
		},
		setQuery (state, query) {
			state.userQueryComplete = query;
		},
		setLoggedIn (state, loggedIn) {
			state.isLoggedIn = loggedIn;
		},
	},
	getters: {
		hasQueryCompleted: state => state.userQueryComplete,
		isLoggedIn: state => state.isLoggedIn,
		getUserData: state => state.user.data,
		getUserId: state => state.user.data.user_id,
		getToken: state => state.token,
		getFirstName: state => state.user.firstname,
		getLastName: state => state.user.lastname,
	}
};