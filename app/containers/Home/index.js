import React, { Component } from 'react';
import {
	BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../src/actions';
import PasswordReset from '../Login/PasswordReset';
import ForgotPassword from '../Login/ForgotPassword';
import Dashboard from '../Dashboard';
import Login from '../Login';
import 'bootstrap/scss/bootstrap.scss';
import '../../style/style-helpers.scss';
import '../../style/style.scss';
import '../../style/inputs.scss';
import '../../style/ic.scss';
import '../../style/sidebar.scss';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<BrowserRouter basename="/">
				<Switch>
					<Route
						exact
						path="/"
						render={props => (this.props.current_user.isAuthenticated === true
							? <Dashboard {...this.props} />
							: <Redirect to="/login" />)}
					/>
					<Route
						exact
						path="/forgotpassword"
						render={props => <ForgotPassword {...this.props} />}
					/>
					<Route
						exact
						path="/password_resets"
						render={props => <PasswordReset {...this.props} />}
					/>
					<Route
						path="/password_resets/:resetToken"
						render={props => <PasswordReset {...this.props} />}
					/>On
					<Route
						exact
						path="/login"
						render={props => (this.props.current_user.isAuthenticated === true
							? <Redirect to="/" />
							: <Login {...this.props} />)}
					/>

				</Switch>
			</BrowserRouter>
		);
	}
}
function mapStateToProps(state) {
	return {
		current_user: state.current_user,
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
