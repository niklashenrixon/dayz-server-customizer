import React from 'react'
import fieldColors from './colors'

export default class SearchBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			focused: false,
			hovered: false
		}

		this.onKeyDown = this.onKeyDown.bind(this)
		this.onMouseOver = this.onMouseOver.bind(this)
		this.onMouseOut = this.onMouseOut.bind(this)
		this.onBlur = this.onBlur.bind(this)
		this.onFocus = this.onFocus.bind(this)
	}

	onKeyDown(e) {}
	onBlur() { this.setState({ focused: false }) }
	onFocus() { this.setState({ focused: true }) }
	onMouseOver() { this.setState({ hovered: true }) }
	onMouseOut() { this.setState({ hovered: false })}

	render() {
		const { focused, hovered } = this.state
		const bg = focused || hovered ? fieldColors.bg.active : fieldColors.bg.idle;
		const text = focused || hovered ? fieldColors.text.active : fieldColors.text.idle;
		return (
			<div style={{ display: 'inline-block'}}>
				<input
					placeholder="Search"
					onChange={this.props.onSearch}
					onMouseOver={this.onMouseOver}
					onMouseOut={this.onMouseOut}
					onFocus={this.onFocus}
					onBlur={this.onBlur}
					style={{ fontSize: '13px', outline: 'none',padding: '0 10px', border: 'none', marginRight: '15px', cursor: 'pointer',  transition: 'background .3s linear', boxShadow: '0px 2px 4px rgba(0,0,0,0.3)', border: 'none', display: 'inline-block', borderRadius: '5px', background: bg, color: text, minWidth: '150px', height: '43px'  }} />
			
			</div>
		)
	}
}