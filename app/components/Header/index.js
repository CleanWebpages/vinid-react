import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import {
	change_page,
	toggleNav,
	toggleSidebar,
} from '../../src/actions/toggleMenu';
import {
	logout,
} from '../../src/actions/authentication';
import {
	resetRefresh,
} from '../../src/actions/apiSetInfo';

import TextFieldGroup from '../../inputs/TextFieldGroup';
import ButtonWithIcon from '../../inputs/ButtonWithIcon';

class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '', password: '', errors: { loginError: '' }, isLoading: false,
		};
		this.change_page = this.change_page.bind(this);
		this.logout = this.logout.bind(this);
	}

	logout(e) {
		const self = this;
		this.props.logout();
		const { history } = this.props;

		clearInterval(self.props.interval_number);
		setTimeout(() => {
			self.props.resetRefresh();
		}, 2000);
		window.location.reload(true);
	}

	change_page(e) {
		const self = this;
		this.props.change_page(e);
	}

	render() {
		return (
		<nav className="navbar navbar-toggleable-sm sticky-top pad-top-0 pad-bottom-0" key="navHeader">
				<div className="container-fluid pad-left-1">
					<button type="button" className="navbar-dark navbar-toggler text-white float-left" onClick={this.props.toggleSidebar}>
						<span className="navbar-toggler-icon" /> MENU
					</button>
					<div className="d-flex-inline pad-left-1">
						<img src="https://cdn.vin-id.com/vinid_logos/vinid-logo.png" className="img-fluid float-end" style={{ width: '150px' }} />
					</div>
				</div>
			</nav>
		);
	}
}

const mappedActions = {
	resetRefresh,
	change_page,
	logout,
	toggleSidebar,
	toggleNav,
};

function mapStateToProps(state) {
	return {
			current_user_state: state.current_user_state,
			nav_status: state.settings_site.menus.nav_status,
			};
}
export default withRouter(connect(mapStateToProps, mappedActions)(Header));
