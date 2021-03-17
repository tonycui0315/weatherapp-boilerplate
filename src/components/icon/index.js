// import preact
import { h, render, Component } from "preact";
import style from "./style";

export default class Icon extends Component {
	// rendering a function when the button is clicked
	render({ clickFunction, src }) {
		if (typeof clickFunction !== "function") {
			clickFunction = () => {
				console.log(
					"passed something as 'clickFunction' that wasn't a function !"
				);
			};
		}
		return (
			<button onClick={clickFunction} class={style.button}>
				<img src={src} width="50" />
			</button>
		);
	}
}
