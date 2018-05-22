import {addExpense, editExpense, removeExpense} from '../../actions/expenses';

test('should setup remove expense action object', () => {
	const action = removeExpense({id: '123abc'});
	expect(action).toEqual({
		type: 'REMOVE_EXPENSE',
		id: '123abc'
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

test('should setup add action object with provided values', () => {
	const expense = {
		description:'Book', 
		note: 'Sherlock Holmes', 
		amount: 9.99, 
		createdAt: 125000
	};
	const action = addExpense(expense);
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: {
			...expense, 
			id: expect.any(String)
		}
	});
});

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