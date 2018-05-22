import {createStore} from 'redux';

//ACTION GENERATORS - functions that return Action objects

const incrementCount = ({incrementBy = 1} = {}) => ({	//destructuring, default parameter
	type: 'INCREMENT',
	incrementBy
});
//providing default parameter of empty object for destructured object makes sure that there is no exception (cannot //read property of undefined)when the desired property is absent.

const decrementCount = ({decrementBy = 1} = {}) => ({
	type: 'DECREMENT',
	decrementBy
});

const setCount = ({count}) => ({
	type: 'SET',
	count
});

const resetCount = () => ({
	type: 'RESET'
});

//REDUCERS
//1. Reducers are pure functions (output only depends on input arguments and not on anything outside the function scope)
//2. Never directly change state or action
const countReducer = (state = {count: 0}, action) => {
	switch(action.type){
		case 'INCREMENT':
			return {
				count: state.count + action.incrementBy
			};
		case 'DECREMENT':
			return {
				count: state.count - action.decrementBy
			};
		case 'RESET':
			return {
				count: 0
			};
		case 'SET':
			return {
				count: action.count
			};
		default:
			return state;
	}
};


const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
	console.log(store.getState());
});

//Actions: object that gets sent to the store (to alter state)

//I'd like to increment the count
/*store.dispatch({
	type: 'INCREMENT',
	incrementBy: 5
});*/
store.dispatch(incrementCount({incrementBy: 5}));

store.dispatch(incrementCount());

//unsubscribe();

//I'd like to reset the count to zero
/*store.dispatch({
	type: 'RESET'
});*/
store.dispatch(resetCount());

/*store.dispatch({
	type: 'DECREMENT',
	decrementBy: 3
});*/
store.dispatch(decrementCount({decrementBy: 3}));

/*store.dispatch({
	type: 'DECREMENT'
});*/
store.dispatch(decrementCount());

/*store.dispatch({
	type: 'SET',
	count: 15
});*/
store.dispatch(setCount({count: 15}));