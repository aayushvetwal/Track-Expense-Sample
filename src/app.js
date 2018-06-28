import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppRouter, {history} from './routers/AppRouter';
import configureStore from './store/configureStore';
import {startSetExpenses} from './actions/expenses';
import {setTextFilter} from './actions/filters';
import {login, logout} from './actions/auth';
import getVisibleExpenses from './selectors/expenses';
import LoadingPage from './components/LoadingPage';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import {firebase} from './firebase/firebase';

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

let hasRendered = false;
const renderApp = () => {
	if(!hasRendered){
		ReactDOM.render(jsx, document.getElementById('app'));
		hasRendered = true;
	}
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
	if(user){
		store.dispatch(login(user.uid));
		store.dispatch(startSetExpenses()).then(() => {
			renderApp();
			if(history.location.pathname === '/'){
				history.push('/dashboard');
			}
		});
		//console.log('log-in');
	} else {
		store.dispatch(logout());
		renderApp();
		history.push('/')
		//console.log('log-out');
	}
});

