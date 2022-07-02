import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PasswordResetForm from './PasswordResetForm';
import FlashMessageList from '../../../inputs/FlashMessageList';

class PasswordReset extends Component {
	constructor(props) {
		super(props);

		this.state = { username: '', password: '' };
	}

	componentDidMount() {
	}

	render() {
		return (
			<div className="overlay">

				<div className="col-md-12">
					<div className="loginBox col-md-4 text-white offset-md-4">
						<div className="col-md-12 pad-bottom-1 pad-top-1 text-center" />
						<div className="row">
							<FlashMessageList {...this.props} />
						</div>
						<PasswordResetForm {...this.props} />
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
	};
}
export default connect(mapStateToProps)(PasswordReset);
