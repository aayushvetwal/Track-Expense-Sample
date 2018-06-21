import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {startAddExpense, 
		addExpense, 
		editExpense, 
		removeExpense, 
		setExpenses, 
		startSetExpenses, 
		startRemoveExpense,
		startEditExpense} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const uid = 'testuid';
const defaultAuthState = {auth:{uid}};
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
	const expensesData = {};
	expenses.forEach(({id, description, note, amount, createdAt}) => {
		expensesData[id] = {description, note, amount, createdAt};
	});
	database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
});

test('should setup remove expense action object', () => {
	const action = removeExpense({id: '123abc'});
	expect(action).toEqual({
		type: 'REMOVE_EXPENSE',
		id: '123abc'
	});
});


test('should delete expense from firebase', (done) => {
	const store = createMockStore(defaultAuthState);
	const id = expenses[0].id;
	store.dispatch(startRemoveExpense({id})).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'REMOVE_EXPENSE',
			id
		});
		return database.ref(`users/${uid}/expenses/${id}`).once('value');
	}).then((snapshot) => {
		expect(snapshot.val()).toBeFalsy();
		done();
	});
});


test('should setup edit expense action object', () => {
	const id = '123abc';
	const updates = {amount: 10, description: 'book'};
	const action = editExpense(id, updates);
	expect(action).toEqual({
		type: 'EDIT_EXPENSE',
		id,
		updates
	});
});

test('should edit expenses in firebase', (done) => {
	const store = createMockStore(defaultAuthState);
	const id = expenses[0].id;
	const updates = {amount: 2100};
	store.dispatch(startEditExpense(id, updates)).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'EDIT_EXPENSE',
			id,
			updates
		});
		return database.ref(`users/${uid}/expenses/${id}`).once('value');
	}).then((snapshot) => {
		expect(snapshot.val().amount).toBe(updates.amount);
		done();
	});
});

test('should setup add action object with provided values', () => {
	const action = addExpense(expenses[2]);
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: expenses[2]
	});
});

test('should add expense to database and store', (done) => {
	const store = createMockStore(defaultAuthState);
	const expenseData = {
		description: 'Mouse',
		amount: 1000,
		note: 'better',
		createdAt: 1550
	};
	store.dispatch(startAddExpense(expenseData)).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'ADD_EXPENSE',
			expense: {
				id: expect.any(String),
				...expenseData
			}
			
		});
		
		return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
	}).then((snapshot) => {
		expect(snapshot.val()).toEqual(expenseData);
		done();
	});
});

/*
test('should add expense with defaults to database and store', () => {
	const store = createMockStore({});
	const expenseData = {
		description: '', 
		note: '', 
		amount: 0, 
		createdAt: 0
	};
	store.dispatch(startAddExpense({})).then(() => {
		const actions = store.getActions();
		console.log('here1:', actions);
		expect(actions[0]).toEqual({
			type: 'ADD_EXPENSE',
			expense: {
				id: expect.any(String),
				...expenseData
			}
		});
		
		return database.ref(`expenses/${actions[0].expense.id}`).once('value');
	}).then((snapshot) => {
		expect(snapshot.val()).toEqual(expenseData);
		done();
	});
});
*/

test('should setup set expense action object with data', () => {
	const action = setExpenses(expenses);
	console.log('here2:', action);
	expect(action).toEqual({
		type: 'SET_EXPENSES',
		expenses
	});
});

test('should fetch the expenses from firebase', (done) => {
	const store = createMockStore(defaultAuthState);
	store.dispatch(startSetExpenses()).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'SET_EXPENSES',
			expenses
		});
		done();
	});
});

//----------------------------------------------------------------------------------

/*
test('should setup add action object with default values', () => {
	const defaultExpense = {
		description: '', 
		note: '', 
		amount: 0, 
		createdAt: 0
	};
	const action = addExpense();
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: {
			...defaultExpense, 
			id: expect.any(String)
		}
	});
});
*/