import React from 'react'
import { ArrowUp, ArrowDown } from './Arrows'

export default class Stepper extends React.Component {
	render() {
		const stepperStyle = {
			textAlign: 'center',
		    padding: '10px',
		    background: '#170c1382',
		    width: '100%',
		    maxWidth: '150px',
		    borderRadius: '10px',
		    fontSize: '13px'
		}
		const stepStyle = {
			margin: '0 auto', 
			width: '18px',
			cursor: 'pointer',
			opacity: '.6'
		}
		return (
			<div className='stepper' style={stepperStyle}>
				{ this.props.label }
				<div onClick={() => this.props.onClick(this.props.type, 2)} style={stepStyle}><ArrowUp /></div>
				<span>± 100%</span>
				<div onClick={() => this.props.onClick(this.props.type, -2)} style={stepStyle}><ArrowDown /></div>
			</div>
		)
	}
}