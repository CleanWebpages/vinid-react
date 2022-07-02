import axios from 'axios';
import HomeInfo from './HomeInfo';

export default function setAuthorizationToken(token, userId, device, database = 'userdefault', subdomain = 'userdefault') {
	if (userId > 0) {
		axios.defaults.headers.common.Authorization = `${HomeInfo.apiKey()}, access_token=${Number(userId)}:${token}:${device}:${database}`;
		axios.defaults.headers.common['X-DEALER'] = database;
		axios.defaults.headers.common['X-DEALER-SUBDOMAIN'] = subdomain;
		axios.defaults.headers.common['X-USERNAME'] = userId;
	} else {
		axios.defaults.headers.common.Authorization = HomeInfo.apiKey();
	}
}
