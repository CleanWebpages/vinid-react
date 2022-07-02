import _ from 'lodash';
import createReducer from '../utils/createReducer';
import * as types from '../actions/types';

const initialState = {
	current_default_profile: [],
	current_user_profile: [],
	default_profiles: [],
	all_users: [],
	new_users: [],
	users_tab: 'users',
	user_filter: { type: '', value: '' },
	searched_users: [],
	single_user: 0,
	set_dealership_users: [],
	related_users: [],
};

export const settings_users = createReducer(initialState, {
	[types.SET_CURRENT_DEFAULT_PROFILE](state = initialState, action) {
		return {
			...state,
			current_default_profile: action.default_profile,
		};
	},
	[types.SET_CURRENT_USER_PROFILE](state = initialState, action) {
		return {
			...state,
			current_user_profile: action.profile,
		};
	},
	[types.SET_DEFAULT_PROFILES](state = initialState, action) {
		return {
			...state,
			default_profiles: _.sortBy(action.default_profiles, 'name'),
		};
	},
	[types.SET_PER_USER](state = initialState, action) {
		const newState = state.all_users;
		newState.push(action.user);
		return {
			...state,
			all_users: newState,
		};
	},
	[types.SET_USERS](state = initialState, action) {
		return {
			...state,
			related_users: _.sortBy(action.users, 'user_name'),
			all_users: _.sortBy(action.users, 'user_name'),
		};
	},
	[types.SET_USERS_TAB](state = initialState, action) {
		return {
			...state,
			users_tab: action.users_tab,
		};
	},
	[types.SET_USER_FILTER](state = initialState, action) {
		return {
			...state,
			user_filter: action.user_filter,
		};
	},
	[types.SET_SEARCHED_USERS](state = initialState, action) {
		return {
			...state,
			searched_users: action.searched_users,
		};
	},
	[types.SET_SINGLE_USER](state = initialState, action) {
		return {
			...state,
			single_user: action.single_user,
		};
	},
	[types.RESET_REFRESH](state = initialState) {
		return {
			...state,
			current_default_profile: [],
			current_user_profile: [],
			default_profiles: [],
			all_users: [],
			users_tab: 'users',
			user_filter: { type: '', value: '' },
			searched_users: [],
			single_user: 0,
			set_dealership_users: [],
			related_users: [],
		};
	},
});

export default 'settings_users';
