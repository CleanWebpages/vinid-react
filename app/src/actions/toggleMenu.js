import shortid from 'shortid';
import * as types from './types';
import * as setInfo from './apiSetInfo';

export function deleteFlashMessages() {
	return {
		type: types.DELETE_FLASH_MESSAGES,
	};
}

export function deleteFlashMessage(id) {
	return {
		type: types.DELETE_FLASH_MESSAGE,
		id,
	};
}

export function addFlashMessage(oldmessage) {
	const message = oldmessage;
	message.id = shortid.generate();
	return {
		type: types.ADD_FLASH_MESSAGE,
		message,
	};
}

export function toggleNav() {
	return {
		type: types.TOGGLE_NAV,
	};
}

export function toggleSidebar() {
	return {
		type: types.TOGGLE_SIDEBAR,
	};
}

export function change_page(page) {
	return (dispatch) => {
		dispatch(update_page(page));
	};
}
export function change_page_mobile(page) {
	return (dispatch) => {
		dispatch(update_page(page));
		dispatch(closeNav());
		dispatch(closeSidebar());
	};
}

export function update_page(page) {
	return {
		type: types.CHANGE_CURRENT_PAGE,
		page,
	};
}
export function closeNav() {
	return {
		type: types.CLOSE_NAV,
	};
}
export function closeSidebar() {
	return {
		type: types.CLOSE_SIDEBAR,
	};
}
