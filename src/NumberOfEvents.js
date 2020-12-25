import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.props.updateEvents(null, value);
    this.setState({
      numberOfEvents: value
    });
    if (value < 1 || value > 32) {
      this.setState ({
        infoText: 'Please choose a number between 1 and 32'
      })
    } else {
      this.setState ({
        infoText: ''
      })
    }
  };

  render() {
    //const { numberOfEvents } = this.props;
    return (
      <div className='number-of-events'>
        <ErrorAlert text={this.state.infoText} />
        <label className='number-of-events-label'>Number of Events: </label>
        <input 
          type="text" 
          className="event-number-input" 
          value={this.state.numberOfEvents} 
          onChange={this.handleInputChanged}>
        </input>
      </div>
    )
  }

}

export default NumberOfEvents;
