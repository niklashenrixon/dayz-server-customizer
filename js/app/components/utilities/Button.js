import React from 'react'
import fieldColors from './colors'

export default class Button extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			down: false
		}



		this.onMouseOver = this.onMouseOver.bind(this)
		this.onMouseOut = this.onMouseOut.bind(this)
	}

	onMouseOver() {
		this.setState({ down: true })
		if (this.props.onMouseOver) { this.props.onMouseOver() }
	}

	onMouseOut() {
		this.setState({ down: false })
		if (this.props.onMouseOut) { this.props.onMouseOut() }
	}

	render() {
		return (
			<div onClick={this.props.onClick} onMouseDown={this.props.onMouseDown} onMouseUp={this.props.onMouseUp} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut} style={{ marginRight: '15px', cursor: 'pointer',  transition: 'background .3s linear', boxShadow: '0px 2px 4px rgba(0,0,0,0.3)', border: '1px solid "rgb(22, 24, 28)', display: 'inline-block', borderRadius: '5px', background: this.state.down ? fieldColors.bg.active : fieldColors.bg.idle, minWidth: '150px', height: '43px'  }}>
				<div style={{ transition: 'color .3s linear', color: this.state.down ? fieldColors.text.active : fieldColors.text.idle, fontFamily: 'Verdana',lineHeight: '44px', fontSize: '13px', textAlign: 'center' }}>
					{ this.props.label }
				</div>
			</div>
		)
	}
}