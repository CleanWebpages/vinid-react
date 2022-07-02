import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import {
	deleteFlashMessage,
} from '../src/actions/toggleMenu';

export class FlashMessage extends PureComponent {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);

		this.state = { message: this.props.message };
	}

	onClick() {
		this.props.deleteFlashMessage(this.props.message.id);
	}

	render() {
		const { id, type, text } = this.state.message;

		return (
			<div className={classnames('container-fluid alert text-center', {
				'container-fluid alert-success': type === 'success',
				'container-fluid alert-danger': type === 'error',
			})}
			>
				<button onClick={this.onClick} className="close"><span aria-hidden="true">&times;</span></button>
				{text}
			</div>
		);
	}
}

class FlashMessageList extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {};
	}

	showMessages() {
		return [this.props.messages] || [];
	}

	render() {
		return (
			<div className="container-fluid">

				{this.showMessages().map((message) => {
					if (message.id) {
						return <FlashMessage key={message.id} message={message} deleteFlashMessage={this.props.deleteFlashMessage} />;
					}
				})}

			</div>
		);
	}
}

const mappedActions = {
	deleteFlashMessage,
};

function mapStateToProps(state) {
	return {
		messages: state.settings_site.flash_messages,
	};
}
export default withRouter(connect(mapStateToProps, mappedActions)(FlashMessageList));
