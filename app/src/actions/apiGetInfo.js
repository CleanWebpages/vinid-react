import _ from 'lodash';
import Api from '../utils/api';
import { setVehicles, setCurrentUser }	from './apiSetInfo';
import setAuthorizationToken from '../utils/setAuthorizationToken';

export function getVehicles() {
	return dispatch => Api.get('vehicles?embed=vehicle_options', '').then((resp) => {
		dispatch(setVehicles({ vehicles: resp.data }));
	}).catch((ex) => {
		const errorType = 'vehicles';
		console.log(ex);
		return Api.handleApiError(ex, errorType);
	});
}

export function getUser() {
	return (dispatch) => {
		const user = localStorage.reconUser;
		const token = localStorage.reconToken;
		if (parseInt(user) > 0) {
			const browser = getBrowser();
			setAuthorizationToken(token, user, `desktop${browser}`);

			return Api.getUser(token, user).then((resp) => {
				const username = resp.data.user_name;
				const userAll = resp.data;
				localStorage.setItem('reconUserName', username);
				localStorage.setItem('reconToken', token);
				localStorage.setItem('reconUser', user.toString());

				dispatch(setCurrentUser({ user: userAll, token }));
			}).catch((ex) => {
				console.log(ex);
				if (ex.response.status === 500) {
					localStorage.setItem('reconToken', '');
					localStorage.setItem('reconUser', '');
					localStorage.setItem('reconUserName', '');
					dispatch(Auth.logout());
					location.reload(true);
				}
			});
		}
	};
}

export function getUsers() {
	return (dispatch, getState) => Api.get('users?embed=user_installations&q[deleted_eq]=false', '').then((resp) => {
		const installations = getState().settings_dealerships.related_installations;

		const installationArray = [];
		const userArray = [];

		installations.map((installation) => {
			installationArray.push(installation.id);
		});

		_.filter(resp.data, o => o.user_installations.map((installation) => {
			if (installationArray.includes(installation.installation_id)) {
				userArray.push(o.id);
			}
		}));

		const users = _.filter(resp.data, o => userArray.includes(o.id));

		dispatch(setInfo.setUsers(users));
	}).catch(() => {
	});
}

export function getBrowser() {
	const ua = navigator.userAgent.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i); let browser;
	if (navigator.userAgent.match(/Edge/i) || navigator.userAgent.match(/Trident.*rv[ :]*11\./i)) {
		browser = 'msie';
	} else {
		browser = ua[1].toLowerCase();
	}
	const domain = /:\/\/([^\/]+)/.exec(window.location.href)[1].split('.');
	browser = `${domain[0].replace(':', '')}${browser}`;
	return encodeURI(browser);
}
