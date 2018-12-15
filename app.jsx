'use strict'
console.log('Hello!');

class App extends React.Component {
	render() {
		return (<div>Hello World</div>)
	}
}

const domContainer = document.querySelector('#root');
ReactDOM.render(React.createElement(App), domContainer);