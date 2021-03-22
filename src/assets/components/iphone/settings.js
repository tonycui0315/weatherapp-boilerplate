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
import Icon from "../icon";
import { refresh } from "less";
import { Link } from "react-router-dom";

export default class IphoneSettings extends Component {
	// var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props) {
		super(props);
		this.state.units = this.props.location.state.units;
		this.state.lat = this.props.location.state.lat;
		this.state.lon = this.props.location.state.lon;
	}

	setUnits = (e) => {
		this.setState({ units: e.target.value });
	};

	// the main render method for the settings component
	render() {
		console.log(this.props.location.state.units);
		return (
			<div class={style.container1} id="container">
				<hr
					style={{
						width: "100%",
						backgroundColor: "#ccc",
						height: "2px",
					}}
				/>
				<div>
					<Link
						to={{
							pathname: "/",
							state: {
								units: this.state.units,
								lat: this.state.lat,
								lon: this.state.lon,
							},
						}}
						style={{
							fontSize: "25px",
							float: "left",
							marginLeft: "4%",
							textDecoration: "none",
						}}
					>
						&lt; Back
					</Link>
					<div style={{ fontSize: "25px", marginRight: "20%" }}>Settings</div>
				</div>
				<hr
					style={{
						width: "100%",
						backgroundColor: "#ccc",
						height: "2px",
					}}
				/>
				<div>
					<div class={style.label}>Units</div>
					{this.state.units === "metric" ? (
						<div class={style.switchfield}>
							<input
								type="radio"
								id="metric"
								name="switch-one"
								value="metric"
								defaultChecked
								onClick={this.setUnits}
							/>
							<label for="metric">Metric</label>
							<input
								type="radio"
								id="imperial"
								name="switch-one"
								value="imperial"
								onClick={this.setUnits}
							/>
							<label for="imperial">Imperial</label>
						</div>
					) : (
						<div class={style.switchfield}>
							<input
								type="radio"
								id="metric"
								name="switch-one"
								value="metric"
								onClick={this.setUnits}
							/>
							<label for="metric">Metric</label>
							<input
								type="radio"
								id="imperial"
								name="switch-one"
								value="imperial"
								defaultChecked
								onClick={this.setUnits}
							/>
							<label for="imperial">Imperial</label>
						</div>
					)}
				</div>
				<hr
					style={{
						width: "100%",
						backgroundColor: "#ccc",
						height: "2px",
					}}
				/>
				<div class={style.label} style={{ marginRight: "53%" }}>
					<Link
						to={{
							pathname: "/privacy",
							state: {
								units: this.state.units,
								lat: this.state.lat,
								lon: this.state.lon,
							},
						}}
					>
						Privacy Policy
					</Link>
				</div>
				<hr
					style={{
						width: "100%",
						backgroundColor: "#ccc",
						height: "2px",
					}}
				/>
			</div>
		);
	}
}
