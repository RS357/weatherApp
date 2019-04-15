import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSunRain } from '@fortawesome/free-solid-svg-icons'
import Clock from 'react-live-clock';
import SubmitButton from '../SubmitButton/SubmitButton.js';
import Textbox from '../Textbox/Textbox.js';
import './Form.css';

class Form extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      city: ''
    }
  }

  fetchWeather = () => {
    let cityName = this.state.city;
    let weatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=a1a331f3fdba57d905c6274db55f1dc4`
    fetch(weatherAPI, {cache: 'no-store'})
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.props.setWeatherData(data)
      })
    }

  handleSubmit = (event) => {
    event.preventDefault();
    this.fetchWeather()
  }

  handleChange = (event) => {
    this.setState({city: event.target.value}); 
  }


  render() {
    return (
      <form className='formContainer'>
        <Textbox 
          className='textAndSubmitComponents' 
          city={this.state.city} 
          handleChange={this.handleChange}
        />
        <SubmitButton 
          className='textAndSubmitComponents' 
          handleSubmit={this.handleSubmit} 
        />
        <div className='iconClockContainer'>
          <span className='label'>
            <FontAwesomeIcon 
            className='weatherIcon' 
            icon={faCloudSunRain} />
            Find a forecast
          </span>
            <Clock 
              className='time' 
              format={'HH:mm:ss'} 
              ticking={true} 
              timezone={'UK'}
            />
        </div>
      </form>
    )
  }
}

export default Form;
