import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LoginForm from './LoginForm';
import FlashMessageList from '../../inputs/FlashMessageList';

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = { username: '', password: '' };
	}

	render() {
		return (
			<div className="overlay">
				<div className="col-md-12">
				<div className="col-md-12 pad-bottom-1 pad-top-1 text-center">
							<img src="https://cdn.vin-id.com/vinid_logos/vinid-logo.png" className="img-fluid float-end" style={{ width: '150px' }} />
						</div>
					<div className="loginBox col-md-4 offset-md-4">
						<div className="row">
							<FlashMessageList {...this.props} />
						</div>
						<LoginForm {...this.props} />
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {};
}
export default withRouter(connect(mapStateToProps)(Login));
