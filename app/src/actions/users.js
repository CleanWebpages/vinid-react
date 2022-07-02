import _ from 'lodash';
import * as types from './types';
import Api from '../utils/api';
import * as getInfo from './apiGetInfo';
import * as setInfo from './apiSetInfo';

export function update_loading_status(update_status) {
	return {
		type: types.UPDATE_STATUS,
		update_status,
	};
}

export function setCurrentDefaultProfileFull(default_profile) {
	return {
		type: types.SET_CURRENT_DEFAULT_PROFILE,
		default_profile,
	};
}
