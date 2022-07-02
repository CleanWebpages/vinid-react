import _ from 'lodash';
import * as types from './types';
import Api from '../utils/api';

import {
 getVehicles,
} from './apiGetInfo';

export function resetRefresh() {
	return {
		type: types.RESET_REFRESH,
	};
}

export function update_loading_status(update_status) {
	return {
		type: types.UPDATE_STATUS,
		update_status,
	};
}

export function syncRepeatData() {
	return (dispatch, getState) => {
		dispatch(getVehicles());
	};
}

export function setVehicles({ vehicles }) {
	return {
		type: types.SET_VEHICLES,
		vehicles,
	};
}

export function setActiveVehicle({ active_vehicle }) {
	return {
		type: types.SET_ACTIVE_VEHICLE,
		active_vehicle,
	};
}

export function setCurrentUser({ user, token }) {
	return {
		type: types.SET_CURRENT_USER,
		user,
		token,
	};
}
