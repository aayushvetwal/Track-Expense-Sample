import authReducer from '../../reducers/auth';

test('should set uid for login', () => {
	const type = 'LOGIN';
	const uid = '001';
	const state = authReducer(undefined, {type, uid});
	expect(state).toEqual({uid});
});

test('should clear uid for logout', () => {
	const type = 'LOGOUT';
	const state = authReducer(undefined, {type});
	expect(state).toEqual({});
});