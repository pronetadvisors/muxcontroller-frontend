import { defineStore } from 'pinia';
import { Api } from "../helpers/axios";
import { notify } from "@kyvg/vue3-notification";

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
			avatar_src: null,
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
		getProfileModal: state => state.profileModal,
		getSettingsModal: state => state.settingsModal,
	},
	actions: {
		async getUser() {
			if (this.token != null) {
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
						this.isLoggedIn = true;
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

					//TODO -> Get new members from organization
					// this.getDBOrganizations();
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