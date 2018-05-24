import React from 'react';
import {shallow} from 'enzyme';
import {ExpensesSummary} from '../../components/ExpensesSummary';

test('should render ExpensesSummary correctly with one expense', () => {
	const wrapper = shallow(<ExpensesSummary expensesCount={1} expensesTotal={100} />);
	expect(wrapper).toMatchSnapshot();
});

test('should render ExpensesSummary correctly with multiple expenses', () => {
	const wrapper = shallow(<ExpensesSummary expensesCount={20} expensesTotal={2000} />);
	expect(wrapper).toMatchSnapshot();
});