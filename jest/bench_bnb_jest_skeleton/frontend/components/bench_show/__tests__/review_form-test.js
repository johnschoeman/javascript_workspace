import React from 'react';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { mount } from 'enzyme';
import ReviewFormContainer from '../review_form_container';
import MockRouter from 'react-mock-router';

const bench = { id: 1, description: "great!", lat: 1.2, lng: 3.4 };
const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);
const testStore = mockStore({ benches: { [bench.id]: bench } });
const push = jest.fn();

describe('review form container', () => {
  let reviewFormWrapper,
      reviewRating,
      reviewBody,
      benchShowButton;

  describe('creating a new review', () => {
    beforeEach(() => {
      reviewFormWrapper = mount(
        <MockRouter push={push}>
          <ReviewFormContainer store={testStore} />
        </MockRouter>
      ).find('ReviewForm');

      reviewRating = reviewFormWrapper.find('input').filterWhere(input => (
        input.props().type === 'number'
      ));
      reviewBody = reviewFormWrapper.find('textarea');
      benchShowButton = reviewFormWrapper.find('button');
      console.log(reviewFormWrapper.debug());
    });

    test('correctly maps dispatch to props', () => {
      // Your code here
    });

    test('pre-fills rating field to 5', () => {
      // Your code here
    });

    test('pre-fills comment field with empty string', () => {
      // Your code here
    });

    test('navigates to bench show on button click', () => {
      // Refer to react-mock-router docs
     // Your code here
    });
  });

});
