import { defineStore } from 'pinia';
import { Api } from "../helpers/axios";

export const useUserStore = defineStore('user', {
	state: () => ({
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
	}),
	persist: true,
	getters: {
		hasQueryCompleted: state => state.userQueryComplete,
		getLoggedIn: state => state.isLoggedIn,
		getUserData: state => state.user.data,
		getUserId: state => state.user.data.user_id,
		getToken: state => state.token,
		getFirstName: state => state.user.firstname,
		getLastName: state => state.user.lastname,
	},
	actions: {
		async getUser() {
			if(this.token != null) {
				return Api.get('/user')
					.then(response => {
						this.user.data = response.data;
						this.user.user_id = response.data.user_id;
						this.user.firstname = response.data.firstname;
						this.user.lastname = response.data.lastname;
						this.user.username = response.data.username;
						this.user.email = response.data.email;
						this.user.org_id = response.data.org_id;
						this.isLoggedIn = true;
					})
					.catch(() => {
						console.log("Authorization error");
					});
			}
			this.userQueryComplete = true;
		},
		async logout() {
			Api.get('/user/logout').then(() => {
				this.$reset();
			}).catch((err) => {
				console.log(err);
			});
		}
	},
});