import { defineStore } from 'pinia';
import { Api } from "../helpers/axios";
import { notify } from "@kyvg/vue3-notification";

export const useOrganizationStore = defineStore('organization', {
	state: () => ({
		organizations: [],
		users: {}
	}),
	persist: true,
	getters: {
		getOrganizations: state => state.organizations,
		getUsers: state => state.users,
	},
	actions: {
		async createOrganization(organization){
			Api.post('/organizations', organization)
				.then(() => {
					this.getDBOrganizations();
					notify({
						type: 'success',
						title: "New Organization Created!",
						text: `${organization.name} has successfully been created.`,
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
		async deleteOrganization(id){
			Api.delete(`/organizations/${id}`)
				.then(() => {
					this.getDBOrganizations();
					notify({
						type: 'success',
						title: "Organization Deleted!",
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
		async editOrganization(id, organization){
			Api.put(`/organizations/${id}`, organization)
				.then(() => {
					this.getDBOrganizations();
					notify({
						type: 'success',
						title: "Organization Updated!",
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
		getDBOrganizations(){
			Api.get('/organizations')
				.then((res) => {
					this.organizations = res.data.organization;
				})
				.catch((err) => {
					notify({
						type: 'error',
						title: `Error ${err.response.status}:`,
						text: err.response.data.msg
					});
				});
		},
		getUsersInOrg(id){
			Api.get(`/users/${id}`)
				.then((res) => {
					this.users[id] = res.data.users;
				})
				.catch((err) => {
					notify({
						type: 'error',
						title: `Error ${err.response.status}:`,
						text: err.response.data.msg
					});
				});
		},
	},
});