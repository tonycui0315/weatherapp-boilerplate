// import preact
import { h, render, Component } from 'preact';
import react from 'react'
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';


export default class Iphone extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state.temp = "";
		// button display state
		this.setState({ display: true });
	}

	// a call to fetch weather data via wunderground    
	fetchWeatherData = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=52336e7aed1c8791584e2d0445e6c03a";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
		// once the data grabbed, hide the button
		this.setState({ display: false });
	}

	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
		const subTempStyles = this.state.temp ? `${style.subtemp} ${style.filled}` : style.temperature;
		const cloudStyles = this.state.temp ? `${style.subtemp} ${style.percentage}` : style.temperature;

		
		// display all weather data
		return (
			<div class={ style.container }>
				<div class={ style.header }>
					<div><button class={style.icon} onClick={this.fetchWeatherData}>Refresh</button></div>
					<div class={ style.city }>{ this.state.dayDate }</div>
					<div class={ style.city }>{ this.state.time }</div>
					<div class={ style.city }>{ this.state.locate }</div>
					<div class={ style.conditions }>{ this.state.cond }</div>
					<div class={ tempStyles }>{ this.state.temp }</div>
					<div class={ subTempStyles }>{ this.state.temp2 }</div>
					<div class={ cloudStyles }>{ this.state.cloud }</div>
				</div>
				<div class={ style.details }></div>
				<div class= { style_iphone.container }> 
					{ this.state.display ? <Button class={ style_iphone.button } clickFunction={ this.fetchWeatherData }/ > : null }
				</div>
			</div>
		);
	}

	parseResponse = (parsed_json) => {
		var location = parsed_json['name'];
		var cloudChance = parsed_json['clouds']['all']
		var fl_temp = parsed_json['main']['feels_like'];
		var temp_c = parsed_json['main']['temp'];
		var conditions = parsed_json['weather']['0']['description'];
		var unix_timestamp = parsed_json['dt'];
		var day = new Date();
		var weekDay = day.getDate() + " " + (day.getMonth()+1) + " " + day.getFullYear();
		// Create a new JavaScript Date object based on the timestamp
		// multiplied by 1000 so that the argument is in milliseconds, not seconds.
		var date = new Date(unix_timestamp * 1000);
		// Hours part from the timestamp
		var hours = date.getHours();
		// Minutes part from the timestamp
		var minutes = "0" + date.getMinutes();
		// Seconds part from the timestamp
		// var seconds = "0" + date.getSeconds();

		// Will display time in 10:30:23 format
		var formattedTime = "Time:" + hours + ':' + minutes.substr(-2);
		

		// set states for fields so they could be rendered later on
		this.setState({
			dayDate: weekDay,
			time: formattedTime,
			locate: location,
			cloud: "Chances of rain: " + cloudChance,
			temp2: "Feels like: " + fl_temp,
			temp: temp_c,
			cond: conditions,
		});      
	}
}
