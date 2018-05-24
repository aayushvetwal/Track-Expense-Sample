import React from 'react';
import {connect} from 'react-redux';
import numeral from 'numeral';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';

export const ExpensesSummary = (props) => (
	<div>
		<p>
			Viewing {props.expensesCount} expense(s) totallingss {numeral(props.expensesTotal).format('$0,0.00')}
		</p>
	</div>
);

const matchStateToProps = (state) => {
	const expenses = selectExpenses(state.expenses, state.filters);
	return {
		expensesCount: expenses.length,
		expensesTotal: selectExpensesTotal(expenses)
	}
};

export default connect(matchStateToProps)(ExpensesSummary);