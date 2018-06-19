import React from 'react';
import {shallow} from 'enzyme';
//import toJSON from 'enzyme-to-json';
//import ReactShallowRenderer from 'react-test-renderer/shallow';
import {Header} from '../../components/Header';

let startLogout, wrapper;

beforeEach(() => {
	startLogout = jest.fn();
	wrapper = shallow(<Header startLogout={startLogout}/>);
});

test('should render Header correctly', () => {
	//expect(wrapper.find('h1').length).toBe(1);
	//expect(wrapper.find('h1').text()).toBe('Expensify');
	
	//expect(toJSON(wrapper)).toMatchSnapshot();
	expect(wrapper).toMatchSnapshot();
	
	/*
	const renderer = new ReactShallowRenderer();
	renderer.render(<Header />);
	expect(renderer.getRenderOutput()).toMatchSnapshot();
	console.log(renderer.getRenderOutput());
	*/
});

test('should call startLogout on button click', () => {
	wrapper.find('button').simulate('click');
	expect(startLogout).toHaveBeenCalled();
});