import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import TextFieldGroup from '../../../inputs/TextFieldGroup';

class Profile extends Component {
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
		return (
		<div className="col-md-4 offset-md-4 searchbox">
						<div className="col-md-12 pad-bottom-1 pad-top-1 text-center">
							<img src="https://cdn.vin-id.com/vinid_logos/vin-id-logo.png" className="img-fluid float-end" style={{ width: '650px' }} />
						</div>
						<div className="col-md-8 offset-md-2 pad-top-2">
							<div className="input-group space-top-2">
								<div className="input-group-prepend">
									<span className="btn btn-sm btn-light">VIN</span>
								</div>
								<input type="text" onKeyDown={this.onKeyDown} className="form-control search-input input-sm" placeholder="Please Input Vin" onFocus={this.onFocus} onChange={this.onChange} name="search" value={this.state.search} />
								<div className="input-group-prepend">
									<i className={'fa fa-search pad-right-1 pad-left-1'} />
								</div>
							</div>
						</div>
					</div>);
	}
}

function mapStateToProps(state) {
	return { current_user_state: state.current_user_state };
}
export default withRouter(connect(mapStateToProps)(Profile));
