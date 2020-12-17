import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> Component', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />) 
  });

  test('render the NumberOfEventsComponent', () => {
    expect(NumberOfEventsWrapper).toHaveLength(1);
  });

  test('render number-of-events element', () => {
    expect(NumberOfEventsWrapper.find('.number-of-events')).toHaveLength(1);
  });

  test('render number-of-events-label', () => {
    expect(NumberOfEventsWrapper.find('.number-of-events-label')).toHaveLength(1);
  });

  test('renders the text input correctly', () => {
    const numberOfEvents = NumberOfEventsWrapper.state('numberOfEvents');
    expect(NumberOfEventsWrapper.find('.event-number-input').prop('value')).toBe(numberOfEvents);
  });

  test('change state when the text input changes', () => {
    NumberOfEventsWrapper.setState({
      numberOfEvents: 32,
    });
    const eventObject = { target: {value: 10} };
    NumberOfEventsWrapper.find('.event-number-input').simulate('change', eventObject);
    expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(10); 
  });

});
