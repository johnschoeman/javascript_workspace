import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import CheckboxWithLabel from '../components/CheckboxWithLabel';

configure({ adapter: new Adapter() });

test('CheckboxWithLabel changes text on click', () => {
const checkbox = shallow(<CheckboxWithLabel labelOn="On" labelOff = "Off" />);

  expect(checkbox.text()).toEqual('Off');

  checkbox.find('input').simulate('change');

  expect(checkbox.text()).toEqual('On');
});