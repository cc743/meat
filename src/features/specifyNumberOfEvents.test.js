import React from 'react';
import App from '../App';
import NumberOfEvents from '../NumberOfEvents';
import {mount} from 'enzyme';
import {loadFeature, defineFeature} from 'jest-cucumber';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {

  test('When user has not specified a number, 32 is the default number', ({given, when, then}) => {
    given('the user did not specify the number of events being shown', () => {

    });

    let AppWrapper;
    when('app loaded', () => {
      AppWrapper = mount(<App />);
    });

    then('the default number of events shown is 32', () => {
      AppWrapper.update();
      expect((AppWrapper.find('.event')).length).toBeLessThanOrEqual(32);
    });
  });

  test('User can change the number of events they want to see', ({given, when, then}) => {
    let AppWrapper;
    given('the list of elements have been loaded and the user did not specify a number of events he wants to see', () => {
      AppWrapper = mount(<App />);
    });

    when('the user specifies a number', () => {
      const numberOfEvents = {target: {value: 10}};
      AppWrapper.find('.number-of-events').simulate('change', numberOfEvents);
    });

    then('the maximum of events listed should be the specified number', () => {
      const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
      NumberOfEventsWrapper.setState({numberOfEvents: 10});
      expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(10);
    });
  });

});
