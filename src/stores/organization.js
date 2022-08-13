import { defineStore } from 'pinia';
import { Api } from "../helpers/axios";
import { notify } from "@kyvg/vue3-notification";

export const useOrganizationStore = defineStore('organization', {
	state: () => ({
		organizations: [],
		users: {},
		streams: {},
		assets: {},
	}),
	persist: true,
	getters: {
		getOrganizations: state => state.organizations,
		getUsers: state => state.users,
		getStreams: state => state.streams,
		getAssets: state => state.assets,
	},
	actions: {
		logout() {
			this.$reset();
		},
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
					this.organizations.forEach((org) => {
						this.getUsersInOrg(org.id);
						this.getStreamsInOrg(org.id);
						this.getAssetsInOrg(org.id);
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
		// USED BY ADMINS
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
		getStreamsInOrg(id){
			Api.get(`/mux/streams/org/${id}`)
				.then((res) => {
					this.streams[id] = res.data;
				})
				.catch((err) => {
					notify({
						type: 'error',
						title: `Error ${err.response.status}:`,
						text: err.response.data.msg
					});
				});
		},
		getAssetsInOrg(id){
			Api.get(`/mux/assets/org/${id}`)
				.then((res) => {
					this.assets[id] = res.data;
				})
				.catch((err) => {
					notify({
						type: 'error',
						title: `Error ${err.response.status}:`,
						text: err.response.data.msg
					});
				});
		},
		// USED BY USERS
		getStreamsSelf(){
			Api.get(`/mux/streams/`)
				.then((res) => {
					this.streams = res.data;
				})
				.catch((err) => {
					notify({
						type: 'error',
						title: `Error ${err.response.status}:`,
						text: err.response.data.msg
					});
				});
		},
		getAssetsSelf(){
			Api.get(`/mux/assets/`)
				.then((res) => {
					this.assets = res.data;
				})
				.catch((err) => {
					notify({
						type: 'error',
						title: `Error ${err.response.status}:`,
						text: err.response.data.msg
					});
				});
		},
		createStream(data){
			Api.post(`/mux/streams`, data)
				.then((res) => {
					this.streams.push(res.data);
					notify({
						type: 'success',
						title: 'Stream created successfully'
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
		deleteStream(Stream_ID){
			Api.delete(`/mux/streams/${Stream_ID}`)
				.then(() => {
					this.getStreamsSelf();
					notify({
						type: 'success',
						title: 'Stream deleted successfully'
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
		completeStream(Stream_ID){
			Api.post(`/mux/streams/complete/${Stream_ID}`)
				.then(() => {
					notify({
						type: 'success',
						title: 'Stream Marked as Completed'
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
		createAsset(data){
			Api.post(`/mux/assets`, data)
				.then((res) => {
					this.assets.push(res.data);
					notify({
						type: 'success',
						title: 'Asset created successfully'
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
		deleteAsset(Asset_ID){
			Api.delete(`/mux/assets/${Asset_ID}`)
				.then(() => {
					this.getAssetsSelf();
					notify({
						type: 'success',
						title: 'Asset deleted successfully'
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
		enableMP4Asset(Asset_ID){
			Api.post(`/mux/assets/${Asset_ID}/mp4support`)
				.then(() => {
					this.getAssetsSelf();
					notify({
						type: 'success',
						title: 'Asset MP4 Enabled'
					});
				})
				.catch((err) => {
					notify({
						type: 'error',
						title: `Error ${err.response.status}:`,
						text: err.response.data.msg
					});
				});
		}
	},
});