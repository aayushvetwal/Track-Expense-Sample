import selectExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('should return 0 if no expenses', () => {
	expect(selectExpensesTotal()).toBe(0);
});

test('should correctly add up a single expense', () => {
	expect(selectExpensesTotal([expenses[0]])).toBe(1.95);
});

test('should correctly add up multiple expenses', () => {
	expect(selectExpensesTotal(expenses)).toBe(821.95);
});