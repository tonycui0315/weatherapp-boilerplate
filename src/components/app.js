// import preact
import { h, Component } from "preact";
import { Switch, BrowserRouter, Route } from "react-router-dom";

// import required Components from 'components/'
import Iphone from "./iphone";
import Ipad from "./ipad";
import IphoneSettings from "./iphone/settings";

export default class App extends Component {
	//var App = React.createClass({

	/*
		A render method to display the required Component on screen (iPhone or iPad) : selected by checking component's isTablet state
	*/
	render() {
		return (
			<div>
				<BrowserRouter>
					<Switch>
						<Route path="/" exact={true} component={Iphone} />
						<Route path="/ipad" exact={false} component={Ipad} />
						<Route path="/iphone" exact={false} component={Iphone} />
						<Route
							path="/iphonesettings"
							exact={false}
							component={IphoneSettings}
						/>
					</Switch>
				</BrowserRouter>
			</div>
		);
	}
}
