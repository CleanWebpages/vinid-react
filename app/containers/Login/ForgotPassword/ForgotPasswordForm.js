import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextFieldGroup from '../../../inputs/TextFieldGroup';

class ForgotPasswordForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '', password: '', errors: { loginError: '' }, isLoading: false,
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit(e) {
		const self = this;
		e.preventDefault();
		if (this.state.username === '') {
			this.props.addFlashMessage({
				type: 'error',
				text: 'Email/Username must not be blank',
			});
			setTimeout(() => { self.props.deleteFlashMessages(); }, 10000);
		} else {
			this.setState({ errors: { loginError: '' }, isLoading: true });
			const self = this;
			this.props.forgotpassword(this.state.username).then((resp) => {
				if (resp == 'password reset has been sent') {
					this.props.addFlashMessage({
						type: 'success',
						text: 'Password reset has been sent!',
					});
					setTimeout(() => { self.props.deleteFlashMessages(); }, 5000);
					setTimeout(() => { self.props.history.push('/'); }, 5000);
				} else {
					this.props.addFlashMessage({
						type: 'error',
						text: resp.errors.loginError,
					});
					setTimeout(() => { self.props.deleteFlashMessages(); }, 3000);
					this.setState({ isLoading: false });
				}
			});
		}
	}

	render() {
		const { errors } = this.state;
		return (
			<form onSubmit={this.onSubmit} style={{ color: '#FFF' }}>
				<TextFieldGroup
					field="username"
					label="Username or Email"
					onChange={this.onChange}
					value={this.state.username}
					type="text"
					error={errors.loginError}
				/>

				<div className="form-group pad-top-1">
					<button
						disabled={this.state.isLoading}
						type="submit"
						className="btn btn-primary"
					>
                        Request Password Reset
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
export default withRouter(connect(mapStateToProps)(ForgotPasswordForm));
