import _ from 'lodash';
import createReducer from '../utils/createReducer';
import * as types from '../actions/types';

const initialState = {
	active_vehicles: [],
	active_vehicle: [],
	all_vehicles: [],
	searched_vehicles: [],
	found_vehicles: [],
	update_status: 'first_load',
	report_status: 'first_load',
	custom_modal_tab: {
		vehicle_id: '',
		tab: {},
		vehicle: [],
		status: false,
	},
};

export const settings_refresh = createReducer(initialState, {
	[types.SET_SEARCHED_VEHICLES](state = initialState, action) {
		return {
			...state,
			searched_vehicles: action.vehicles,
		};
	},
	[types.SET_ACTIVE_VEHICLE](state = initialState, action) {
		return {
			...state,
			active_vehicle: action.active_vehicle,
		};
	},
	[types.SET_FOUND_VEHICLE](state = initialState, action) {
		return {
			...state,
			found_vehicles: action.vehicles,
		};
	},
	[types.SET_VEHICLES](state = initialState, action) {
		return {
			...state,
			active_vehicles: action.vehicles,
		};
	},
	[types.SET_ALL_VEHICLES](state = initialState, action) {
		return {
			...state,
			all_vehicles: action.vehicles,
		};
	},
	[types.SET_CUSTOM_MODAL_TAB](state = initialState, action) {
		return {
			...state,
			custom_modal_tab: {
				tab: action.tab,
				vehicle_id: action.vehicle_id,
				vehicle: action.vehicle,
				status: action.status,
			},
		};
	},
	[types.RESET_REFRESH](state = initialState) {
		return {
			...state,
			active_vehicles: [],
			active_vehicle: [],
			all_vehicles: [],
			searched_vehicles: [],
			found_vehicles: [],
			update_status: 'first_load',
			report_status: 'first_load',
			custom_modal_tab: {
				vehicle_id: '',
				tab: {},
				vehicle: [],
				status: false,
			},
		};
	},
});

export default 'settings_refresh';
