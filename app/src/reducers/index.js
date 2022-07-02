import { combineReducers } from 'redux';
import * as settings_refresh from './settings_refresh';
import * as settings_users from './settings_users';
import * as authenticationReducer from './authentication';
import * as flashMessages from './flashMessages';
import * as settings_site from './settings_site';

const rootReducer = combineReducers({
	...settings_refresh,
	...settings_users,
	...authenticationReducer,
	...settings_site,
	...flashMessages,
});

export default rootReducer;
