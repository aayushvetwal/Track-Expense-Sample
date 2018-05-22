import React from 'react';
import {connect} from 'react-redux';

import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

export const ExpenseList = (props) => (
    <div>
		{
			props.expenses.length === 0 ? (
				<p>No Expenses</p>
			) : (
				props.expenses.map((expense) => <ExpenseListItem key={expense.id} {...expense} />)
			)
		}
    </div>
);

const mapStateToProps = (state) => {
	return {
        expenses: selectExpenses(state.expenses, state.filters)
	};
};

export default connect(mapStateToProps)(ExpenseList);	//connect returns hoc

//when you connect a component(here ExpenseList) to a redux store, it gets rerendered as the 
//store changes with new values. So, we don't really need to subscribe to store..necessary rerendering 
//for changes is handled by react-redux. This makes our component really simple.
