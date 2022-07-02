import * as getInfo from './apiGetInfo';
import * as setInfo from './apiSetInfo';
import * as AuthenticationActions from './authentication';
import * as toggleMenu from './toggleMenu';
import * as users from './users';

export const ActionCreators = {
	...getInfo,
	...setInfo,
	...AuthenticationActions,
	...toggleMenu,
	...users,
};

export default 'ActionCreators';
