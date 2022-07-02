import axios from 'axios';

class HomeInfo {
	static host() {
		let database = '';

		if (typeof axios.defaults.headers.common['X-DEALER'] !== 'undefined') {
			database = `${axios.defaults.headers.common['X-DEALER']}.`;
		} else {
			database = 'userdefault.';
		}

		// var apiAddress = process.env.NODE_ENV === 'development' ? 'http://localhost:3080/api/' : 'https://'+database+'challengetrackerapp.com/api/';

		let apiAddress = `https://${database}challengetrackerapp.com/api/`;

		if (database === 'userdefault.') {
			 if (process.env.NODE_ENV === '2development') {
			 	apiAddress = 'https://userdefault.challengetrackerapp.com/api/';
			 } else {
			 	apiAddress = `https://${database}challengetrackerapp.com/api/`;
			 }
		}

		return apiAddress;
	}

	static defaulthost() {
		let database = '';
		database = 'userdefault.';

		// var apiAddress = process.env.NODE_ENV === 'development' ? 'http://localhost:3080/api/' : 'https://'+database+'challengetrackerapp.com/api/';

		let apiAddress = `https://${database}challengetrackerapp.com/api/`;

		if (database === 'userdefault.') {
			 if (process.env.NODE_ENV === '2development') {
			 	apiAddress = 'https://userdefault.challengetrackerapp.com/api/';
			 } else {
			 	apiAddress = `https://${database}challengetrackerapp.com/api/`;
			 }
		}

		return apiAddress;
	}

	static apiKey() {
		return 'Cleanapi-Token api_key=1:7cf4b535c41cab10580e49dd180e8543';
	}
}
export default HomeInfo;
