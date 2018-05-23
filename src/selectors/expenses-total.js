export default (expenses=[]) => {
	return expenses.reduce((acc, expense) => {
		if(expenses.length === 0) return 0;
		else{
			if(expense.amount)
				return acc + expense.amount/100;
		}
	}, 0);
};
