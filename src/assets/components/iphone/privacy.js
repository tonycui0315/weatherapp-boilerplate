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

export default class PrivacyPage extends Component {
	// var Iphone = React.createClass({
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
        return(
                <div class={style.container1}>
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
							pathname: "/iphonesettings",
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
					<div style={{ fontSize: "25px", marginRight: "20%" }}>Privacy Policy</div>
                <hr
					style={{
						width: "100%",
						backgroundColor: "#ccc",
						height: "2px",
					}}
				/>
				</div>

                    <div class={style.privacyText}>
                        <p>When you used the Weather App, you give us conscent to access certain information.</p>
                        <p>This includes your location (longitude and latitude coordinates).</p>
                        <p>Before you give us the information above. The application will prompt and ask you for the permission.</p>
                        <p>Please click on "Allow" for a better user expereience.</p>
                        <p>Thank you!</p>
                        <p class={style.sig}>Dev Team 37</p>
                    </div>

                    <hr
					style={{
						width: "100%",
						backgroundColor: "#ccc",
						height: "2px",
					}}
				/>
            </div>

            
        )
	}
}
