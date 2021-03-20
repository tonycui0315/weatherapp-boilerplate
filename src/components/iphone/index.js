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
import Icon from "../icon";
import { refresh } from 'less';



export default class Iphone extends Component {
	// var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props) {
		super(props);
		// temperature state
		this.state.temp = "";
		// button display state

		// button display state
		this.setState({ display: true });
	}
	// function that checks if any alerts need to be displayed
	showAlert = () => {
		if (this.state.temp > "5") {
			document.getElementById('btn').textContent = "Warning the temperature is " + this.state.temp + " " + this.state.unitsymbol + "" + " Take actions to protect vine crops!";
			this.displayAlert();
		}
		else if (this.state.cloudProb > "50") {
			document.getElementById('btn').textContent = "Warning the chance of rain is " + this.state.cloudProb + "%" + " Take actions to protect vine crops!";
			this.displayAlert();
		}
	};
	// function for alert remind again button
	remindAgain = () => {
		document.getElementById('confirm').style.display = "none";
		document.getElementById('container').style.opacity = "1";
		document.getElementById('container').style.filter = "brightness(1)";
		window.setTimeout(this.displayAlert, 5000)
	};

	// function for displaying the alert on screen
	displayAlert = () => {
		document.getElementById('confirm').style.display = "inline";
		document.getElementById('container').style.opacity = "0.8";
		document.getElementById('container').style.filter = "brightness(0.8)";
		document.getElementById('confirm').style.opacity = "1";
	};

	// function for alert confirm close button
	confirmClose = () => {
		document.getElementById('confirm').style.display = "none";
		document.getElementById('container').style.opacity = "1";
		document.getElementById('container').style.filter = "brightness(1)";
	};

	// function to change units
	changeUnits = () => {
		if (this.state.units == "metric") {
			this.setState({ units: "imperial", unitsymbol: "°F", windsymbol: " mph"});
		} else {
			this.setState({ units: "metric", unitsymbol: "°C", windsymbol: " kmph" });
		}
		this.state.display == true ? null : this.fetchWeatherData();
	};

	// function to get latitude and longitude
	getLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(this.getCoor, this.errorCoor, {
				maximumAge: 10000,
				timeout: 5000,
				enableHighAccuracy: true,
			});
		} else {
			console.log("Geolocation is not supported by this browser.");
		}
	};

	// function to set latitude and longitude state
	getCoor = (position) => {
		this.setState({ lat: position.coords.latitude });
		this.setState({ lon: position.coords.longitude });
		this.state.display == true ? null : this.fetchWeatherData();
	};

	// function to return latitude and longitude error
	errorCoor = (error) => {
		console.log(error);
	};

	// a call to fetch weather data via wunderground    
	fetchWeatherData = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		// var url = "http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=88411ea22f5cdf74f7ff18376c10d750";
		console.log(this.state.units);
		var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + this.state.lat + '&lon=' + this.state.lon + '&units=' + this.state.units + '&APPID=52336e7aed1c8791584e2d0445e6c03a';
		$.ajax({
			url: url,
			dataType: "jsonp",
			success: this.parseResponse,
			error: function (req, err) {
				console.log('API call failed ' + err);
			}
		})
		// once the data grabbed, hide the button
		this.setState({ display: false });
	}

	// get weather data as soon as page is opened/refreshed
	componentDidMount() {
		this.fetchWeatherData();
		//window.setTimeout(this.displayAlert, 1000);
		//window.setTimeout(this.showAlert, 1000);
		setInterval(this.showAlert, 10000);

	}
	componentWillMount() {
		this.setState({
			// units state
			units: "metric",
			unitsymbol: "°C",
			windsymbol: " kmph",
			// latitude state
			lat: "41.3851",
			// longitude state
			lon: "2.1734",
		});
	}

	redirectSET = () => {
		window.location.replace()
	}

	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp
			? this.state.units == "metric"
				? `${style.temperature} ${style.metric}`
				: `${style.temperature} ${style.imperial}`
			: style.temperature;
		const subTempStyles = this.state.temp
			? this.state.units == "metric"
				? `${style.subtemp} ${style.metric}`
				: `${style.subtemp} ${style.imperial}`
			: style.temperature;
		const cloudStyles = this.state.temp ? `${style.subtemp} ${style.percentage}` : style.temperature;
		const windStyles = this.state.temp 
			? this.state.units == "metric" 
				? `${style.subtemp} ${style.metricWind}` 
				: `${style.subtemp} ${style.imperialWind}`
			: style.temperature;

		function refreshPage() {
			window.location.reload(false);
		}

		// display all weather data
		return (
				<div class={style.container} id = "container">
					<div>
					<button class={style.button1} id="confirm">
						Alert
					<button class={style.button2} id="btn" onClick={() => this.showAlert(this.id)}>
							Message goes here
					</button>
						<button class={style.button3} onClick={this.remindAgain}>Remind again </button>
						<button class={style.button4} onClick={this.confirmClose}>Confirm</button>
					</button>
					</div>
					<div>
						<Icon
							src="../../assets/icons/refresh1.png"
							clickFunction={refreshPage}
						/>{" "}
						<Icon src="../../assets/icons/alert.png"
							clickFunction={this.showAlert}
						/>{" "}
						<Icon
							src={`../../assets/icons/${this.state.units}.png`}
							clickFunction={this.changeUnits}
						/>{" "}
						<Icon
							src="../../assets/icons/location.png"
							clickFunction={this.getLocation}
						/>
					</div>
					{/* <button class={refreshStyles} onClick={this.fetchWeatherData}>Refresh</button>
					<button class = {settingsStyles} onClick= {this.redirectSET}>Settings</button> */}

					<div class={style.alert}>
						<div class={style.date}>{this.state.dayDate}{this.state.time}</div>
						<div class={style.city}>{this.state.locate}</div>
						<div><img style={{ width: '30px' }} src={this.state.icon} /></div>
						<div class={style.conditions}>{this.state.cond}</div>
						<div class={tempStyles}>{this.state.temp}</div>
						<div class={subTempStyles}>{this.state.temp2}</div>
						<div class={cloudStyles}>{this.state.cloud}</div>
						<div class={cloudStyles}>{this.state.humd}</div>
						<div class={windStyles}>{this.state.wind}</div>
					</div>
					<div class={style.details}></div>
					{/* <div class={style_iphone.container}>
						{this.state.display ? <Button class={style_iphone.button} clickFunction={this.fetchWeatherData} /> : null}
					</div> */}
				</div>
			
		);
	}

	parseResponse = (parsed_json) => {
		var location = parsed_json['name'];
		var cloudChance = parsed_json['clouds']['all']
		var fl_temp = Math.round(parsed_json['main']['feels_like']);
		var temp_c = Math.round(parsed_json['main']['temp']);
		var conditions = parsed_json['weather']['0']['description'];
		var humidity = parsed_json['main']['humidity'];
		var wind_speed;
		this.state.units === 'metric' ? wind_speed = Math.round((parsed_json['wind']['speed'])*3.6) : wind_speed = Math.round(parsed_json['wind']['speed']);

		var day = new Date();
		var weekDay = day.getDate() + "." + (day.getMonth() + 1) + "." + day.getFullYear();
		// Create a new JavaScript Date object based on the timestamp
		// multiplied by 1000 so that the argument is in milliseconds, not seconds.
		var unix_timestamp = parsed_json['dt'];
		var date = new Date(unix_timestamp * 1000);
		// Hours part from the timestamp
		var hours = date.getHours();
		// Minutes part from the timestamp
		var minutes = "0" + date.getMinutes();
		// Seconds part from the timestamp
		// var seconds = "0" + date.getSeconds();
		// Will display time in 10:30:23 format
		var formattedTime = " | " + hours + ':' + minutes.substr(-2);

		const iconName = parsed_json['weather']['0']['icon'];
		const iconApi = 'http://openweathermap.org/img/wn/' + iconName + '.png';




		// set states for fields so they could be rendered later on
		this.setState({
			dayDate: weekDay,
			time: formattedTime,
			locate: location,
			cloud: "Chances of rain: " + cloudChance,
			temp2: "Feels like: " + fl_temp,
			temp: temp_c,
			cond: conditions,
			humd: "Humidity: " + humidity,
			wind: "Wind Speed: " + wind_speed,
			// set icon state
			icon: iconApi,
		});
	}


}
