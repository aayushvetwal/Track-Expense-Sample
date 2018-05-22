import React from 'react';
import {shallow} from 'enzyme';
import {EditExpensePage} from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let editExpense, removeExpense, history, wrapper;

beforeEach(() => {
	editExpense = jest.fn();
	removeExpense = jest.fn();
	history = {push: jest.fn()};
	wrapper = shallow(<EditExpensePage editExpense={editExpense} removeExpense={removeExpense} history={history} expense={expenses[0]} />);
});

test('should render EditExpensePage correctly', () => {
	expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
	wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);
	expect(editExpense).toHaveBeenLastCalledWith(expenses[0].id, expenses[0]);
	expect(history.push).toHaveBeenLastCalledWith('/');
});

/*
test('should handle onRemove', () => {
	wrapper.find('button').prop('onClick')();
	expect(removeExpense).toHaveBeenLastCalledWith({id: expenses[0].id});
});
*/

test('should handle onRemove', () => {
	wrapper.find('button').simulate('click', {
		id: expenses[0].id
	});
	expect(removeExpense).toHaveBeenLastCalledWith({id: expenses[0].id});
	expect(history.push).toHaveBeenLastCalledWith('/');
});