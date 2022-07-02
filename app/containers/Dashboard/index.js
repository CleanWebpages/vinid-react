import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import VinSearch from '../../components/VinSearch';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import SubHeader from '../../components/SubHeader';
import Profile from './Profile';
import VehicleList from './VehicleList';
import VehicleSingle from './VehicleSingle';

import {
	resetRefresh,
} from '../../src/actions/apiSetInfo';

class Dashboard extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			search: '', errors: {}, isLoading: false, include_sold: this.props.include_sold,
		};
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

	render() {
		var sidebar = 'row row-offcanvas row-offcanvas-left';
		var maincontent = 'col-md-8 col-lg-9 main-vehicles pad-top-0 pad-left-0 pad-right-0';
		const hideArray = [];

		if (this.props.sidebar_status) {
			if (this.props.sidebar_status_right) {
				sidebar = 'row row-offcanvas row-offcanvas-left row-offcanvas-right active right-active space-right-0 space-left-0';
			} else {
				sidebar = 'row row-offcanvas row-offcanvas-left row-offcanvas-right active space-right-0 space-left-0';
			}
		} else if (this.props.sidebar_status_right) {
			sidebar = 'row row-offcanvas row-offcanvas-left row-offcanvas-right right-active space-right-0 space-left-0';
		} else {
			sidebar = 'row row-offcanvas row-offcanvas-left row-offcanvas-right space-right-0 space-left-0';
		}

		if (hideArray.includes(this.props.page)) {
			if (this.props.sidebar_status_right) {
				maincontent = 'col-md-8 col-lg-9 main-vehicles pad-top-0 pad-left-0 pad-right-0';
			} else {
				maincontent = 'col-md-12 main-vehicles pad-top-0 pad-left-0 pad-right-0';
			}
		} else if (this.props.sidebar_status && this.props.sidebar_status_right) {
			maincontent = 'col-md-5 col-lg-6 main-vehicles pad-top-0 pad-left-0 pad-right-0';
		} else if (this.props.sidebar_status || this.props.sidebar_status_right) {
			maincontent = 'col-md-8 col-lg-9 main-vehicles pad-top-0 pad-left-0 pad-right-0';
		} else {
			maincontent = 'col-md-12 main-vehicles pad-top-0 pad-left-0 pad-right-0';
		}

		return (
		<div className="container-fluid main">
				<Header />
				<div className={sidebar}>
							<Sidebar />
							<div className={maincontent}>
								{(() => {
									switch (this.props.page) {
									case 'vehicle-list':
										return <VehicleList />;
									case 'vehicle-single':
										return <VehicleSingle />;
									case 'vin-search':
										return <VinSearch />;
									case 'profile':
										return <Profile />;
									default:
										return <VinSearch />;
									}
								})()}
							</div>
				</div>
			<Footer />
		</div>
		);
	}
}

const mappedActions = {
	resetRefresh,
};

function mapStateToProps(state) {
	return {
		sidebar_status: state.settings_site.menus.sidebar_status,
		sidebar_status_right: state.settings_site.menus.sidebar_status_right,
		page: state.settings_site.page,
	};
}
export default connect(mapStateToProps, mappedActions)(Dashboard);
