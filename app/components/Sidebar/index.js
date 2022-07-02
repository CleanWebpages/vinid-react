import React, { Component } from 'react';
import { connect } from 'react-redux';

class Sidebar extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		const hideArray = [];
		return (
			<div className={((hideArray.includes(this.props.page) || (this.props.sidebar_status === false)) ? 'no-display' : 'col-md-4 col-lg-3 sidebar-offcanvas pad-left-0 pad-right-0 sidebar')} key="sidebar" id="sidebar" role="navigation">
				<li className={this.props.page == 'vin-search' ? 'nav-item active' : 'nav-item'}>
					<a className={'nav-link'}>Home</a>
					</li>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		page: state.settings_site.page,
		sidebar_status: state.settings_site.menus.sidebar_status,
	};
}
export default connect(mapStateToProps)(Sidebar);
