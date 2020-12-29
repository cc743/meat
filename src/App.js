import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import EventGenre from './EventGenre';
import { getEvents, extractLocations } from './api';
import { WarningAlert } from './Alert';
import './nprogress.css'; 
import {ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';

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

  getData = () => {
    const {locations, events} = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length;
      const city = location.split(',').shift();
      return {city, number};
    })
    return data;
  };

  render () {
    return (
      <div className="App">
        <WarningAlert text={this.state.infoText}/>
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents}/>
        <NumberOfEvents numberOfEvents={this.state.numberOfEvents} updateEvents={this.updateEvents}/> 
        <h4>Events in each city</h4>

        <div className="data-vis-wrapper">
          <EventGenre events={this.state.events} />
          <ResponsiveContainer height={400}>
            <ScatterChart margin={{top: 20, right: 20, bottom: 20, left: 20,}}>
              <CartesianGrid />
              <XAxis type="category" dataKey="city" name="city" />
              <YAxis type="number" dataKey="number" name="number of events" allowDecimals={false} />
              <Tooltip cursor={{strokeDasharray: '3 3'}} />
              <Scatter data={this.getData()} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <EventList events={this.state.events}/>
      </div>
    );
  }
}

export default App;