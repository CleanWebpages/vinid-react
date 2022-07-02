import axios from 'axios';
import _ from 'lodash';
import HomeInfo from './HomeInfo';

class Api {
	static localurl() {
		return window.location.origin;
	}

	static get(route) {
		return axios({
			method: 'get',
			url: HomeInfo.host() + route,
			headers: { 'Cache-Control': 'max-age=600000' },
			crossDomain: true,
		}).catch((error) => {
			throw error;
		}).then(json => json.data);
	}

	static getUser(token, user) {
		return axios({
			method: 'get',
			url: `${HomeInfo.defaulthost()}users/${user}?embed=user_installations`,
			crossDomain: true,
		}).catch((error) => {
			throw error;
		}).then(json => json.data);
	}

	static put(route) {
		return axios.put(HomeInfo.host() + route).then(json => json.data);
	}

	static subdomain() {
		let subdomain = '';
		if (typeof axios.defaults.headers.common['X-DEALER-SUBDOMAIN'] !== 'undefined') {
			subdomain = axios.defaults.headers.common['X-DEALER-SUBDOMAIN'];
		} else {
			subdomain = '';
		}
		return subdomain;
	}

	static database() {
		let database = '';
		if (typeof axios.defaults.headers.common['X-DEALER'] !== 'undefined') {
			database = axios.defaults.headers.common['X-DEALER'];
		} else {
			database = '';
		}
		return database;
	}

	static post(route, metaName, value) {
		return axios({
			method: 'post',
			url: HomeInfo.host() + route,
			crossDomain: true,
			data: {
				data: {
					[metaName]: value,
				},
			},
		}).catch((error) => {
			throw error;
		}).then(json => json);
	}

	static postData(route, data) {
		return axios({
			method: 'post',
			url: HomeInfo.host() + route,
			crossDomain: true,
			data: {
				data,
			},
		}).catch((error) => {
			throw error;
		}).then(json => json);
	}

	static addNew(route, id, metaName, value) {
		return axios({
			method: 'post',
			url: HomeInfo.host() + route,
			crossDomain: true,
			data: {
				data: {
					department_id: id,
					[metaName]: value,
				},
			},
		}).catch((error) => {
			throw error;
		}).then(json => json);
	}

	static forgotpassword(route, value) {
		return axios({
			method: 'post',
			url: HomeInfo.defaulthost() + route,
			crossDomain: true,
			data: {
				data: {
					user_name: value,
					reset_password_redirect_url: `${Api.localurl()}/password_resets`,
				},
			},
			headers: { Authorization: HomeInfo.apiKey() },
		}).catch((error) => {
			throw error;
		}).then(json => json);
	}

	static changepassword(route, value) {
		return axios({
			method: 'post',
			url: HomeInfo.defaulthost() + route,
			crossDomain: true,
			data: {
				data: {
					user_name: value,
					reset_password_redirect_url: `${Api.localurl()}/password_resets`,
				},
			},
			headers: { Authorization: HomeInfo.apiKey() },
		}).catch((error) => {
			throw error;
		}).then(json => json);
	}

	static reset_password(route, password) {
		return axios({
			method: 'patch',
			url: HomeInfo.defaulthost() + route,
			crossDomain: true,
			data: {
				data: {
					password,
				},
			},
			headers: { Authorization: HomeInfo.apiKey() },
		}).catch((error) => {
			throw error;
		}).then(json => json);
	}

	static patch(route, metaName, value) {
		return axios({
			method: 'patch',
			url: HomeInfo.host() + route,
			crossDomain: true,
			data: {
				data: {
					[metaName]: value,
				},
			},
		}).catch((error) => {
			throw error;
		}).then(json => json);
	}

	static patchData(route, data) {
		return axios({
			method: 'patch',
			url: HomeInfo.host() + route,
			crossDomain: true,
			data: {
				data,
			},
		}).catch((error) => {
			throw error;
		}).then(json => json);
	}

	static validateEmail(email) {
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}

	static delete(route) {
		return axios.delete(HomeInfo.host() + route).catch((error) => {
			throw error;
		}).then(json => json.data);
	}

	static login(route, email, password, device) {
		let username = 'user_name';

		if (Api.validateEmail(email)) {
			username = 'email';
		}
		return axios({
			method: 'post',
			url: HomeInfo.defaulthost() + route,
			crossDomain: true,
			data: {
				data: {
					[username]: email,
					password,
					device,
				},
			},
			headers: { Authorization: HomeInfo.apiKey() },
		}).catch((error) => {
			throw error;
		}).then(json => json.data);
	}

	static loginMobile(route, email, password, device) {
		let username = 'user_name';

		if (Api.validateEmail(email)) {
			username = 'email';
		}
		return axios({
			method: 'post',
			url: HomeInfo.defaulthost() + route,
			crossDomain: true,
			data: {
				data: {
					[username]: email,
					password,
					device,
				},
			},
			headers: { Authorization: HomeInfo.apiKey() },
		}).catch((error) => {
			throw error;
		}).then(json => json.data);
	}

	static logout(route) {
		return axios.delete(HomeInfo.defaulthost() + route).then(json => json.data);
	}

	static handleApiError(error, errorType) {
		const errors = {};
		errors[errorType] = 'Error Code has not been mapped';

		if (error.response) {
			(() => {
				switch (error.response.status) {
				case 500:
					errors[errorType] = '(SERVER ERROR 500) I am sorry, We could not process this request. Please contact Recon Advisor Support and we will troubleshoot this issue.';
					break;

				case 422:
					_.forOwn(error.response.data.error.invalid_params, (value, key) => {
						errors[errorType] = `${key} ${value}`;
					});
					break;

				case 401:
					errors[errorType] = 'this was unauthorized';
					break;

				default:
					errors[errorType] = 'There was an error';
				}
			})();
		} else if (error.request) {
			// The request was made but no response was received
			// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
			// http.ClientRequest in node.js
		} else {
			// Something happened in setting up the request that triggered an Error
		}

		return {
			errors,
		};
	}
}
export default Api;
