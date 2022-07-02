import isEmpty from 'lodash/isEmpty';
import createReducer from '../utils/createReducer';
import * as types from '../actions/types';

export const current_user = createReducer({}, {
	[types.SET_CURRENT_USER](state, action) {
		return {
			isAuthenticated: !isEmpty(action.token),
			user: action.user.id,
			user_name: action.user.user_name,
			email: action.user.email,
			phone_number: action.user.phone_number,
			first_name: action.user.first_name,
			last_name: action.user.last_name,
			notification_preference: action.user.notification_preference,
			role: action.user.role,
			position: action.user.position,
			token: action.token,
		};
	},

});

export const user_logout = createReducer({}, {
	[types.USER_LOGOUT]() {
		return {
			isLogout: true,
		};
	},

});
