import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import VinSearch from '../../components/VinSearch';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import SubHeader from '../../components/SubHeader';
import FileImport from './FileImport';
import Users from './Users';
import VehiclesTable from './VehiclesTable';

import {
	resetRefresh,
} from '../../src/actions/apiSetInfo';

class AdminDashboard extends PureComponent {
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

		return (
			<div className="overlay">
				<div className="col-md-12">
				<div className="col-md-12 pad-bottom-1 pad-top-1 text-center">
							<img src="https://cdn.vin-id.com/vinid_logos/vinid-logo.png" className="img-fluid float-end" style={{ width: '150px' }} />
						</div>
					return <div className="container-fluid main">
			<Header />
			<div className={sidebar}>
				<Sidebar />
				<div className={maincontent}>
					<SubHeader />
					{(() => {
						switch (this.props.page) {
						case 'vin-search':
							return <VinSearch />;
						case 'file-import':
							return <FileImport />;
						case 'users':
							return <Users />;
						case 'vehicles-table':
							return <VehiclesTable />;
						default:
							return <VinSearch />;
						}
					})()}
				</div>
			</div>
			<Footer />
		</div>;
				</div>
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
export default connect(mapStateToProps, mappedActions)(AdminDashboard);
