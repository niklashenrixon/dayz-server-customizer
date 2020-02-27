import React from 'react'

const inputStyle = {
	background: '#33383e',
	border: 'none',
	paddingLeft: '10px',
	paddingRight: '10px',
	width: '100%'
}

const inputCharStyle = {
	position: 'absolute',
	top: '0px',
	right: '10px',
    color: 'black'
}

export default class NumberInput extends React.Component { 
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this)
	}

	onChange(e) {
		const { value } = e.target 
		if (/^\d+$/.test(value) || value === '') {
			if (this.props.max && value > this.props.max) { 
				this.props.onChange(this.props.max) 
			} else {
				this.props.onChange(value)
			}
		}
	}

	render() {
		const { value, placeholder, character,  ...restProps } = this.props
		return (
			<div style={{ position: 'relative' }}>
				<input  
					{...restProps} 
					style={inputStyle}
					type="number" 
					value={this.props.value}
					onChange={this.onChange}
					placeholder={this.props.placeholder}
				/>
				{
					character ? <div style={inputCharStyle}>{character}</div> : null
				}
			</div>
		)
	}
}