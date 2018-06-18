import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {startAddExpense, addExpense, editExpense, removeExpense, setExpenses, startSetExpenses, startRemoveExpense} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
	const expensesData = {};
	expenses.forEach(({id, description, note, amount, createdAt}) => {
		expensesData[id] = {description, note, amount, createdAt};
	});
	database.ref('expenses').set(expensesData).then(() => done());
});

test('should setup remove expense action object', () => {
	const action = removeExpense({id: '123abc'});
	expect(action).toEqual({
		type: 'REMOVE_EXPENSE',
		id: '123abc'
	});
});

/*
test('should delete expense from firebase', (done) => {
	const store = createMockStore({});
	const id = expenses[0].id;
	store.dispatch(startRemoveExpense({id})).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'REMOVE_EXPENSE',
			id
		});
		return database.ref(`expenses/${id}`).remove();
	}).then((snapshot) => {
		expect(snapshot.val()).toBeFalsy();
		done();
	});
});
*/

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

test('should setup add action object with provided values', () => {
	const action = addExpense(expenses[2]);
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: expenses[2]
	});
});

test('should add expense to database and store', (done) => {
	const store = createMockStore({});
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
		
		return database.ref(`expenses/${actions[0].expense.id}`).once('value');
	}).then((snapshot) => {
		expect(snapshot.val()).toEqual(expenseData);
		done();
	});
});

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

/*
test('should setup set expense action object with data', () => {
	const action = setExpenses(expenses);
	console.log('here2:', action);
	expect(action).toEqual({
		type: 'SET_EXPENSES',
		expenses
	});
});*/ 

/*
test('should fetch the expenses from firebase', (done) => {
	const store = createMockStore({});
	store.dispatch(startSetExpenses()).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'SET_EXPENSES',
			expenses
		});
		done();
	});
});
*/

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