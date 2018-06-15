import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set default state', () => {
	const state = expensesReducer(undefined, {type: '@@INIT'});
	expect(state).toEqual([]);
});

test('should remove expense by id', () => {
	const action = {
		type: 'REMOVE_EXPENSE',
		id: expenses[1].id
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expenses if id is not found', () => {
	const action = {
		type: 'REMOVE_EXPENSE',
		id: '-1'
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual([...expenses]);
});

test('should add an expense', () => {
	const expense = {
		id: 4,
		description: 'Coffee',
		note: '',
		amount: 295,
		createdAt: 0 
	};
	const action = {
		type: 'ADD_EXPENSE',
		expense
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual([...expenses, expense]);
});


test('should edit an expense', () => {
	const updates = {
		...expenses[0],
		description: 'pizza',
		amount: 1000
	};
	const action = {
		type: 'EDIT_EXPENSE',
		id: expenses[0].id,
		updates
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual([updates, expenses[1], expenses[2]]);
});


test('should not edit an expense if expense is not found', () => {
	const updates = {
		description: 'pizza',
		note: 'domino\'s',
		amount: 1000,
	};
	const action = {
		type: 'EDIT_EXPENSE',
		id: -1,
		updates
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual([expenses[0], expenses[1], expenses[2]]);
});

test('should set expenses', () => {
	const action = {
		type: 'SET_EXPENSES',
		expenses: [expenses[1]]
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual([expenses[1]]);
});

