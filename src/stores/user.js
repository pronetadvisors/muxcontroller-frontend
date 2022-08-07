import { defineStore } from 'pinia';
import { Api } from "../helpers/axios";
import { notify } from "@kyvg/vue3-notification";
import router from "../router";

export const useUserStore = defineStore('user', {
	state: () => ({
		userQueryComplete: false,
		isLoggedIn: false,
		jwt_exp: null,
		user: {
			data: null,
			user_id: null,
			firstname: null,
			lastname: null,
			username: null,
			email: null,
			org_id: null,
			avatar_src: null,
			role: null,
			org_name: 'CEAVCO',
		},
		token: null,
		profileModal: false,
		settingsModal: false,
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
		getAvatar: state => state.user.avatar_src,
		getRole: state => state.user.role,
		getOrgName: state => state.user.org_name,
		getProfileModal: state => state.profileModal,
		getSettingsModal: state => state.settingsModal,
		getJwtExp: state => state.jwt_exp
	},
	actions: {
		parseJwt (token) {
			var base64Url = token.split('.')[1];
			var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
			var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
				return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
			}).join(''));

			return JSON.parse(jsonPayload);
		},
		async getUser(redir) {
			if (this.token != null) {
				this.jwt_exp = this.parseJwt(this.token).exp;
				return Api.get('/user')
					.then(response => {
						this.user.data = response.data;
						this.user.user_id = response.data.user_id;
						this.user.firstname = response.data.firstname;
						this.user.lastname = response.data.lastname;
						this.user.username = response.data.username;
						this.user.email = response.data.email;
						this.user.org_id = response.data.org_id;
						this.user.avatar_src = response.data.avatar_src;
						this.user.role = response.data.role;
						this.isLoggedIn = true;
						if(redir){
							if(this.getRole >= 4){
								router.push('/admin');
							}else{
								router.push('/dashboard');
							}
						}
					})
					.catch(() => {
						console.log("Authorization error");
					});
			}
			this.userQueryComplete = true;
		},
		async logout() {
			this.$reset();
			notify({
				type: 'success',
				title: "Logged Out",
			});
		},
		async createUser(user){
			Api.post('/users', user)
				.then(() => {
					notify({
						type: 'success',
						title: "New User Created!",
						text: `${user.username} has successfully been created.`,
					});
				})
				.catch((err) => {
					notify({
						type: 'error',
						title: `Error ${err.response.status}:`,
						text: err.response.data.msg
					});
				});
		},
		async updateAvatar(formData){
			Api.post(`/users/avatar`, formData)
				.then(() => {
					notify({
						type: 'success',
						title: "Avatar Updated!",
					});
					this.getUser();
				})
				.catch((err) => {
					notify({
						type: 'error',
						title: `Error ${err.response.status}:`,
						text: err.response.data.msg
					});
				});
		},
		profileModalButton(){
			this.profileModal = !this.profileModal;
		}
	}
});