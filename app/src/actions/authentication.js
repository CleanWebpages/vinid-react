import Api from '../utils/api';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import * as getInfo from './apiGetInfo';
import * as setInfo from './apiSetInfo';

function errorReport(data, type = 'login') {
	const errors = {};

	if (type === 'login') {
		errors.loginError = 'Username or Password is incorrect';
	} else if (type === 'reset_password') {
		errors.loginError = 'Sorry, this Reset Link is no longer active. Please issue another request below.';
	} else if (type === 'forgotpassword') {
		errors.loginError = 'Sorry, Username/Email was not found. Please contact support if you do not know your username or email on file. Thank you!.';
	}

	return {
		errors,
	};
}

export function login(email, password) {
	return (dispatch) => {
		const browser = getInfo.getBrowser();
		return Api.login('access_tokens', email, password, `desktop${browser}`)
			.then((resp) => {
				const { token } = resp.data;
				const user = resp.data.user_id;
				const username = resp.data.user.user_name;
				const userAll = resp.data.user;
				localStorage.setItem('reconUserName', JSON.stringify(username));
				localStorage.setItem('reconToken', token);
				localStorage.setItem('reconUser', user);

				setAuthorizationToken(token, user, `desktop${browser}`, username);

				dispatch(setInfo.setCurrentUser({ user: userAll, token }));

				return 'logged in';
			})
			.catch(ex => errorReport(ex, 'login'));
	};
}

export function logout() {
	return (dispatch) => {
		localStorage.setItem('reconToken', '');
		localStorage.setItem('reconUser', '');
		localStorage.setItem('reconUserName', '');
		const user = {};
		const token = '';
		dispatch(setInfo.setCurrentUser({ user, token }));
	};
}

export function resetAll() {
	return (dispatch, getState) => {
		const { all_users } = getState().settings_users;

		all_users.map((user) => {
			dispatch(forgotpassword(user.user_name));
		});
	};
}

export function forgotpassword(email) {
	return () => Api.forgotpassword('password_resets', email)
		.then(() => 'password reset has been sent')
		.catch(ex => errorReport(ex, 'forgotpassword'));
}

export function reset_password(reset_token, password) {
	return () => Api.reset_password(`password_resets/${reset_token}`, password)
		.then(() => 'password has been reset')
		.catch(ex => errorReport(ex, 'reset_password'));
}
