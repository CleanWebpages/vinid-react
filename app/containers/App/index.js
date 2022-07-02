import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
	createStore, applyMiddleware, combineReduxers, compose,
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from '../../src/reducers';
import Home from '../Home';
import { getUser } from '../../src/actions/apiGetInfo';

const loggerMiddleware = createLogger({ predicate: (getState, action) => process.env.NODE_ENV === 'development' });

function configureStore(initialState) {
	const enhancer = compose(
		applyMiddleware(
			thunkMiddleware,
			loggerMiddleware,
		),
		window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
	);
	return createStore(reducer, initialState, enhancer);
}

const store = configureStore({});

if (localStorage.reconToken != '' && parseInt(localStorage.reconUser) > 0) {
	store.dispatch(getUser());
}

export default class AppContainer extends React.Component {
	render() {
		return (
			<Provider store={store}>

				<Home />

			</Provider>
		);
	}
}
