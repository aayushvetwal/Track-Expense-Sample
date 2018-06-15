import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import {startSetExpenses} from './actions/expenses';
import {setTextFilter} from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import './firebase/firebase';

const store = configureStore();

/*
store.subscribe(() => {
	const state = store.getState();
	console.log(state);
	console.log(getVisibleExpenses(state.expenses, state.filters));
});

store.dispatch(addExpense({description: 'water bill', amount: 5000}));
store.dispatch(addExpense({description: 'gas bill', amount: 8000}));
store.dispatch(addExpense({description: 'rent bill', amount: 109500}));
store.dispatch(setTextFilter(''));
*/

const jsx = (
	<Provider store={store}>
		<AppRouter />
	</Provider>
);

store.dispatch(startSetExpenses()).then(() => {
	ReactDOM.render(jsx, document.getElementById('app'));
});



