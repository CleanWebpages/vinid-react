import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextFieldGroup from '../../../inputs/TextFieldGroup';

class PasswordResetForm extends Component {
	constructor(props) {
		super(props);
		const reset_token = this.props.match.params.resetToken;
		this.state = {
			username: '', password: '', errors: { loginError: '' }, isLoading: false, reset_token,
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit(e) {
		this.setState({ errors: { loginError: '' }, isLoading: true });
		e.preventDefault();
		const self = this;
		self.props.reset_password(this.state.reset_token, this.state.password).then((resp) => {
			if (resp == 'password has been reset') {
				self.props.addFlashMessage({
					type: 'success',
					text: 'Password Has Been Reset! Please login with your new password',
				});
				setTimeout(() => { self.props.deleteFlashMessages(); }, 1000);
				setTimeout(() => { self.props.history.push('/'); }, 1000);
			} else {
				self.props.addFlashMessage({
					type: 'error',
					text: resp.errors.loginError,
				});
				setTimeout(() => { self.props.history.push('/forgotpassword'); }, 1000);
			}
		});
	}

	render() {
		const { errors } = this.state;
		return (
			<form onSubmit={this.onSubmit}>
				<TextFieldGroup
					field="password"
					label="Enter New Password"
					onChange={this.onChange}
					value={this.state.password}
					type="password"
					error={errors.loginError}
				/>
				<br />
				<TextFieldGroup
					field="reset_token"
					label=""
					onChange={this.onChange}
					value={this.state.reset_token}
					type="hidden"
					error={errors.loginError}
				/>

				<div className="form-group pad-top-1">
					<button
						disabled={this.state.isLoading}
						type="submit"
						className="btn btn-primary"
					>
                        Reset Password
					</button>
					<a href="./" className="float-end btn btn-warning">Back to Login</a>
				</div>
			</form>
		);
	}
}

function mapStateToProps(state) {
	return {};
}
export default withRouter(connect(mapStateToProps)(PasswordResetForm));
