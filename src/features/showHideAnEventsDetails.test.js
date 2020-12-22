import React from 'react';
import App from '../App';
import {mount} from 'enzyme';
import {mockData} from '../mock-data';
import {loadFeature, defineFeature} from 'jest-cucumber';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {

  test('An event element is collapsed by default', ({given, and, when, then}) => {
    given('the list of events has been loaded', () => {

    });

    let AppWrapper;
    and('app loaded', () => {
      AppWrapper = mount(<App />);
    });

    when('the user did not click the details button yet', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
    });

    then('the event elements are collapsed by default', () => {
      expect(AppWrapper.find('.showDetails')).toHaveLength(0);
    });
  });

  test('User can expand an event to see its details', ({given, and, when, then}) => {
    let AppWrapper;
    given('app loaded', () => {
      AppWrapper = mount(<App />);
    });

    and('the list of events has been loaded', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
    });

    when('user clicks on the event\'s details button', () => {
      AppWrapper.find('.event .details-button').at(0).simulate('click');
    });

    then('the event element should expand to reveal its details', () => {
      expect(AppWrapper.find('.event .event-details')).toHaveLength(1);
    });
  });

  test('User can collapse an event to hide its details', ({given, and, when, then}) => {
    let AppWrapper;
    given('app loaded', () => {
      AppWrapper = mount(<App />);
    });

    and('event element is expanded and shows details', () => {
      AppWrapper.update();
      AppWrapper.find('.event .details-button').at(0).simulate('click');
      expect(AppWrapper.find('.event .event-details')).toHaveLength(1);
    });

    when('user clicks on the event\'s details button', () => {
      AppWrapper.find('.event .details-button').at(0).simulate('click');
    });

    then('the event element should collapse to hide its details', () => {
      expect(AppWrapper.find('.event .event-details')).toHaveLength(0);
    });
  });

});
