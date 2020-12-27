import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';
import { WarningAlert } from './Alert';
import './nprogress.css'; 

class App extends Component {

  state = {
    events: [],
    locations: [],
    currentLocation: "all",
    numberOfEvents: 32,
    infoText: ''
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events: events, locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location, eventCount) => {
    if (!navigator.onLine) {
      this.setState({
        infoText: 'The displayed list has been loaded from the cache, may not be up to date'
      });
    } else {
      this.setState({
        infoText: ''
      });
    }

    const {currentLocation, numberOfEvents} = this.state;
    if (location) {
      getEvents().then((events) => {
        const locationEvents = (location === 'all') ?
          events : 
          events.filter((event) => event.location === location);
        const filteredEvents = locationEvents.slice(0, numberOfEvents); //default case?
        this.setState({
          events: filteredEvents,
          currentLocation: location
        });
      });
    } else {
      getEvents().then((events) => {
        const locationEvents = (currentLocation === 'all') ?
          events : 
          events.filter((event) => event.location === currentLocation);
        const filteredEvents = locationEvents.slice(0, eventCount); //user-inputted case?
        this.setState({
          events: filteredEvents,
          numberOfEvents: eventCount
        });
      });
    }
    
  }

  render () {
    return (
      <div className="App">
        <WarningAlert text={this.state.infoText}/>
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents}/>
        <EventList events={this.state.events}/>
        <NumberOfEvents numberOfEvents={this.state.numberOfEvents} updateEvents={this.updateEvents}/> 
      </div>
    );
  }
}

export default App;
