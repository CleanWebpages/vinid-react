import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import TextFieldGroup from '../../../inputs/TextFieldGroup';
import FakeTable from './FakeTable.js';
import { getVehicles } from '../../../src/actions/apiGetInfo';

class VehicleList extends Component {
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

	componentDidMount() {
		this.props.getVehicles();
	}

	render() {
		console.log(this.props.vehicles);

		return (<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div className="pad-bottom-1 pad-top-1 text-center">
								<img src="https://cdn.vin-id.com/vinid_logos/vin-id-logo.png" className="img-fluid text-center" style={{ maxWidth: '400px' }} />
							</div>
							<table className="table table-striped table-dark">
								<thead>
									<tr>
										<th>No</th>
										<th>VIN</th>
										<th>Year</th>
										<th>Make</th>
										<th>Model</th>
									</tr>
								</thead>
								<tbody>{_.sortBy(this.props.vehicles, 'vehicle_number').map(vehicle => <tr key={`${vehicle.vehicle_number}`}><td>{vehicle.vehicle_number}</td><td>{vehicle.vin}</td><td>{vehicle.year}</td><td>{vehicle.make}</td><td>{vehicle.model}</td></tr>)}
</tbody>
							</table>
					</div></div></div>);
	}
}

const mappedActions = {
	getVehicles,
};

function mapStateToProps(state) {
	return {
		current_user_state: state.current_user_state,
		vehicles: state.settings_refresh.active_vehicles,
	 };
}
export default withRouter(connect(mapStateToProps, mappedActions)(VehicleList));
