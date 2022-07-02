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
		console.log(e);
		console.log(e.target.name);
		this.props.change_page(e.target.name);
	}

	render() {
		return (
		<nav className="navbar navbar-toggleable-sm sticky-top pad-top-0 pad-bottom-0" key="navHeader">
				<div className="container-fluid pad-left-1">
				<div className="dropdown">
					<button type="button" className="navbar-dark navbar-toggler text-white float-left" id="dropdownMenuButton" onClick={this.props.toggleNav}>
						<span className="navbar-toggler-icon" /> MENU
					</button>
					 <div className={((this.props.nav_status === false)) ? 'dropdown-menu' : 'dropdown-menu show'} aria-labelledby="dropdownMenuButton">
					    <a className="dropdown-item" href="#" name="vin-search" onClick={this.change_page.bind(this)}>Home</a>
					    <a className="dropdown-item" href="#" name="vehicle-list" onClick={this.change_page.bind(this)}>VIN List</a>
					    <a className="dropdown-item" href="#" name="profile" onClick={this.change_page.bind(this)}>My Profile</a>
					    <a className="dropdown-item" href="#" onClick={this.logout}>Log Out</a>
					  </div>
				</div>
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
