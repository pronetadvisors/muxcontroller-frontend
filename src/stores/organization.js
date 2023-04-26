import { defineStore } from 'pinia';
import { Api } from "../helpers/axios";
import { notify } from "@kyvg/vue3-notification";
import * as UpChunk from '@mux/upchunk';

export const useOrganizationStore = defineStore('organization', {
	state: () => ({
		organizations: [],
		users: {},
		streams: {},
		assets: {},
		relays: {},
	}),
	persist: true,
	getters: {
		getOrganizations: state => state.organizations,
		getUsers: state => state.users,
		getStreams: state => state.streams,
		getAssets: state => state.assets,
		getRelays: state => state.relays,
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
		getRelaysSelf(){
			Api.get(`/relays/`)
				.then((res) => {
					this.relays = res.data;
					this.relays.forEach((relay) => {
						this.getRelayExpose(relay.name);
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
		deleteRelay(Relay_Name){
			Api.delete(`/relay/${Relay_Name}`)
				.then(() => {
					this.getRelaysSelf();
					notify({
						type: 'success',
						title: 'Relay deleted successfully'
					});
				})
				.catch(() => {
					console.log(Relay_Name +" Still loading probably");
				});
		},
		getRelayExpose(Relay_Name){
			Api.get(`/relay_ep/${Relay_Name}`)
				.then((res) => {
					this.relays.filter((relay) => {
						if (relay.name === Relay_Name) {
							relay.ip = res.data.ip;
						}
					});
				})
				.catch((err) => {
					notify({
						type: 'error',
						title: `Error ${err.response.status}:`,
					});
				});
		},
		createRelay(data){
			Api.post(`/relay`, data)
				.then(() => {
					this.getRelaysSelf();
					notify({
						type: 'success',
						title: 'Relay created successfully'
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
		getUsersSelf(){
			Api.get(`/usersSelf`)
				.then((res) => {
					this.users = res.data.users;
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
		},
		directUpload(data, video){
			return new Promise((resolve, reject) => {
				Api.post(`/mux/upload`, data)
					.then((res) => {
						notify({
							type: 'success',
							title: 'Direct Upload Link Created Successfully'
						});
						try {
							const upload = UpChunk.createUpload({
								endpoint: res.data.url,
								file: video,
								chunkSize: 25600, // Uploads the file in ~30 MB chunks
							});

							const id = video.name;

							notify({
								id,
								title: `Upload Started: ${id}`,
								text: `This Notification will close when the upload is complete.`,
								duration: 1000000000
							});


							upload.on('error', err => {
								notify.close(id);
								notify({
									type: 'error',
									title: `Error:`,
									text: err.detail
								});
								reject(err);
							});

							upload.on('success', () => {
								notify.close(id);
								Api.get(`/mux/upload/${res.data.id}`)
									.then(() => {
										this.getAssetsSelf();
										notify({
											type: 'success',
											title: 'Video Uploaded Successfully'
										});
										resolve();
									})
									.catch((err) => {
										notify({
											type: 'error',
											title: `Error ${err.response.status}:`,
											text: err.response.data.msg
										});
										reject(err);
									});
							});
						} catch (error) {
							console.log(`😱 Creating authenticated upload url failed: ${error}`);
						}
					})
					.catch((err) => {
						notify({
							type: 'error',
							title: `Error ${err.response.status}:`,
							text: err.response.data.msg
						});
						reject(err);
					});
			});
		},
	},
});