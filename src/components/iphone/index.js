// import preact
import { h, render, Component } from "preact";
import react from "react";
// import stylesheets for ipad & button
import style from "./style";
import style_iphone from "../button/style_iphone";
// import jquery for API calls
import $ from "jquery";
// import the Button component
import Button from "../button";

export default class Iphone extends Component {
	//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props) {
		super(props);
		// temperature state
		this.state.temp = "";
		// units state
		this.state.units = "metric";
		// button display state
		this.setState({ display: true });
	}

	changeUnits = () => {
		if (this.state.units == "metric") {
			this.setState({ units: "imperial" });
		} else {
			this.setState({ units: "metric" });
		}
		this.state.display == true ? null : this.fetchWeatherData();
	};

	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = `http://api.openweathermap.org/data/2.5/weather?q=London&units=${this.state.units}&APPID=//API_KEY`;
		$.ajax({
			url: url,
			dataType: "jsonp",
			success: this.parseResponse,
			error: function (req, err) {
				console.log("API call failed " + err);
			},
		});
		// once the data grabbed, hide the button
		this.setState({ display: false });
	};

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
		const cloudStyles = this.state.temp
			? `${style.subtemp} ${style.percentage}`
			: style.temperature;

		function refreshPage() {
			window.location.reload(false);
		}

		// display all weather data
		return (
			<div class={style.container}>
				<div>
					<button>
						<img
							src="../../assets/icons/refresh.png"
							width="50"
							onClick={refreshPage}
						/>
					</button>{" "}
					<button>
						<img
							src={`../../assets/icons/${this.state.units}.png`}
							width="50"
							onClick={this.changeUnits}
						/>
					</button>
				</div>
				<div class={style.header}>
					<div class={style.city}>{this.state.locate}</div>
					<div class={style.conditions}>{this.state.cond}</div>
					<div class={tempStyles}>{this.state.temp}</div>
					<div class={subTempStyles}>{this.state.temp2}</div>
					<div class={cloudStyles}>{this.state.cloud}</div>
				</div>
				<div class={style.details}></div>
				<div class={style_iphone.container}>
					{this.state.display ? (
						<Button
							class={style_iphone.button}
							clickFunction={this.fetchWeatherData}
						/>
					) : null}
				</div>
			</div>
		);
	}

	parseResponse = (parsed_json) => {
		var location = parsed_json["name"];
		var cloudChance = parsed_json["clouds"]["all"];
		var fl_temp = parsed_json["main"]["feels_like"];
		var temp_c = parsed_json["main"]["temp"];
		var conditions = parsed_json["weather"]["0"]["description"];
		var wea_icon = parsed_json["weather"]["0"]["icon"];

		// set states for fields so they could be rendered later on
		this.setState({
			locate: location,
			cloud: "Chances of rain: " + cloudChance,
			temp2: "Feels like: " + fl_temp,
			temp: temp_c,
			cond: conditions,
			weather_icon: wea_icon,
		});
	};
}
