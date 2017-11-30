import React from 'react';
import FilterForm from '../filter_form';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';


const setup = () => {
  const props = {
    minSeating: 2,
    maxSeating: 5,
    updateFilter: jest.fn(),
  };

  const filterFormWrapper = shallow(<FilterForm {...props } />);
  // const filterFormWrapper = mount(<...>);

  return {
    filterFormWrapper,
    props,
  };
};

describe('FilterForm', () => {
  let minSeatFilter;
  const { filterFormWrapper, props } = setup();
  minSeatFilter = filterFormWrapper.find('input').first();

  test('minSeating filter defaults to the passed in props of minSeating', () => {
    // your code here
    expect(minSeatFilter.props().value).toEqual(props.minSeating);
  });

  test('updates filter onChange', () => {
    // Your code here
    minSeatFilter.props().onChange({ currentTarget: { value: 3 } });  //passing in event object.
    expect(props.updateFilter.mock.calls.length).toBe(1);
  });

  test ('renders correctly', () => {
    // Snapshot testing here
  });
});
