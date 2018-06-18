import React from 'react';
import {shallow} from 'enzyme';
import {EditExpensePage} from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let editExpense, startRemoveExpense, history, wrapper;

beforeEach(() => {
	editExpense = jest.fn();
	startRemoveExpense = jest.fn();
	history = {push: jest.fn()};
	wrapper = shallow(<EditExpensePage editExpense={editExpense} startRemoveExpense={startRemoveExpense} history={history} expense={expenses[0]} />);
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
	expect(startRemoveExpense).toHaveBeenLastCalledWith({id: expenses[0].id});
	expect(history.push).toHaveBeenLastCalledWith('/');
});