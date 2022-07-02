import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import TextFieldGroup from '../../inputs/TextFieldGroup';

class LoginForm extends Component {
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
		e.preventDefault();
		const { history } = this.props;
		this.setState({ errors: { loginError: '' }, isLoading: true });
		const self = this;
		e.preventDefault();
		self.props.login(self.state.username, self.state.password).then((resp) => {
			if (resp == 'logged in') {
				return history.push('/');
			}
			self.props.addFlashMessage({
				type: 'error',
				text: 'Username or Password is incorrect -- Please try again',
			});
			setTimeout(() => { self.props.deleteFlashMessages(); }, 5000);
			self.setState({ isLoading: false });
		});
	}

	render() {
		const { errors } = this.state;
		return (
			<form onSubmit={this.onSubmit} style={{ color: '#FFF' }}>
				<div className="col-md-12 pad-bottom-1 pad-top-1 text-center">
							<img src="https://cdn.vin-id.com/vinid_logos/vin-id-logo.png" className="img-fluid text-center" style={{ width: '620px' }} />
						</div>
				<TextFieldGroup
					field="username"
					placeholder="Username or Email"
					onChange={this.onChange}
					value={this.state.username}
					type="text"
					error={errors.loginError}
					autocomplete="username"
					autocorrect="off"
					autocapitalize="none"
				/>
				<br />
				<TextFieldGroup
					field="password"
					placeholder="Password"
					onChange={this.onChange}
					value={this.state.password}
					type="password"
					error={errors.loginError}
					autocomplete="password"
				/>

				<div className="form-group pad-top-1">
					<button
						disabled={this.state.isLoading}
						type="submit"
						className="btn btn-primary btn-lg text-center"
					>
                        SIGN IN
					</button>
					<a href="/forgotpassword" className="float-end btn btn-dark btn-lg">Forgot Password</a>
				</div>
			</form>
		);
	}
}

function mapStateToProps(state) {
	return { current_user_state: state.current_user_state };
}
export default withRouter(connect(mapStateToProps)(LoginForm));
