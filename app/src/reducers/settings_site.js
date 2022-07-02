import findIndex from 'lodash/findIndex';
import _ from 'lodash';
import createReducer from '../utils/createReducer';
import * as types from '../actions/types';

const initialState = {
	error: {},
	flash_messages: {},
	installation: [],
	last_page: '',
	page: 'vin-search',
	nav_status: '',
	menus: {
		toggle_drawer_status: false,
		sidebar_status: false,
		sidebar_status_right: false,
		nav_status: false,
		report_menu_status: false,
		vehicle_tab: 'vehicle-body',
		site_map: false,
		expand_all: true,
		report_bar: false,
		hide_blank: false,
		sort_descending: false,
		sort_by_data: 'days',
		work_flow: 'all',
	},
};

export const settings_site = createReducer(initialState, {
	[types.SET_INSTALLATION](state = initialState, action) {
		return {
			...state,
			installation: action.installation[0],
		};
	},

	[types.CHANGE_CURRENT_PAGE](state = initialState, action) {
		return {
			...state,
			last_page: state.page,
			page: action.page,
		};
	},
	[types.ADD_FLASH_MESSAGE](state = initialState, action) {
		return {
			...state,
			flash_messages: action.message,
		};
	},
	[types.DELETE_FLASH_MESSAGE](state = initialState, action) {
		const index = findIndex(state, { id: action.id });

		if (index >= 0) {
			const messages = [
				...state.slice(0, index),
				...state.slice(index + 1),
			];

			return {
				...state,
				flash_messages: messages,
			};
		}
		return {
			...state,
			flash_messages: {},
		};
	},
	[types.DELETE_FLASH_MESSAGES](state = initialState) {
		return {
			...state,
			flash_messages: {},
		};
	},
	[types.TOGGLE_SIDEBAR](state = initialState) {
		const newState = state.menus;
		newState.sidebar_status = !state.menus.sidebar_status;
		return {
			...state,
			menus: newState,
		};
	},
	[types.TOGGLE_NAV](state = initialState) {
		const newState = state.menus;
		newState.nav_status = !state.menus.nav_status;
		return {
			...state,
			menus: newState,
		};
	},
	[types.RESET_REFRESH](state = initialState) {
		return {
			...state,
			all_tabs: [],
			error: {},
			flash_messages: {},
			installation: [],
			last_page: '',
			page: 'vin-search',
			nav_status: '',
			menus: {
				toggle_drawer_status: false,
				sidebar_status: false,
				sidebar_status_right: false,
				nav_status: false,
				report_menu_status: false,
				vehicle_tab: 'vehicle-body',
				site_map: false,
				expand_all: true,
				report_bar: false,
				hide_blank: false,
				sort_descending: false,
				sort_by_data: 'days',
				work_flow: 'all',
			},
		};
	},
});

export default 'settings_site';
