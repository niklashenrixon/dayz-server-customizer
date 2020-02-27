import React from 'react'
import Button from './Button'

export default class SaveButton extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data: {}
		}

		this.onMouseDown = this.onMouseDown.bind(this)
	}

	onMouseDown() {
		console.log('Sending payload to server ╰( ⁰ ਊ ⁰ )━☆ﾟ.*･｡ﾟ')
		this.setState({ data: this.props.onGenerateSerializedData() })
		window.requestAnimationFrame(() => this.ref.submit())
	}

	render() {
		return (<form style={{ marginLeft: 'auto' }} ref={ref => this.ref = ref} method="post" action="engine.php">
		    <input type="hidden" name="data" value={this.state.data} />
		    <Button label="Save" onMouseUp={this.onMouseDown} />
		</form>)
	}
}