import findIndex from 'lodash/findIndex';
import createReducer from '../utils/createReducer';
import * as types from '../actions/types';

export const flashMessages = createReducer({}, {
	[types.ADD_FLASH_MESSAGE](state, action) {
		return action.message;
	},
	[types.DELETE_FLASH_MESSAGE](state, action) {
		const index = findIndex(state, { id: action.id });

		if (index >= 0) {
			const messages = [
				...state.slice(0, index),
				...state.slice(index + 1),
			];

			return messages;
		}
		return {};
	},
	[types.DELETE_FLASH_MESSAGES]() {
		return {};
	},

});

export default 'flashMessages';
