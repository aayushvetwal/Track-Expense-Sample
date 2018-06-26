import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import numeral from 'numeral';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';

export const ExpensesSummary = (props) => (
	<div className='page-header'>
		<div className='content-container'>
			<h1 className='page-header__title'>
				Viewing <span>{props.expensesCount}</span> expense(s) totalling <span>{numeral(props.expensesTotal).format('$0,0.00')}</span>
				<div className='page-header__actions'>
					<Link className='button' to='/create'>Add Expense</Link>
				</div>
			</h1>
		</div>
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